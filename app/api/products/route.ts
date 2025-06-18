import connectDB from "@/app/_mongoDB/connectDB";
import productsModel from "@/app/_mongoDB/models/productsModel";
import { apiFeatures } from "@/app/_services/apiFeatures";
import { actions } from "@/app/_utils/helperMethods/Actions";
import { generateSuccessMsg } from "@/app/_utils/helperMethods/generateSuccessMsg";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    await connectDB();
    const searchParams = request.nextUrl.searchParams;
    const page = searchParams.get("page") ?? "1";
    const size = searchParams.get("size") ?? "10";

    //   const category = searchParams.get("category");
    //   const brand = searchParams.get("brand");
    //   const model = searchParams.get("model");
    //   const sort = searchParams.get("sort");
    //   const color = searchParams.get("color");
    //   const priceMin = searchParams.get("priceMin");
    //   const priceMax = searchParams.get("priceMax");

    //   let filter: any = {};
    //   if (category) filter.category = category; // Directly filtering by category name
    //   if (brand) filter.brand = { $in: brand.split("/") }; // Filtering by multiple brand names
    //   if (color) filter.color = { $in: color.split("/") };
    //   if (priceMin) filter.price = { ...filter.price, $gte: parseFloat(priceMin) };
    //   if (priceMax) filter.price = { ...filter.price, $lte: parseFloat(priceMax) };

    const queryObj = {
      page: parseInt(page),
      size: parseInt(size),
      // brand,
      // model,
      // sort,
      // color,
      // priceMin,
      // priceMax,
    };

    const totalProducts = await productsModel.countDocuments();

    const apiFeatureInstance = new apiFeatures(productsModel.find(), queryObj)
      .pagination()
      .sort();

    const products = await apiFeatureInstance.query;

    if (!products.length) throw new Error("No products found", { cause: 404 });

    return NextResponse.json(
      {
        success: true,
        message: generateSuccessMsg(actions.fetched),
        result: products as any[],
        additionalInfo: totalProducts,
      },
      {
        status: 200,
      }
    );
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error?.message },
      { status: 500 }
    );
  }
}
