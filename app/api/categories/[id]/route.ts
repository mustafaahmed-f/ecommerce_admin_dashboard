import connectDB from "@/app/_mongoDB/connectDB";
import brandsModel from "@/app/_mongoDB/models/brandsModel";
import categoriesModel from "@/app/_mongoDB/models/categoriesModel";
import productsModel from "@/app/_mongoDB/models/productsModel";
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

export async function GET(request: NextRequest, props: any) {
  try {
    await connectDB();
    const params = await props.params;
    const category = await categoriesModel.findById(params.id);
    if (!category) {
      return NextResponse.json(
        { success: false, message: "Category not found" },
        { status: 404 },
      );
    }
    return NextResponse.json(
      {
        success: true,
        result: category,
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
    const categoryId = await params.id;
    const category = await categoriesModel.findById(categoryId);
    if (!category) {
      return NextResponse.json(
        { success: false, message: "Category not found" },
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

    //// update category title in products first:
    const products = await productsModel.find({ "category._id": categoryId });
    if (products.length) {
      await productsModel.updateMany(
        { "category._id": categoryId },
        { "category.title": title },
      );
    }

    const updatedBrand = await categoriesModel.findByIdAndUpdate(
      params.id,
      { title },
      { new: true },
    );
    if (!updatedBrand) throw new Error(generateErrMsg(actions.updated));

    revalidateTag(generateTags("categories", "everyRecord")[0]);
    revalidateTag(generateTags("categories", "singleRecord", params.id)[0]);
    revalidateTag(generateTags("products", "allRecords")[0]);

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
    const params = await props.params;
    const categoryId = await params.id;
    const category = await categoriesModel.findById(categoryId);
    if (!category) {
      return NextResponse.json(
        { success: false, message: "Category not found" },
        { status: 404 },
      );
    }

    //// Delete related products first:
    const products = await productsModel.find({ "category._id": categoryId });
    if (products.length) {
      await productsModel.deleteMany({ "category._id": categoryId });
    }

    //// Delete brand:
    const deletedCategory = await categoriesModel.findByIdAndDelete(categoryId);
    if (!deletedCategory) throw new Error(generateErrMsg(actions.deleted));

    revalidateTag(generateTags("categories", "everyRecord")[0]);
    revalidateTag(generateTags("categories", "singleRecord", params.id)[0]);
    revalidateTag(generateTags("products", "allRecords")[0]);

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
