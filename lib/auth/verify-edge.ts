/**
 * Edge Runtime uyumlu session doğrulama.
 * Middleware'de kullanılır — Node.js crypto yerine Web Crypto API kullanır.
 */

const encoder = new TextEncoder();

function hexToBytes(hex: string): Uint8Array {
  const bytes = new Uint8Array(hex.length / 2);
  for (let i = 0; i < hex.length; i += 2) {
    bytes[i / 2] = parseInt(hex.slice(i, i + 2), 16);
  }
  return bytes;
}

async function getHmacKey(secret: string): Promise<CryptoKey> {
  return globalThis.crypto.subtle.importKey(
    'raw',
    encoder.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['verify']
  );
}

export async function verifySessionTokenEdge(token: string): Promise<boolean> {
  try {
    const secret = process.env.SESSION_SECRET;
    if (!secret || secret.length < 32) return false;

    const lastDot = token.lastIndexOf('.');
    if (lastDot === -1) return false;

    const payload = token.slice(0, lastDot);
    const sig = token.slice(lastDot + 1);

    if (sig.length % 2 !== 0) return false;

    const key = await getHmacKey(secret);
    const sigBytes = hexToBytes(sig);
    const valid = await globalThis.crypto.subtle.verify(
      'HMAC',
      key,
      sigBytes.buffer as ArrayBuffer,
      encoder.encode(payload).buffer as ArrayBuffer
    );

    if (!valid) return false;

    // Süre kontrolü
    const SESSION_MAX_AGE = 60 * 60 * 8 * 1000; // 8 saat ms
    const colonIdx = payload.lastIndexOf(':');
    const timestamp = parseInt(payload.slice(colonIdx + 1), 10);
    if (isNaN(timestamp)) return false;
    if (Date.now() - timestamp > SESSION_MAX_AGE) return false;

    return true;
  } catch {
    return false;
  }
}
