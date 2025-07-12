import connectDB from "@/app/_mongoDB/connectDB";
import ordersModel from "@/app/_mongoDB/models/ordersModel";
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
    const sort = searchParams.get("sort") ?? "";
    const searchTerm = searchParams.get("searchTerm") ?? "";
    const searchField = searchParams.get("searchField") ?? "";

    let filter: any = {};
    if (searchField && searchTerm) {
      if (searchField === "orderNumber") {
        const num = Number(searchTerm);
        if (!isNaN(num)) {
          filter["orderNumber"] = num;
        } else {
          return NextResponse.json(
            {
              success: false,
              result: [],
              additionalInfo: 0,
              message: "Invalid orderNumber format.",
            },
            { status: 400 },
          );
        }
      } else {
        if (searchField === "status") {
          filter[`orderStatus.${searchField}`] = {
            $regex: searchTerm,
            $options: "i",
          };
        } else {
          filter[searchField] = { $regex: searchTerm, $options: "i" };
        }
      }
    }

    const queryObj = {
      page: parseInt(page),
      size: parseInt(size),
      sort,
    };

    const totalOrders = await ordersModel.countDocuments(filter);

    const apiFeatureInstance = new apiFeatures(
      ordersModel.find(filter),
      queryObj,
    )
      .pagination()
      .sort();

    const orders = await apiFeatureInstance.query;

    if (!orders.length) {
      return NextResponse.json(
        {
          success: true,
          result: [],
          additionalInfo: 0,
          message: "No orders found",
        },
        { status: 200 },
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: generateSuccessMsg(actions.fetched),
        result: orders as any[],
        additionalInfo: totalOrders,
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
