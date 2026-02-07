import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

const publicRoutes = ["/", "/sign-in", "/sign-up"];
const authRoutes = ["/sign-in", "/sign-up"];

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip static files and Next.js internals
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  // Check session by calling the API
  const sessionCookie = request.cookies.get("better-auth.session_token");
  let isAuthenticated = false;

  if (sessionCookie) {
    try {
      const response = await fetch(`${API_URL}/api/v1/auth/session`, {
        headers: {
          Cookie: `better-auth.session_token=${sessionCookie.value}`,
        },
        cache: "no-store",
      });
      if (response.ok) {
        const data = await response.json();
        isAuthenticated = data.authenticated === true;
      }
    } catch {
      // Session check failed, treat as unauthenticated
    }
  }

  // Redirect authenticated users away from auth pages and landing page
  if (isAuthenticated && (authRoutes.includes(pathname) || pathname === "/")) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // Redirect unauthenticated users to sign-in for protected routes
  if (!isAuthenticated && !publicRoutes.includes(pathname)) {
    const signInUrl = new URL("/sign-in", request.url);
    signInUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(signInUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
  ],
};
