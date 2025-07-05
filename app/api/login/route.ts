import connectDB from "@/app/_mongoDB/connectDB";
import userModel from "@/app/_mongoDB/models/userModel";
import { CheckAuth } from "@/app/_utils/helperMethods/CheckAuth";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { signToken } from "@/app/_utils/helperMethods/tokenMethods";

export async function POST(request: NextRequest) {
  try {
    const checkLoggedIn = await CheckAuth(request);
    if (checkLoggedIn)
      throw new Error("You are already logged in", { cause: 400 });

    await connectDB();
    const body = await request.json();
    const { email, password } = body;

    const user = await userModel.findOne({ email });
    if (!user) throw new Error("User not found", { cause: 404 });

    const matchPassword = await bcrypt.compare(password, user.password);
    if (!matchPassword) throw new Error("Invalid password", { cause: 400 });

    const token = await signToken({
      payload: {
        id: user._id,
        email: user.email,
        role: user.role,
      },
      expiresIn: "1d",
      signature: process.env.SIGNATURE,
    });

    const response = NextResponse.json(
      {
        success: true,
        message: "Logged in successfully !",
        result: user,
      },
      { status: 200 },
    );

    // Set cookie
    response.cookies.set(
      process.env.NEXT_PUBLIC_AUTH_COOKIE_NAME as string,
      token,
      {
        httpOnly: true,
        path: "/",
        sameSite: "lax",
        maxAge: 86400,
        secure: process.env.NODE_ENV === "production", // True in production for HTTPS
      },
    );

    return response;
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error?.message },
      { status: error.cause ?? 500 },
    );
  }
}
