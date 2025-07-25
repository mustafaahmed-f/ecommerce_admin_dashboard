import { CartProduct } from "@/app/_features/orders/types/CartProductType";
import connectDB from "@/app/_mongoDB/connectDB";
import cartModel from "@/app/_mongoDB/models/cartModel";
import productsModel from "@/app/_mongoDB/models/productsModel";
import userModel from "@/app/_mongoDB/models/userModel";
import { actions } from "@/app/_utils/constants/Actions";
import { generateErrMsg } from "@/app/_utils/helperMethods/generateErrMsg";
import { generateSuccessMsg } from "@/app/_utils/helperMethods/generateSuccessMsg";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    await connectDB();
    const users = await userModel
      .find({ role: { $neq: "admin" } })
      .select("-password");
    if (!users.length) throw new Error("No users found", { cause: 404 });

    return NextResponse.json(
      {
        success: true,
        result: users,
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
