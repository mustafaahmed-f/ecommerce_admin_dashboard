import { PushNotification } from "@/app/_features/notifications/utils/PushNotification";
import connectDB from "@/app/_mongoDB/connectDB";
import brandsModel from "@/app/_mongoDB/models/brandsModel";
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
    const brand = await brandsModel.findById(params.id);
    if (!brand) {
      return NextResponse.json(
        { success: false, message: "Brand not found" },
        { status: 404 },
      );
    }
    return NextResponse.json(
      {
        success: true,
        result: brand,
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
    const adminId = await getUserId();
    const params = await props.params;
    const brandId = await params.id;
    const brand = await brandsModel.findById(brandId);
    if (!brand) {
      return NextResponse.json(
        { success: false, message: "Brand not found" },
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

    //// update brand title in products first:
    const products = await productsModel.find({ "brand._id": brandId });
    if (products.length) {
      await productsModel.updateMany(
        { "brand._id": brandId },
        { "brand.title": title },
      );
    }

    const updatedBrand = await brandsModel.findByIdAndUpdate(
      params.id,
      { title },
      { new: true },
    );
    if (!updatedBrand) throw new Error(generateErrMsg(actions.updated));

    revalidateTag(generateTags("brands", "everyRecord")[0]);
    revalidateTag(generateTags("brands", "singleRecord", params.id)[0]);
    revalidateTag(generateTags("products", "allRecords")[0]);

    //// Generate notification , add it to database and publish it to redis channel:
    await PushNotification(adminId, "brands", "Updated", "updated", title);

    return NextResponse.json(
      {
        success: true,
        message: generateSuccessMsg(actions.updated),
        result: updatedBrand,
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
    const adminId = await getUserId();
    const params = await props.params;
    const brandId = await params.id;
    const brand = await brandsModel.findById(brandId);
    if (!brand) {
      return NextResponse.json(
        { success: false, message: "Brand not found" },
        { status: 404 },
      );
    }

    //// Delete related products first:
    const products = await productsModel.find({ "brand._id": brandId });
    if (products.length) {
      await productsModel.deleteMany({ "brand._id": brandId });
    }

    //// Delete brand:
    const deletedBrand = await brandsModel.findByIdAndDelete(brandId);
    if (!deletedBrand) throw new Error(generateErrMsg(actions.deleted));

    revalidateTag(generateTags("brands", "everyRecord")[0]);
    revalidateTag(generateTags("brands", "singleRecord", params.id)[0]);
    revalidateTag(generateTags("products", "allRecords")[0]);

    //// Generate notification , add it to database and publish it to redis channel:
    await PushNotification(
      adminId,
      "brands",
      "Deleted",
      "deleted",
      brand.title,
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
