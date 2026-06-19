import { NextResponse } from 'next/server';
import { isAuthenticated } from './session';

/**
 * Admin API route'larında kullanılacak auth guard.
 * Oturum geçersizse 401 döner, geçerliyse null döner.
 *
 * Kullanım:
 *   const authError = await requireAuth();
 *   if (authError) return authError;
 */
export async function requireAuth(): Promise<NextResponse | null> {
  const authenticated = await isAuthenticated();
  if (!authenticated) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  return null;
}
