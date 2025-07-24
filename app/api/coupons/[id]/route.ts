import { PushNotification } from "@/app/_features/notifications/utils/PushNotification";
import connectDB from "@/app/_mongoDB/connectDB";
import couponsModel from "@/app/_mongoDB/models/couponsModel";
import { actions } from "@/app/_utils/constants/Actions";
import { generateSuccessMsg } from "@/app/_utils/helperMethods/generateSuccessMsg";
import { generateTags } from "@/app/_utils/helperMethods/generateTags";
import { getUserId } from "@/app/_utils/helperMethods/getUserId";
import { revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, props: any) {
  try {
    await connectDB();
    const params = await props.params;
    const coupon = await couponsModel.findById(params.id);
    if (!coupon) {
      return NextResponse.json(
        { success: false, message: "Coupon not found" },
        { status: 404 },
      );
    }

    return NextResponse.json(
      {
        success: true,
        result: coupon,
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

export async function PUT(request: NextRequest, props: any) {}

export async function DELETE(request: NextRequest, props: any) {
  try {
    await connectDB();
    const AwaitedProps = await props;
    const couponId = AwaitedProps.params.id;

    const coupon = await couponsModel.findById(couponId);
    if (!coupon) {
      return NextResponse.json(
        { success: false, message: "Coupon not found" },
        { status: 404 },
      );
    }

    const deletedCoupon = await couponsModel.findByIdAndDelete(couponId);

    if (!deletedCoupon) {
      throw new Error("Product not found", { cause: 404 });
    }

    //TODO : Delete coupon from stripe

    revalidateTag(generateTags("coupons", "singleRecord", couponId)[0]);
    revalidateTag(generateTags("coupons", "allRecords")[0]);

    //// Generate notification , add it to database and publish it to redis channel:
    const adminId = await getUserId();
    await PushNotification(
      adminId,
      "coupons",
      "Deleted",
      "deleted",
      coupon.code,
    );

    return NextResponse.json(
      {
        success: true,
        result: deletedCoupon,
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
