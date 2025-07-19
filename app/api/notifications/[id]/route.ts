import connectDB from "@/app/_mongoDB/connectDB";
import notificationsModel from "@/app/_mongoDB/models/notificationsModel";
import { actions } from "@/app/_utils/constants/Actions";
import { generateErrMsg } from "@/app/_utils/helperMethods/generateErrMsg";
import { generateSuccessMsg } from "@/app/_utils/helperMethods/generateSuccessMsg";
import { getUserId } from "@/app/_utils/helperMethods/getUserId";
import { validateSchema } from "@/app/_utils/helperMethods/validateBackendSchema";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

export async function PUT(request: NextRequest, props: any) {
  try {
    await connectDB();
    const params = await props.params;
    const notificationId = await params.id;
    const userId = await getUserId();
    const body = await request.json();

    const validationResult = validateSchema(
      z.object({
        read: z.boolean(),
      }),
      body,
    );
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

    const { read } = body;

    const notification = await notificationsModel.findOneAndUpdate(
      {
        _id: notificationId,
        userId: userId,
      },
      { read: read },
    );

    if (!notification) throw new Error(generateErrMsg(actions.updated));
    return NextResponse.json(
      {
        success: true,
        message: generateSuccessMsg(actions.updated),
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

export async function DELETE(request: NextRequest, props: any) {
  try {
    await connectDB();
    const userId = await getUserId();
    const params = await props.params;
    const notificationId = await params.id;

    const notification = await notificationsModel.findOneAndDelete({
      _id: notificationId,
      userId: userId,
    });

    if (!notification) throw new Error(generateErrMsg(actions.deleted));

    return NextResponse.json(
      {
        success: true,
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
