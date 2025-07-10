import { addNewProductSchema } from "@/app/_features/products/utils/productsBackendValidations";
import connectDB from "@/app/_mongoDB/connectDB";
import brandsModel from "@/app/_mongoDB/models/brandsModel";
import categoriesModel from "@/app/_mongoDB/models/categoriesModel";
import modelsModel from "@/app/_mongoDB/models/modelsModel";
import productsModel from "@/app/_mongoDB/models/productsModel";
import { apiFeatures } from "@/app/_services/apiFeatures";
import { actions } from "@/app/_utils/constants/Actions";
import { generateSuccessMsg } from "@/app/_utils/helperMethods/generateSuccessMsg";
import { generateTags } from "@/app/_utils/helperMethods/generateTags";
import { validateSchema } from "@/app/_utils/helperMethods/validateBackendSchema";
import { revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export const config = {
  api: {
    bodyParser: false, // Important!
  },
};

const nestedFields = ["brand", "category", "model"];

export async function GET(request: NextRequest) {
  try {
    await connectDB();
    const searchParams = request.nextUrl.searchParams;
    const page = searchParams.get("page") ?? "1";
    const size = searchParams.get("size") ?? "10";
    const sort = searchParams.get("sort") ?? "";
    const searchTerm = searchParams.get("searchTerm") ?? "";
    const searchField = searchParams.get("searchField") ?? "";

    let modifiedSort = sort;
    if (modifiedSort) {
      let sortArr = modifiedSort.split("/");
      modifiedSort = sortArr
        .map((sortItem) => {
          if (sortItem.startsWith("-")) {
            let currentSortItem = sortItem.slice(1);
            if (nestedFields.includes(currentSortItem)) {
              return `-${currentSortItem}.title`;
            } else {
              return `-${currentSortItem}`;
            }
          } else {
            if (nestedFields.includes(sortItem)) {
              return `${sortItem}.title`;
            } else {
              return `${sortItem}`;
            }
          }
        })
        .join("/");
    }

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
        if (nestedFields.includes(searchField))
          filter[`${searchField}.title`] = {
            $regex: searchTerm,
            $options: "i",
          };
        else {
          filter[searchField] = { $regex: searchTerm, $options: "i" };
        }
      }
    }

    const queryObj = {
      page: parseInt(page),
      size: parseInt(size),
      sort: modifiedSort,
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

    let finalProducts = products.map((product: any) => {
      product = product.toObject();
      return {
        ...product,
        brand: product.brand.title,
        category: product.category.title,
        model: product.model.title,
      };
    });

    return NextResponse.json(
      {
        success: true,
        message: generateSuccessMsg(actions.fetched),
        result: finalProducts as any[],
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
      size: fields.size ? fields.size : null,
      color: fields.color ? fields.color : null,
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

    console.log("finalFields : ", finalFields);

    let brand = await brandsModel.findById(finalFields.brand);
    if (!brand) throw new Error("Brand not found", { cause: 400 });

    let category = await categoriesModel.findById(finalFields.category);
    if (!category) throw new Error("Category not found", { cause: 400 });

    let model = await modelsModel.findById(finalFields.model);
    if (!model) throw new Error("Model not found", { cause: 400 });

    // TODO: Replace this later with actual uploaded URL (Amazon S3)
    //TODO: check for model, brand and category in DB.

    const fakeImageUrl =
      "https://storage.googleapis.com/fir-auth-1c3bc.appspot.com/1694290122808-71AL1tTRosL._SL1500_.jpg";

    const newProduct = new productsModel({
      ...finalFields,
      image: fakeImageUrl,
      brand: {
        title: brand.title,
        _id: brand._id,
      },
      category: {
        title: category.title,
        _id: category._id,
      },
      model: {
        title: model.title,
        _id: model._id,
      },
    });

    await newProduct.save();

    revalidateTag(generateTags("products", "allRecords")[0]);

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
