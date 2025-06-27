import connectDB from "@/app/_mongoDB/connectDB";
import categoriesModel from "@/app/_mongoDB/models/categoriesModel";
import { actions } from "@/app/_utils/constants/Actions";
import { generateSuccessMsg } from "@/app/_utils/helperMethods/generateSuccessMsg";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectDB();
    const categories = await categoriesModel.find();

    if (!categories.length) {
      return NextResponse.json(
        { success: false, error: "No categories found" },
        { status: 404 },
      );
    }

    return NextResponse.json(
      {
        success: true,
        result: categories as any[],
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
