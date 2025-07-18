import { cookies } from "next/headers";
import { verifyToken } from "./tokenMethods";

export async function getUserId() {
  const cookie = await cookies();
  const token = cookie.get(process.env.NEXT_PUBLIC_AUTH_COOKIE_NAME!)?.value;
  if (!token) {
    return {
      success: false,
      message: "Token not found",
    };
  }
  const verifiedToken: any = await verifyToken({
    token,
    signature: process.env.SIGNATURE,
  });

  return verifiedToken.id;
}
