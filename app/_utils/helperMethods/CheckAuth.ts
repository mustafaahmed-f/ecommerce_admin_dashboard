import { NextRequest } from "next/server";
import { verifyToken } from "./tokenMethods";

export async function CheckAuth(
  request: NextRequest,
  checkAuthorization?: boolean,
): Promise<boolean> {
  const cookie = request.cookies.get(
    process.env.NEXT_PUBLIC_AUTH_COOKIE_NAME as string,
  );
  if (!cookie) return false;
  if (checkAuthorization) {
    const cookieValue = cookie.value;
    const decoded: any = verifyToken({
      token: cookieValue,
      signature: process.env.SIGNATURE,
    });
    if (!decoded) return false;
    if (decoded.role !== "admin") return false;
  }
  return true;
}
