import { GenerateNotificationsURL } from "@/app/_features/notifications/utils/GenerateNotificationsURL";
import { PushNotification } from "@/app/_features/notifications/utils/PushNotification";
import { addNewProductSchema } from "@/app/_features/products/utils/productsBackendValidations";
import connectDB from "@/app/_mongoDB/connectDB";
import brandsModel from "@/app/_mongoDB/models/brandsModel";
import categoriesModel from "@/app/_mongoDB/models/categoriesModel";
import modelsModel from "@/app/_mongoDB/models/modelsModel";
import productsModel from "@/app/_mongoDB/models/productsModel";
import { actions } from "@/app/_utils/constants/Actions";
import { generateSuccessMsg } from "@/app/_utils/helperMethods/generateSuccessMsg";
import { generateTags } from "@/app/_utils/helperMethods/generateTags";
import { getUserId } from "@/app/_utils/helperMethods/getUserId";
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
    let finalProduct = {
      ...product.toObject(),
      brand: product.brand._id,
      category: product.category._id,
      model: product.model._id,
    };
    return NextResponse.json(
      {
        success: true,
        result: finalProduct,
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
    const productId = await params.id;
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

    // console.log("image : ", image);

    const fields = Array.from(formData).reduce(
      (acc: { [key: string]: any }, [key, value]) => {
        if (key !== "image") acc[key] = value;
        return acc;
      },
      {},
    );

    const finalFields: { [key: string]: any } = {
      ...fields,
      price: Number(fields.price),
      discount: Number(fields.discount),
      stock: Number(fields.stock),
      ram: fields.ram && fields.ram !== "null" ? Number(fields.ram) : null,
      power:
        fields.power && fields.power !== "null" ? Number(fields.power) : null,
      fps: fields.fps && fields.fps !== "null" ? Number(fields.fps) : null,
      soundOutput:
        fields.soundOutput && fields.soundOutput !== "null"
          ? Number(fields.soundOutput)
          : null,
      screenSize:
        fields.screenSize && fields.screenSize !== "null"
          ? Number(fields.screenSize)
          : null,
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

    //// Check brand :
    const brandExists = await brandsModel.findById(fields.brand);
    if (!brandExists) {
      return NextResponse.json(
        { success: false, message: "Brand not found" },
        { status: 404 },
      );
    }
    finalFields.brand = {
      _id: fields.brand,
      title: brandExists.title,
    };

    //// Check category  :
    const categoryExists = await categoriesModel.findById(fields.category);
    if (!categoryExists) {
      return NextResponse.json(
        { success: false, message: "Category not found" },
        { status: 404 },
      );
    }
    finalFields.category = {
      _id: fields.category,
      title: categoryExists.title,
    };

    //// Check model  :
    const modelExists = await modelsModel.findById(fields.model);
    if (!modelExists) {
      return NextResponse.json(
        { success: false, message: "Model not found" },
        { status: 404 },
      );
    }
    finalFields.model = {
      _id: fields.model,
      title: modelExists.title,
    };

    const updatedProduct = await productsModel.findOneAndUpdate(
      { productId: productId },
      {
        ...finalFields,
        image: fakeImageUrl,
        reviews: checkProductExistence.reviews,
      },
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

    //// Generate notification , add it to database and publish it to redis channel:
    const adminId = await getUserId();
    await PushNotification(
      adminId,
      "products",
      "Updated",
      "updated",
      finalFields.title,
      GenerateNotificationsURL("products", finalFields.productId),
    );

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
    const AwaitedProps = await props;
    const productId = AwaitedProps.params.id;

    const product = await productsModel.findOne({ productId: productId });
    if (!product) {
      return NextResponse.json(
        { success: false, message: "Product not found" },
        { status: 404 },
      );
    }

    const deletedProduct = await productsModel.findOneAndDelete({
      productId,
    });

    if (!deletedProduct) {
      throw new Error("Product not found", { cause: 404 });
    }

    revalidateTag(generateTags("products", "singleRecord", productId)[0]);
    revalidateTag(generateTags("products", "allRecords")[0]);

    //// Generate notification , add it to database and publish it to redis channel:
    const adminId = await getUserId();
    await PushNotification(
      adminId,
      "products",
      "Deleted",
      "deleted",
      product.title,
    );

    return NextResponse.json(
      {
        success: true,
        result: deletedProduct,
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
