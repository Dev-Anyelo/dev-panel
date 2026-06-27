import { NextRequest, NextResponse } from "next/server";
import { AUTH_COOKIE_NAME, verifyAuthToken } from "./lib/auth";

function redirectToLogin(request: NextRequest): NextResponse {
  const loginUrl = new URL("/login", request.url);
  loginUrl.searchParams.set("next", request.nextUrl.pathname);

  return NextResponse.redirect(loginUrl);
}

function unauthorizedJson(): NextResponse {
  return NextResponse.json({ error: "No autenticado." }, { status: 401 });
}

function hasValidSession(request: NextRequest): boolean {
  const token = request.cookies.get(AUTH_COOKIE_NAME)?.value;

  return Boolean(token && verifyAuthToken(token));
}

export function proxy(request: NextRequest): NextResponse {
  const { pathname } = request.nextUrl;
  const isApiRoute =
    pathname.startsWith("/api/users") || pathname.startsWith("/api/stats");
  const isProtectedPage = pathname.startsWith("/dashboard");
  const isLoginPage = pathname === "/login";
  const isAuthenticated = hasValidSession(request);

  if ((isProtectedPage || isApiRoute) && !isAuthenticated) {
    return isApiRoute ? unauthorizedJson() : redirectToLogin(request);
  }

  if (isLoginPage && isAuthenticated) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/api/users/:path*", "/api/stats/:path*", "/login"],
};
