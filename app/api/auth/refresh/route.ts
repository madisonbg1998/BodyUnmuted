import { NextResponse } from 'next/server';
import { clearAuthCookies, getRefreshToken, refreshAdharaTokens, setAuthCookies } from '@/app/lib/adhara-auth';

export async function POST() {
  const refreshToken = await getRefreshToken();

  if (!refreshToken) {
    return NextResponse.json({ error: 'No session to refresh.' }, { status: 401 });
  }

  const tokens = await refreshAdharaTokens(refreshToken);

  if (!tokens) {
    await clearAuthCookies();
    return NextResponse.json({ error: 'Session expired. Please log in again.' }, { status: 401 });
  }

  await setAuthCookies(tokens);
  return NextResponse.json({ success: true });
}
