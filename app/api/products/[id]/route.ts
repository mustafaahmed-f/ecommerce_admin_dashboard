import { addNewProductSchema } from "@/app/_features/products/utils/productsBackendValidations";
import connectDB from "@/app/_mongoDB/connectDB";
import productsModel from "@/app/_mongoDB/models/productsModel";
import { actions } from "@/app/_utils/constants/Actions";
import { generateSuccessMsg } from "@/app/_utils/helperMethods/generateSuccessMsg";
import { generateTags } from "@/app/_utils/helperMethods/generateTags";
import { validateSchema } from "@/app/_utils/helperMethods/validateBackendSchema";
import { revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, props: any) {
  try {
    await connectDB();
    const params = await props.params;
    const product = await productsModel.findOne({ productId: params.id });
    if (!product) {
      return NextResponse.json(
        { success: false, message: "Product not found" },
        { status: 404 },
      );
    }
    return NextResponse.json(
      {
        success: true,
        result: product,
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

    const productId = await props.params.id;
    const checkProductExistence = await productsModel.findOne({
      productId,
    });
    if (!checkProductExistence)
      throw new Error("Product not found", { cause: 404 });

    const formData = await request.formData();

    const image =
      typeof formData.get("image") === "string"
        ? (formData.get("image") as string)
        : (formData.get("image") as File);

    console.log("image : ", image);

    const fields = Array.from(formData).reduce(
      (acc: { [key: string]: any }, [key, value]) => {
        if (key !== "image") acc[key] = value;
        return acc;
      },
      {},
    );

    const finalFields = {
      ...fields,
      price: Number(fields.price),
      discount: Number(fields.discount),
      stock: Number(fields.stock),
      ram: fields.ram ? Number(fields.ram) : null,
      power: fields.power ? Number(fields.power) : null,
      fps: fields.fps ? Number(fields.fps) : null,
      soundOutput: fields.soundOutput ? Number(fields.soundOutput) : null,
      screenSize: fields.screenSize ? Number(fields.screenSize) : null,
    };

    // Validate
    const validationResult = validateSchema(addNewProductSchema, {
      ...finalFields,
      image,
    });
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

    let fakeImageUrl;
    if (image instanceof File) {
      // TODO: use amazon s3 for image upload
      fakeImageUrl =
        "https://storage.googleapis.com/fir-auth-1c3bc.appspot.com/1694290122808-71AL1tTRosL._SL1500_.jpg";
    } else if (typeof image === "string") {
      fakeImageUrl = image;
    }

    const updatedProduct = await productsModel.findOneAndUpdate(
      { productId: productId },
      { ...finalFields, image: fakeImageUrl },
      { new: true },
    );

    if (!updatedProduct) {
      return NextResponse.json(
        { success: false, message: "Product not found" },
        { status: 404 },
      );
    }

    revalidateTag(generateTags("products", "singleRecord", productId)[0]);
    revalidateTag(generateTags("products", "allRecords")[0]);

    return NextResponse.json(
      {
        success: true,
        result: updatedProduct,
        message: generateSuccessMsg(actions.updated),
      },
      { status: 200 },
    );

    //TODO: check for model, brand and category in DB.
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
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error?.message },
      { status: error.cause ?? 500 },
    );
  }
}
