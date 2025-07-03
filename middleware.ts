import { NextResponse, NextRequest } from "next/server";
import jwt from "jsonwebtoken";
import { verifyToken } from "./app/_utils/helperMethods/tokenMethods";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const token = request.cookies.get(
    process.env.NEXT_PUBLIC_AUTH_COOKIE_NAME!,
  )?.value;

  if (!token && pathname !== "/login") {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (token) {
    try {
      const decoded = verifyToken({
        token,
        signature: process.env.SIGNATURE,
      }) as any;

      if (decoded.role !== "admin") {
        return NextResponse.redirect(new URL("/unauthorized", request.url));
      }

      if (pathname === "/login") {
        return NextResponse.redirect(new URL("/", request.url));
      }

      return NextResponse.next();
    } catch (e) {
      console.log(e);
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all routes except:
     * - static files
     * - image optimization
     * - public files like favicon
     */
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};
