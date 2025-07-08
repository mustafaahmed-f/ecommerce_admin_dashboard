import connectDB from "@/app/_mongoDB/connectDB";
import brandsModel from "@/app/_mongoDB/models/brandsModel";
import { actions } from "@/app/_utils/constants/Actions";
import { generateSuccessMsg } from "@/app/_utils/helperMethods/generateSuccessMsg";
import { generateTags } from "@/app/_utils/helperMethods/generateTags";
import { validateSchema } from "@/app/_utils/helperMethods/validateBackendSchema";
import {
  minLengthMsg,
  requiredFieldMsg,
} from "@/app/_utils/helperMethods/validationErrorMessages";
import { revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

export async function GET() {
  try {
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
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error?.message },
      { status: error.cause ?? 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const body = await request.json();
    const { title } = body;
    const validationResult = validateSchema(
      z.object({
        title: z
          .string()
          .min(1, requiredFieldMsg("Title"))
          .min(3, minLengthMsg(3)),
      }),
      body,
    );
    if (!validationResult.success) {
      return NextResponse.json(
        {
          success: false,
          message: "Validation failed",
          errors: validationResult.error,
        },
        { status: 400 },
      );
    }

    const checkExistenceOfBrand = await brandsModel.findOne({ title });
    if (checkExistenceOfBrand) throw new Error("Brand already exists");

    const newBrand = await brandsModel.create({ title });
    if (!newBrand) throw new Error("Failed creating record");

    revalidateTag(generateTags("brands", "allRecords")[0]);

    return NextResponse.json(
      {
        success: true,
        message: generateSuccessMsg(actions.created),
        result: newBrand,
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
