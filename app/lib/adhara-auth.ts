import 'server-only';
import { cookies } from 'next/headers';

export const ACCESS_TOKEN_COOKIE = 'adhara_access_token';
export const REFRESH_TOKEN_COOKIE = 'adhara_refresh_token';

const isProd = process.env.NODE_ENV === 'production';

export interface AdharaTokens {
  access_token: string;
  refresh_token: string;
  expires_in?: number;
}

export interface AdharaUser {
  id: string;
  email: string;
  full_name: string;
  avatar_url?: string;
  timezone?: string;
  is_email_verified?: boolean;
}

function adharaBaseUrl() {
  const baseUrl = process.env.ADHARA_BASE_URL;
  if (!baseUrl) throw new Error('Missing ADHARA_BASE_URL environment variable');
  return baseUrl;
}

export async function setAuthCookies(tokens: AdharaTokens) {
  const cookieStore = await cookies();

  cookieStore.set(ACCESS_TOKEN_COOKIE, tokens.access_token, {
    httpOnly: true,
    secure: isProd,
    sameSite: 'lax',
    path: '/',
    maxAge: tokens.expires_in ?? 60 * 60 * 24,
  });

  cookieStore.set(REFRESH_TOKEN_COOKIE, tokens.refresh_token, {
    httpOnly: true,
    secure: isProd,
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 30,
  });
}

export async function clearAuthCookies() {
  const cookieStore = await cookies();
  cookieStore.delete(ACCESS_TOKEN_COOKIE);
  cookieStore.delete(REFRESH_TOKEN_COOKIE);
}

export async function getAccessToken(): Promise<string | undefined> {
  const cookieStore = await cookies();
  return cookieStore.get(ACCESS_TOKEN_COOKIE)?.value;
}

export async function getRefreshToken(): Promise<string | undefined> {
  const cookieStore = await cookies();
  return cookieStore.get(REFRESH_TOKEN_COOKIE)?.value;
}

/** Fetches the current user from Adhara using the given access token. Returns null if invalid/expired. */
export async function fetchAdharaUser(accessToken: string): Promise<AdharaUser | null> {
  const response = await fetch(`${adharaBaseUrl()}/api/v1/auth/me`, {
    headers: { Authorization: `Bearer ${accessToken}` },
    cache: 'no-store',
  });

  if (!response.ok) return null;
  return response.json();
}

/** Exchanges a refresh token for a fresh token pair. Returns null if the refresh token is invalid/expired. */
export async function refreshAdharaTokens(refreshToken: string): Promise<AdharaTokens | null> {
  const response = await fetch(`${adharaBaseUrl()}/api/v1/auth/refresh`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ refresh_token: refreshToken }),
    cache: 'no-store',
  });

  if (!response.ok) return null;
  return response.json();
}
