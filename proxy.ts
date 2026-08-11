import { NextRequest, NextResponse } from 'next/server';
import { SESSION_TOKEN_COOKIE, isAuthBypassEnabled } from '@/app/lib/adhara-auth';

const protectedRoutes = ['/dashboard'];
const authRoutes = ['/login', '/signup'];

export default function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
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
  matcher: ['/dashboard/:path*', '/login', '/signup'],
};
