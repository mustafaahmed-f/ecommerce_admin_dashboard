import { PushNotification } from "@/app/_features/notifications/utils/PushNotification";
import connectDB from "@/app/_mongoDB/connectDB";
import categoriesModel from "@/app/_mongoDB/models/categoriesModel";
import modelsModel from "@/app/_mongoDB/models/modelsModel";
import productsModel from "@/app/_mongoDB/models/productsModel";
import { actions } from "@/app/_utils/constants/Actions";
import { generateErrMsg } from "@/app/_utils/helperMethods/generateErrMsg";
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

export async function GET(request: NextRequest, props: any) {
  try {
    await connectDB();
    const params = await props.params;
    const model = await modelsModel.findById(params.id);
    if (!model) {
      return NextResponse.json(
        { success: false, message: "Model not found" },
        { status: 404 },
      );
    }
    return NextResponse.json(
      {
        success: true,
        result: model,
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

export async function PUT(request: NextRequest, props: any) {
  try {
    await connectDB();
    const params = await props.params;
    const modelId = await params.id;
    const model = await modelsModel.findById(modelId);
    if (!model) {
      return NextResponse.json(
        { success: false, message: "Model not found" },
        { status: 404 },
      );
    }

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

    //// update model title in products first:
    const products = await productsModel.find({ "model._id": modelId });
    if (products.length) {
      await productsModel.updateMany(
        { "model._id": modelId },
        { "model.title": title },
      );
    }

    const udpatedModel = await modelsModel.findByIdAndUpdate(
      params.id,
      { title },
      { new: true },
    );
    if (!udpatedModel) throw new Error(generateErrMsg(actions.updated));

    revalidateTag(generateTags("models", "everyRecord")[0]);
    revalidateTag(generateTags("models", "singleRecord", params.id)[0]);
    revalidateTag(generateTags("products", "allRecords")[0]);

    //// Generate notification , add it to database and publish it to redis channel:
    const adminId = await getUserId();
    await PushNotification(adminId, "models", "Updated", "updated", title);

    return NextResponse.json(
      {
        success: true,
        message: generateSuccessMsg(actions.updated),
        result: udpatedModel,
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

export async function DELETE(request: NextRequest, props: any) {
  try {
    await connectDB();
    const params = await props.params;
    const modelId = await params.id;
    const model = await modelsModel.findById(modelId);
    if (!model) {
      return NextResponse.json(
        { success: false, message: "Model not found" },
        { status: 404 },
      );
    }

    //// Delete related products first:
    const products = await productsModel.find({ "model._id": modelId });
    if (products.length) {
      await productsModel.deleteMany({ "model._id": modelId });
    }

    //// Delete model:
    const deletedModel = await modelsModel.findByIdAndDelete(modelId);
    if (!deletedModel) throw new Error(generateErrMsg(actions.deleted));

    revalidateTag(generateTags("models", "everyRecord")[0]);
    revalidateTag(generateTags("models", "singleRecord", params.id)[0]);
    revalidateTag(generateTags("products", "allRecords")[0]);

    //// Generate notification , add it to database and publish it to redis channel:
    const adminId = await getUserId();
    await PushNotification(
      adminId,
      "models",
      "Deleted",
      "deleted",
      model.title,
    );

    return NextResponse.json(
      {
        success: true,
        message: generateSuccessMsg(actions.deleted),
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
