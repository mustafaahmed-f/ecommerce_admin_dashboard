import connectDB from "@/app/_mongoDB/connectDB";
import productsModel from "@/app/_mongoDB/models/productsModel";
import { apiFeatures } from "@/app/_services/apiFeatures";
import { actions } from "@/app/_utils/constants/Actions";
import { generateSuccessMsg } from "@/app/_utils/helperMethods/generateSuccessMsg";
import { NextRequest, NextResponse } from "next/server";

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
      filter[searchField] = { $regex: searchTerm, $options: "i" };
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
      },
    );
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error?.message },
      { status: 500 },
    );
  }
}
