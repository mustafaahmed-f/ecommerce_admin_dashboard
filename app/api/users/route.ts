import connectDB from "@/app/_mongoDB/connectDB";
import userModel from "@/app/_mongoDB/models/userModel";
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

    let filter: any = {
      role: { $ne: "admin" },
    };
    if (searchField && searchTerm) {
      filter[searchField] = { $regex: searchTerm, $options: "i" };
    }

    const queryObj = {
      page: parseInt(page),
      size: parseInt(size),
      sort,
    };

    const totalUsers = await userModel.countDocuments(filter);

    const apiFeatureInstance = new apiFeatures(userModel.find(filter), queryObj)
      .pagination()
      .sort();

    const users = await apiFeatureInstance.query;

    if (!users.length) {
      return NextResponse.json(
        {
          success: true,
          result: [],
          additionalInfo: 0,
          message: "No users found",
        },
        { status: 200 },
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: generateSuccessMsg(actions.fetched),
        result: users,
        additionalInfo: totalUsers,
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
