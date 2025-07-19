import { PushNotification } from "@/app/_features/notifications/utils/PushNotification";
import connectDB from "@/app/_mongoDB/connectDB";
import categoriesModel from "@/app/_mongoDB/models/categoriesModel";
import { actions } from "@/app/_utils/constants/Actions";
import { generateSuccessMsg } from "@/app/_utils/helperMethods/generateSuccessMsg";
import { generateTags } from "@/app/_utils/helperMethods/generateTags";
import { getUserId } from "@/app/_utils/helperMethods/getUserId";
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

    const checkExistenceOfCategory = await categoriesModel.findOne({ title });
    if (checkExistenceOfCategory) throw new Error("Category already exists");

    const newCategory = await categoriesModel.create({ title });
    if (!newCategory) throw new Error("Failed creating record");

    revalidateTag(generateTags("categories", "everyRecord")[0]);

    //// Generate notification , add it to database and publish it to redis channel:
    const adminId = await getUserId();
    await PushNotification(adminId, "categories", "Created", "created", title);

    return NextResponse.json(
      {
        success: true,
        message: generateSuccessMsg(actions.created),
        result: newCategory,
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
