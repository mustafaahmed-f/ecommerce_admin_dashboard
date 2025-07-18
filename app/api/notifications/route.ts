import connectDB from "@/app/_mongoDB/connectDB";
import notificationsModel from "@/app/_mongoDB/models/notificationsModel";
import { getUserId } from "@/app/_utils/helperMethods/getUserId";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    await connectDB();
    const searchParams = request.nextUrl.searchParams;
    const lastCreatedAt = searchParams.get("lastCreatedAt") ?? null;
    const limit = searchParams.get("limit") ?? "8";
    const userId = await getUserId();

    const query: any = { userId };

    if (lastCreatedAt) {
      query.createdAt = { $lt: lastCreatedAt };
    }

    const notifications = await notificationsModel
      .find(query)
      .limit(parseInt(limit))
      .sort({ createdAt: -1 });

    if (!notifications.length) {
      return NextResponse.json(
        {
          success: false,
          message: "No notifications found",
          result: [],
        },
        { status: 404 },
      );
    }
    const hasMore = notifications.length === parseInt(limit);

    return NextResponse.json({ success: true, result: notifications, hasMore });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error?.message },
      { status: error.cause ?? 500 },
    );
  }
}

export async function POST(request: NextRequest) {}
