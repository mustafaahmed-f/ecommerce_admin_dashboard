import connectDB from "@/app/_mongoDB/connectDB";
import modelsModel from "@/app/_mongoDB/models/modelsModel";
import { actions } from "@/app/_utils/constants/Actions";
import { generateErrMsg } from "@/app/_utils/helperMethods/generateErrMsg";
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

    const checkExistenceOfModel = await modelsModel.findOne({ title });
    if (checkExistenceOfModel) throw new Error("Model already exists");

    const newModel = await modelsModel.create({ title });
    if (!newModel) throw new Error(generateErrMsg(actions.created));

    revalidateTag(generateTags("models", "everyRecord")[0]);

    return NextResponse.json(
      {
        success: true,
        message: generateSuccessMsg(actions.created),
        result: newModel,
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
