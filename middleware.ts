import { NextRequest, NextResponse } from "next/server";

const protectedRoutes = ["/checkout", "/booking-confirmation"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isProtectedRoute = protectedRoutes.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`)
  );

  if (!isProtectedRoute) {
    return NextResponse.next();
  }

  const isAuthenticated = request.cookies.get("ustaad_logged_in")?.value === "true";

  if (isAuthenticated) {
    return NextResponse.next();
  }

  const loginUrl = new URL("/login", request.url);
  loginUrl.searchParams.set("returnTo", pathname);

  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: ["/checkout/:path*", "/booking-confirmation/:path*"],
};