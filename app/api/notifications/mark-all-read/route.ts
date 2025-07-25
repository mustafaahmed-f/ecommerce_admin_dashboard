import connectDB from "@/app/_mongoDB/connectDB";
import notificationsModel from "@/app/_mongoDB/models/notificationsModel";
import { NextResponse } from "next/server";

export async function PATCH() {
  try {
    await connectDB();

    await notificationsModel.updateMany(
      { read: false, audience: "admin" },
      { $set: { read: true } },
    );

    return NextResponse.json({
      success: true,
      message: "Notifications marked as read",
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error?.message },
      { status: error.cause ?? 500 },
    );
  }
}
