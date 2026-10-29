import { NextRequest, NextResponse } from 'next/server';
import { SESSION_TOKEN_COOKIE, isAuthBypassEnabled } from '@/app/lib/adhara-auth';

const protectedRoutes = ['/dashboard'];
const authRoutes = ['/login', '/signup'];

// Public marketing/funnel pages temporarily gated behind the under-construction
// page while the program relaunches. Nothing here is deleted — this just
// rewrites what's served at these URLs; the real page code underneath is
// untouched and comes straight back the moment this list is cleared out.
// Forms clients still use (contact, get-in-touch, survey, intake, check-in)
// are deliberately left out of this list.
const GATED_PATHS = new Set(['/', '/about', '/work-with-me', '/workshop', '/blog', '/quiz', '/quiz/preview', '/join', '/join/success']);

export default function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (GATED_PATHS.has(pathname)) {
    const url = request.nextUrl.clone();
    url.pathname = '/under-construction';
    return NextResponse.rewrite(url);
  }

  const hasSession = request.cookies.has(SESSION_TOKEN_COOKIE);

  const isProtectedRoute = protectedRoutes.some((route) => pathname.startsWith(route));
  const isAuthRoute = authRoutes.some((route) => pathname.startsWith(route));

  // Optimistic check only (cookie presence) — the dashboard page itself does
  // the real verification against Adhara. See app/lib/dal.ts.
  if (isProtectedRoute && !hasSession && !isAuthBypassEnabled()) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  if (isAuthRoute && hasSession) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/login',
    '/signup',
    '/',
    '/about',
    '/work-with-me',
    '/workshop',
    '/blog',
    '/quiz',
    '/quiz/preview',
    '/join',
    '/join/success',
  ],
};
