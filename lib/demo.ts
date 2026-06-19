export const isDemoMode = () => process.env.NEXT_PUBLIC_DEMO_MODE === 'true';

// API route'larda write işlemlerini bloke eder
export function demoGuardResponse() {
  if (process.env.NEXT_PUBLIC_DEMO_MODE !== 'true') return null;
  const { NextResponse } = require('next/server');
  return NextResponse.json(
    { error: 'Demo modunda değişiklik yapılamaz.' },
    { status: 403 }
  );
}
