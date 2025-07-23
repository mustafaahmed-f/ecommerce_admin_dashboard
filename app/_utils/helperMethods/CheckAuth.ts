import { NextRequest } from "next/server";
import { verifyToken } from "./tokenMethods";

export async function CheckAuth(
  request: NextRequest,
  checkAuthorization?: boolean,
): Promise<any> {
  const cookie = request.cookies.get(
    process.env.NEXT_PUBLIC_AUTH_COOKIE_NAME as string,
  );
  if (!cookie) return null;
  let decoded;
  try {
    const cookieValue = cookie.value;
    decoded = await verifyToken({
      token: cookieValue,
      signature: process.env.SIGNATURE,
    });
    if (!decoded) return null;
  } catch (error: any) {
    console.log(error);
    return null;
  }
  if (checkAuthorization && decoded.role !== "admin") return null;
  return decoded;
}
