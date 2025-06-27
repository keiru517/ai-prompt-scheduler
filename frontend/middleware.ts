// middleware.ts
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const PUBLIC_PATHS = ["/", "/favicon.ico"]; // Allow only login page publicly

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  const { pathname } = req.nextUrl;

  const isPublicPath = PUBLIC_PATHS.some(
    (path) => pathname === path || pathname.startsWith(`${path}/`)
  );

  //   if (isPublicPath && token) {
  //     // Authenticated user trying to access public page
  //     return NextResponse.redirect(new URL("/scheduler", req.url));
  //   }

  if (!isPublicPath && !token) {
    // Unauthenticated user trying to access protected page
    const loginUrl = new URL("/", req.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next|favicon.ico).*)"], // Match all routes except public assets
};
