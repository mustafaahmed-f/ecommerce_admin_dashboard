import { addNewCouponSchema } from "@/app/_features/coupons/utils/couponsBackendValidations";
import { GenerateNotificationsURL } from "@/app/_features/notifications/utils/GenerateNotificationsURL";
import { PushNotification } from "@/app/_features/notifications/utils/PushNotification";
import connectDB from "@/app/_mongoDB/connectDB";
import couponsModel from "@/app/_mongoDB/models/couponsModel";
import { actions } from "@/app/_utils/constants/Actions";
import { generateSuccessMsg } from "@/app/_utils/helperMethods/generateSuccessMsg";
import { generateTags } from "@/app/_utils/helperMethods/generateTags";
import { getUserId } from "@/app/_utils/helperMethods/getUserId";
import { validateSchema } from "@/app/_utils/helperMethods/validateBackendSchema";
import { stripe } from "@/app/_utils/stripe";
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

    const finalCoupon = {
      ...coupon.toObject(),
      expirationDate: coupon.expirationDate.toISOString().split("T")[0],
    };

    return NextResponse.json(
      {
        success: true,
        result: finalCoupon,
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

export async function PUT(request: NextRequest, props: any) {
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

    const { code, discount, discountType, expirationDate, usageLimit } =
      await request.json();

    //// validate data:
    const validationResult = validateSchema(addNewCouponSchema, {
      code,
      discount,
      discountType,
      expirationDate,
      usageLimit,
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

    // Delete the old Stripe coupon
    await stripe.coupons.del(coupon.stripeCouponId);

    // Create new coupon
    const newStripeCoupon = await stripe.coupons.create({
      duration: "once",
      percent_off: discountType === "percentage" ? discount : undefined,
      amount_off: discountType === "amount" ? discount : undefined,
    });

    // Create new promotion code — must use a NEW CODE
    const uniqueCode = `${code}-${Date.now()}`; // Avoid code conflict
    const newStripePromotionCode = await stripe.promotionCodes.create({
      coupon: newStripeCoupon.id,
      code: uniqueCode,
      expires_at: Math.floor(new Date(expirationDate).getTime() / 1000),
      max_redemptions: usageLimit,
    });

    const editedCouponObj: any = {
      discount,
      discountType,
      expirationDate,
      usageLimit,
      stripeCouponId: newStripeCoupon.id,
      stipePromotionCodeId: newStripePromotionCode.id,
    };

    if (coupon.code !== code) {
      editedCouponObj.code = code;
    }

    // update local DB with new stripe IDs
    const updatedCoupon = await couponsModel.findByIdAndUpdate(
      params.id,
      editedCouponObj,
      { new: true },
    );

    revalidateTag(generateTags("coupons", "singleRecord", params.id)[0]);
    revalidateTag(generateTags("coupons", "allRecords")[0]);

    console.log("newStripeCoupon", newStripeCoupon);
    console.log("newStripePromotionCode", newStripePromotionCode);
    console.log("Body :", {
      code,
      discount,
      discountType,
      expirationDate,
      usageLimit,
    });

    //// Generate notification , add it to database and publish it to redis channel:
    const adminId = await getUserId();
    await PushNotification(
      adminId,
      "coupons",
      "Updated",
      "updated",
      updatedCoupon.code,
      GenerateNotificationsURL("coupons", params.id),
    );

    return NextResponse.json(
      {
        success: true,
        result: updatedCoupon,
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

    await stripe.coupons.del(coupon.stripeCouponId);

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
