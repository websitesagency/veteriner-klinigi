import { NextRequest, NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { setSessionCookie, clearSession, isAuthenticated } from '@/lib/auth/session';

const MAX_ATTEMPTS = 5;
const WINDOW_MINUTES = 15;

async function checkRateLimit(ip: string): Promise<boolean> {
  const supabase = createAdminClient();
  const windowStart = new Date(Date.now() - WINDOW_MINUTES * 60 * 1000).toISOString();

  const { count } = await supabase
    .from('login_attempts')
    .select('*', { count: 'exact', head: true })
    .eq('ip_address', ip)
    .gte('attempted_at', windowStart);

  return (count ?? 0) < MAX_ATTEMPTS;
}

async function recordAttempt(ip: string, success: boolean): Promise<void> {
  const supabase = createAdminClient();
  await supabase.from('login_attempts').insert({ ip_address: ip, success });

  // Başarılı girişte o IP'nin eski kayıtlarını temizle
  if (success) {
    await supabase.from('login_attempts').delete().eq('ip_address', ip);
  }
}

function getClientIp(request: NextRequest): string {
  return (
    request.headers.get('x-forwarded-for')?.split(',')[0].trim() ??
    request.headers.get('x-real-ip') ??
    'unknown'
  );
}

export async function POST(request: NextRequest) {
  try {
    const ip = getClientIp(request);

    const allowed = await checkRateLimit(ip);
    if (!allowed) {
      return NextResponse.json(
        { error: `Çok fazla başarısız deneme. ${WINDOW_MINUTES} dakika sonra tekrar deneyin.` },
        { status: 429 }
      );
    }

    const body = await request.json();
    const { password } = body;

    if (!password || typeof password !== 'string') {
      return NextResponse.json({ error: 'Şifre gereklidir' }, { status: 400 });
    }

    // Şifre uzunluk kontrolü — aşırı büyük payload'a karşı
    if (password.length > 200) {
      return NextResponse.json({ error: 'Geçersiz istek' }, { status: 400 });
    }

    const adminPassword = process.env.ADMIN_PASSWORD;
    if (!adminPassword) {
      console.error('ADMIN_PASSWORD tanımlı değil');
      return NextResponse.json({ error: 'Sunucu yapılandırma hatası' }, { status: 500 });
    }

    // Sabit zamanlı karşılaştırma — timing attack önlemi
    const inputBytes = new TextEncoder().encode(password);
    const correctBytes = new TextEncoder().encode(adminPassword);
    let diff = inputBytes.length ^ correctBytes.length;
    const minLen = Math.min(inputBytes.length, correctBytes.length);
    for (let i = 0; i < minLen; i++) {
      diff |= inputBytes[i] ^ correctBytes[i];
    }
    const isCorrect = diff === 0;

    if (!isCorrect) {
      await recordAttempt(ip, false);
      // Hatalı şifrede de aynı yanıt süresi — zamanlama saldırısına karşı
      await new Promise((r) => setTimeout(r, 300));
      return NextResponse.json({ error: 'Geçersiz şifre' }, { status: 401 });
    }

    await recordAttempt(ip, true);
    await setSessionCookie();

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Login hatası:', error);
    return NextResponse.json({ error: 'Giriş başarısız' }, { status: 500 });
  }
}

export async function GET() {
  const authenticated = await isAuthenticated();
  return NextResponse.json({ authenticated });
}

export async function DELETE() {
  try {
    await clearSession();
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Çıkış hatası:', error);
    return NextResponse.json({ error: 'Çıkış başarısız' }, { status: 500 });
  }
}
