/**
 * PROXY - Protect routes from unauthorized access
 * This proxy runs on requests to protected routes
 */

import { NextRequest, NextResponse } from "next/server";

export function proxy(request: NextRequest) {
  // ===== GET TOKEN FROM COOKIES OR HEADER =====
  const token = request.cookies.get("auth_token")?.value;
  const authHeader = request.headers.get("authorization");

  const hasToken = !!token || (!!authHeader && authHeader.startsWith("Bearer "));

  // ===== DEFINE PROTECTED ROUTES =====
  const protectedRoutes = [
    "/dashboard",
    "/admin-dashboard",
    "/garage-dashboard",
    "/admin",
    "/garage-dashboard",
    "/my-bookings",
    "/my-listings",
    "/add-parking",
  ];

  // ===== PUBLIC ROUTES (no auth needed) =====
  const publicRoutes = [
    "/",
    "/login",
    "/register",
    "/search-parking",
    "/parking-details",
    "/terms-conditions",
    "/help-support",
  ];

  const pathname = request.nextUrl.pathname;

  // ===== CHECK IF ROUTE IS PROTECTED =====
  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  const isPublicRoute = publicRoutes.some((route) =>
    pathname.startsWith(route)
  );

  // ===== IF PROTECTED ROUTE AND NO TOKEN, REDIRECT TO LOGIN =====
  if (isProtectedRoute && !hasToken) {
    const loginUrl = new URL("/login", request.url);
    // Add returnTo parameter so after login, user goes back to requested page
    loginUrl.searchParams.set("returnTo", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // ===== IF ON LOGIN/REGISTER AND HAS TOKEN, REDIRECT TO DASHBOARD =====
  if ((pathname === "/login" || pathname === "/register") && hasToken) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // ===== ALLOW REQUEST TO CONTINUE =====
  return NextResponse.next();
}

// ===== CONFIG - Which routes to apply proxy to =====
export const config = {
  matcher: [
    // Protect all these routes
    "/dashboard/:path*",
    "/admin-dashboard/:path*",
    "/garage-dashboard/:path*",
    "/admin/:path*",
    "/my-bookings/:path*",
    "/my-listings/:path*",
    "/add-parking/:path*",
  ],
};