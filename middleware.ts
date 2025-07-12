import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "./app/_utils/helperMethods/tokenMethods";

export async function middleware(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl;

  const token = request.cookies.get(
    process.env.NEXT_PUBLIC_AUTH_COOKIE_NAME!,
  )?.value;

  const isApi = request.nextUrl.pathname.startsWith("/api/");

  const headers = new Headers(request.headers);
  headers.set("x-next-url", pathname);

  if (!token && isApi) {
    if (request.nextUrl.pathname === "/api/login")
      return NextResponse.next({ headers });
    return new NextResponse(
      JSON.stringify({ success: false, message: "Unauthorized" }),
      { status: 401, headers: { "Content-Type": "application/json" } },
    );
  }

  if (!token && pathname !== "/login") {
    const redirectURL = new URL("/login", request.url);
    //// add redirect url to query params
    redirectURL.searchParams.set("redirectto", pathname);
    //// add original search params before redirecting to login:
    searchParams.forEach((value, key) =>
      redirectURL.searchParams.set(key, value),
    );
    const res = NextResponse.redirect(redirectURL);
    res.headers.set("x-next-url", pathname);
    return res;
  }

  if (token) {
    try {
      const decoded = (await verifyToken({
        token,
        signature: process.env.SIGNATURE,
      })) as any;

      if (decoded.role !== "admin") {
        const res = NextResponse.redirect(
          new URL("/unauthorized", request.url),
        );
        res.headers.set("x-next-url", pathname);
        return res;
      }

      if (pathname === "/login") {
        const res = NextResponse.redirect(new URL("/", request.url));
        res.headers.set("x-next-url", pathname);
        return res;
      }

      return NextResponse.next({ headers });
    } catch (e) {
      console.log("Error : ", e);
      if (isApi) {
        return new NextResponse(
          JSON.stringify({ success: false, message: "Invalid token" }),
          { status: 401, headers: { "Content-Type": "application/json" } },
        );
      }
      const res = NextResponse.redirect(new URL("/login", request.url));
      res.headers.set("x-next-url", pathname);
      return res;
    }
  }

  return NextResponse.next({ headers });
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
