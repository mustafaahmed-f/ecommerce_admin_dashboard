import { addNewProductSchema } from "@/app/_features/products/utils/productsBackendValidations";
import connectDB from "@/app/_mongoDB/connectDB";
import productsModel from "@/app/_mongoDB/models/productsModel";
import { apiFeatures } from "@/app/_services/apiFeatures";
import { actions } from "@/app/_utils/constants/Actions";
import { generateSuccessMsg } from "@/app/_utils/helperMethods/generateSuccessMsg";
import { validateSchema } from "@/app/_utils/helperMethods/validateBackendSchema";
import { NextRequest, NextResponse } from "next/server";

export const config = {
  api: {
    bodyParser: false, // Important!
  },
};

export async function GET(request: NextRequest) {
  try {
    await connectDB();
    const searchParams = request.nextUrl.searchParams;
    const page = searchParams.get("page") ?? "1";
    const size = searchParams.get("size") ?? "10";
    const searchTerm = searchParams.get("searchTerm") ?? "";
    const searchField = searchParams.get("searchField") ?? "";

    console.log("Filter Field inside route :", searchField);
    console.log("Search Term:", searchTerm);

    let filter: any = {};
    if (searchField && searchTerm) {
      if (searchField === "productId") {
        const num = Number(searchTerm);
        if (!isNaN(num)) {
          filter["productId"] = num;
        } else {
          return NextResponse.json(
            {
              success: false,
              result: [],
              additionalInfo: 0,
              message: "Invalid productId format.",
            },
            { status: 400 },
          );
        }
      } else {
        filter[searchField] = { $regex: searchTerm, $options: "i" };
      }
    }

    const queryObj = {
      page: parseInt(page),
      size: parseInt(size),
    };

    const totalProducts = await productsModel.countDocuments(filter);

    const apiFeatureInstance = new apiFeatures(
      productsModel.find(filter),
      queryObj,
    )
      .pagination()
      .sort();

    const products = await apiFeatureInstance.query;

    if (!products.length) {
      return NextResponse.json(
        {
          success: true,
          result: [],
          additionalInfo: 0,
          message: "No products found",
        },
        { status: 200 },
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: generateSuccessMsg(actions.fetched),
        result: products as any[],
        additionalInfo: totalProducts,
      },
      {
        status: 200,
      },
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

    const formData = await request.formData();

    const imageFile = formData.get("image") as File;

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
      image: imageFile,
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

    // TODO: Replace this later with actual uploaded URL (Amazon S3)
    //TODO: check for model, brand and category in DB.

    const fakeImageUrl =
      "https://storage.googleapis.com/fir-auth-1c3bc.appspot.com/1694290122808-71AL1tTRosL._SL1500_.jpg";

    const newProduct = new productsModel({
      ...finalFields,
      image: fakeImageUrl,
    });

    await newProduct.save();

    return NextResponse.json(
      {
        success: true,
        message: "Product created successfully",
        result: newProduct,
      },
      { status: 201 },
    );
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error?.message },
      { status: error.cause ?? 500 },
    );
  }
}
