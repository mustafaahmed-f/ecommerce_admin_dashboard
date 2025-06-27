import connectDB from "@/app/_mongoDB/connectDB";
import modelsModel from "@/app/_mongoDB/models/modelsModel";
import { actions } from "@/app/_utils/constants/Actions";
import { generateSuccessMsg } from "@/app/_utils/helperMethods/generateSuccessMsg";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectDB();
    const models = await modelsModel.find();

    if (!models.length) {
      return NextResponse.json(
        { success: false, error: "No models found" },
        { status: 404 },
      );
    }
    // let finalmodels = models.map((brand: any) => brand.title);
    return NextResponse.json(
      {
        success: true,
        message: generateSuccessMsg(actions.fetched),
        result: models as any[],
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
