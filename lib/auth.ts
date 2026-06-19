import { cookies } from 'next/headers';

const SESSION_COOKIE_NAME = 'admin_session';

export async function isAuthenticated(): Promise<boolean> {
  try {
    const cookieStore = await cookies();
    const session = cookieStore.get(SESSION_COOKIE_NAME);

    if (!session) {
      return false;
    }

    // Validate session token format
    try {
      const decoded = Buffer.from(session.value, 'base64').toString();
      return decoded.startsWith('admin:');
    } catch {
      return false;
    }
  } catch {
    return false;
  }
}
