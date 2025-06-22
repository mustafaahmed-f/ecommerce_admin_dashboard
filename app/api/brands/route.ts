import connectDB from "@/app/_mongoDB/connectDB";
import brandsModel from "@/app/_mongoDB/models/brandsModel";
import { actions } from "@/app/_utils/constants/Actions";
import { generateSuccessMsg } from "@/app/_utils/helperMethods/generateSuccessMsg";
import { NextResponse } from "next/server";

export async function GET() {
  await connectDB();
  const brands = await brandsModel.find();

  if (!brands.length) {
    return NextResponse.json(
      { success: false, error: "No brands found" },
      { status: 404 },
    );
  }
  // let finalBrands = brands.map((brand: any) => brand.title);
  return NextResponse.json(
    {
      success: true,
      message: generateSuccessMsg(actions.fetched),
      result: brands as any[],
    },
    { status: 200 },
  );
}
