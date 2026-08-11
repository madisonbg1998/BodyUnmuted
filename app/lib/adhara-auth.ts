import 'server-only';
import { cookies } from 'next/headers';

export const SESSION_TOKEN_COOKIE = 'adhara_session_token';
export const REFRESH_TOKEN_COOKIE = 'adhara_refresh_token';

const isProd = process.env.NODE_ENV === 'production';

export interface AdharaSession {
  session_token: string;
  refresh_token?: string;
  expires_at: string; // ISO datetime
  customer_id: string;
  requires_onboarding: boolean;
}

export interface AdharaCustomer {
  id: string;
  email: string;
  name: string | null;
  avatar_url?: string | null;
  headline?: string | null;
  bio?: string | null;
  location?: string | null;
  social_links?: Record<string, string>;
  profile_visibility?: string;
  show_in_directory?: boolean;
  onboarding_completed: boolean;
}

/**
 * True when the dashboard should be viewable without a real Adhara session:
 * always in `next dev`, or in any build where AUTH_BYPASS=true was set
 * explicitly (e.g. a preview deployment for a stakeholder demo). A real
 * session cookie still takes priority over this wherever it's checked, so
 * bypass never hides the actual login flow — it only fills the gap when
 * nobody's logged in. Defaults to off, so a real production deploy is never
 * bypassed unless someone deliberately sets the env var there.
 */
export function isAuthBypassEnabled(): boolean {
  return process.env.AUTH_BYPASS === 'true' || process.env.NODE_ENV !== 'production';
}

function adharaBaseUrl() {
  const baseUrl = process.env.ADHARA_BASE_URL;
  if (!baseUrl) throw new Error('Missing ADHARA_BASE_URL environment variable');
  return baseUrl.replace(/\/$/, '');
}

function adharaWorkspace() {
  const workspace = process.env.ADHARA_WORKSPACE_ID;
  if (!workspace) throw new Error('Missing ADHARA_WORKSPACE_ID environment variable');
  return workspace;
}

// Adhara's customer-portal API splits in three: pre-session auth endpoints and
// a handful of others (community, resources, announcements) are scoped by
// workspace in the URL, while everything resolved via the session token
// itself (me, onboarding, courses, enrollments, certificates) takes no
// workspace segment at all.
export function portalWorkspaceUrl(path: string) {
  return `${adharaBaseUrl()}/api/v1/portal/${encodeURIComponent(adharaWorkspace())}${path}`;
}

export function portalAuthUrl(path: string) {
  return portalWorkspaceUrl(`/auth${path}`);
}

export function portalUrl(path: string) {
  return `${adharaBaseUrl()}/api/v1/portal${path}`;
}

function maxAgeFromExpiry(expiresAt: string): number {
  const seconds = Math.floor((new Date(expiresAt).getTime() - Date.now()) / 1000);
  return Math.max(seconds, 0);
}

export async function setAuthCookies(session: AdharaSession) {
  const cookieStore = await cookies();

  cookieStore.set(SESSION_TOKEN_COOKIE, session.session_token, {
    httpOnly: true,
    secure: isProd,
    sameSite: 'lax',
    path: '/',
    maxAge: maxAgeFromExpiry(session.expires_at),
  });

  if (session.refresh_token) {
    cookieStore.set(REFRESH_TOKEN_COOKIE, session.refresh_token, {
      httpOnly: true,
      secure: isProd,
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 30,
    });
  }
}

export async function clearAuthCookies() {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_TOKEN_COOKIE);
  cookieStore.delete(REFRESH_TOKEN_COOKIE);
}

export async function getSessionToken(): Promise<string | undefined> {
  const cookieStore = await cookies();
  return cookieStore.get(SESSION_TOKEN_COOKIE)?.value;
}

export async function getRefreshToken(): Promise<string | undefined> {
  const cookieStore = await cookies();
  return cookieStore.get(REFRESH_TOKEN_COOKIE)?.value;
}

/** Fetches the current customer's profile from Adhara. Returns null if the session is invalid/expired. */
export async function fetchAdharaCustomer(sessionToken: string): Promise<AdharaCustomer | null> {
  const response = await fetch(portalUrl('/me'), {
    headers: { Authorization: `Bearer ${sessionToken}` },
    cache: 'no-store',
  });

  if (!response.ok) return null;
  return response.json();
}

/** Exchanges a refresh token for a fresh session. Returns null if the refresh token is invalid/expired. */
export async function refreshAdharaSession(refreshToken: string): Promise<AdharaSession | null> {
  const response = await fetch(portalAuthUrl('/refresh'), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ refresh_token: refreshToken }),
    cache: 'no-store',
  });

  if (!response.ok) return null;
  return response.json();
}
