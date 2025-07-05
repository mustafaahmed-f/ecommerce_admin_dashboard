import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST() {
  const cookieStore = await cookies();
  const token = cookieStore.get(process.env.NEXT_PUBLIC_AUTH_COOKIE_NAME!);

  if (!token) {
    return NextResponse.json(
      { success: false, message: "No token!!" },
      { status: 401 },
    );
  }

  cookieStore.set(process.env.NEXT_PUBLIC_AUTH_COOKIE_NAME!, "", {
    httpOnly: true,
    path: "/",
    maxAge: 0,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
  });

  return NextResponse.json({ success: true });
}
