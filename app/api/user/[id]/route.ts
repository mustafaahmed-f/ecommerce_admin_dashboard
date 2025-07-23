import connectDB from "@/app/_mongoDB/connectDB";
import userModel from "@/app/_mongoDB/models/userModel";
import { actions } from "@/app/_utils/constants/Actions";
import { generateSuccessMsg } from "@/app/_utils/helperMethods/generateSuccessMsg";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, props: any) {
  try {
    await connectDB();
    const params = await props.params;

    const user = await userModel.findById(params.id).select("-password");
    if (!user) throw new Error("User not found", { cause: 404 });

    return NextResponse.json(
      {
        success: true,
        result: user,
        message: generateSuccessMsg(actions.fetched),
      },
      { status: 200 },
    );
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error?.message },
      { status: error.cause ?? 500 },
    );
  }
}
