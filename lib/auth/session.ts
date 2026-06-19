import { cookies } from 'next/headers';

const COOKIE_NAME = 'admin_session';
const SESSION_MAX_AGE = 60 * 60 * 8; // 8 saat (saniye)

const encoder = new TextEncoder();

function getSecret(): string {
  const secret = process.env.SESSION_SECRET;
  if (!secret || secret.length < 32) {
    throw new Error('SESSION_SECRET en az 32 karakter olmalıdır');
  }
  return secret;
}

function bytesToHex(bytes: Uint8Array): string {
  return Array.from(bytes)
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

async function signPayload(payload: string): Promise<string> {
  const key = await globalThis.crypto.subtle.importKey(
    'raw',
    encoder.encode(getSecret()),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );
  const sigBuffer = await globalThis.crypto.subtle.sign('HMAC', key, encoder.encode(payload));
  return bytesToHex(new Uint8Array(sigBuffer));
}

/**
 * HMAC-SHA256 tabanlı stateless session token üretir.
 * Format: <random-hex>:<timestamp>.<hmac-hex>
 * Web Crypto API kullanır — Edge ve Node.js ortamlarında çalışır.
 */
export async function createSessionToken(): Promise<string> {
  const random = bytesToHex(globalThis.crypto.getRandomValues(new Uint8Array(32)));
  const payload = `${random}:${Date.now()}`;
  const sig = await signPayload(payload);
  return `${payload}.${sig}`;
}

export async function verifySessionToken(token: string): Promise<boolean> {
  try {
    const lastDot = token.lastIndexOf('.');
    if (lastDot === -1) return false;

    const payload = token.slice(0, lastDot);
    const sig = token.slice(lastDot + 1);

    const expectedSig = await signPayload(payload);

    // Sabit zamanlı karşılaştırma (timing attack önlemi)
    if (sig.length !== expectedSig.length) return false;
    let diff = 0;
    for (let i = 0; i < sig.length; i++) {
      diff |= sig.charCodeAt(i) ^ expectedSig.charCodeAt(i);
    }
    if (diff !== 0) return false;

    // Süre kontrolü
    const colonIdx = payload.lastIndexOf(':');
    const timestamp = parseInt(payload.slice(colonIdx + 1), 10);
    if (isNaN(timestamp)) return false;
    if (Date.now() - timestamp > SESSION_MAX_AGE * 1000) return false;

    return true;
  } catch {
    return false;
  }
}

export async function isAuthenticated(): Promise<boolean> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(COOKIE_NAME)?.value;
    if (!token) return false;
    return verifySessionToken(token);
  } catch {
    return false;
  }
}

export async function setSessionCookie(): Promise<void> {
  const token = await createSessionToken();
  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: SESSION_MAX_AGE,
    path: '/',
  });
}

export async function clearSession(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
}
