import { NextResponse } from 'next/server';
import { clearAuthCookies, getRefreshToken, refreshAdharaSession, setAuthCookies } from '@/app/lib/adhara-auth';

export async function POST() {
  const refreshToken = await getRefreshToken();

  if (!refreshToken) {
    return NextResponse.json({ error: 'No session to refresh.' }, { status: 401 });
  }

  const session = await refreshAdharaSession(refreshToken);

  if (!session) {
    await clearAuthCookies();
    return NextResponse.json({ error: 'Session expired. Please log in again.' }, { status: 401 });
  }

  await setAuthCookies(session);
  return NextResponse.json({ success: true });
}
