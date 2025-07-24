import connectDB from "@/app/_mongoDB/connectDB";
import couponsModel from "@/app/_mongoDB/models/couponsModel";
import { actions } from "@/app/_utils/constants/Actions";
import { generateSuccessMsg } from "@/app/_utils/helperMethods/generateSuccessMsg";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, props: any) {
  try {
    await connectDB();
    const params = await props.params;
    const coupon = await couponsModel.findById(params.id);
    if (!coupon) {
      return NextResponse.json(
        { success: false, message: "Coupon not found" },
        { status: 404 },
      );
    }

    return NextResponse.json(
      {
        success: true,
        result: coupon,
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
