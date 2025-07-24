import { addNewCouponSchema } from "@/app/_features/coupons/utils/couponsBackendValidations";
import { PushNotification } from "@/app/_features/notifications/utils/PushNotification";
import connectDB from "@/app/_mongoDB/connectDB";
import couponsModel from "@/app/_mongoDB/models/couponsModel";
import { apiFeatures } from "@/app/_services/apiFeatures";
import { actions } from "@/app/_utils/constants/Actions";
import { generateSuccessMsg } from "@/app/_utils/helperMethods/generateSuccessMsg";
import { generateTags } from "@/app/_utils/helperMethods/generateTags";
import { getUserId } from "@/app/_utils/helperMethods/getUserId";
import { validateSchema } from "@/app/_utils/helperMethods/validateBackendSchema";
import { stripe } from "@/app/_utils/stripe";
import { revalidateTag } from "next/cache";
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
      filter[searchField] = { $regex: searchTerm, $options: "i" };
    }

    const queryObj = {
      page: parseInt(page),
      size: parseInt(size),
      sort,
    };

    const totalCoupons = await couponsModel.countDocuments(filter);

    const apiFeatureInstance = new apiFeatures(
      couponsModel.find(filter),
      queryObj,
    )
      .pagination()
      .sort();

    const coupons = await apiFeatureInstance.query;

    if (!coupons.length) {
      return NextResponse.json(
        {
          success: true,
          result: [],
          additionalInfo: 0,
          message: "No coupons found",
        },
        { status: 200 },
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: generateSuccessMsg(actions.fetched),
        result: coupons,
        additionalInfo: totalCoupons,
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

export const POST = async (request: NextRequest) => {
  await connectDB();
  try {
    const userId = await getUserId();
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

    //// check if coupon exists;
    const checkCouponExistence = await couponsModel.findOne({ code });
    if (checkCouponExistence)
      throw new Error("Coupon already exists", { cause: 400 });

    //// Add coupon to stripe :
    const expirationDateForCoupon = new Date(expirationDate);
    const redeemBy = Math.floor(expirationDateForCoupon.getTime() / 1000);

    const sripeCoupon = await stripe.coupons.create({
      duration: "once",
      percent_off: discountType === "percentage" ? discount : undefined,
      amount_off: discountType === "amount" ? discount : undefined,
    });

    const stripePromotionCode = await stripe.promotionCodes.create({
      coupon: sripeCoupon.id,
      code,
      expires_at: redeemBy,
      max_redemptions: usageLimit,
    });

    //// create new coupon
    const newCoupon = await couponsModel.create({
      addedBy: userId,
      code,
      discount,
      discountType,
      expirationDate,
      usageLimit,
      stripeCouponId: sripeCoupon.id,
      stipePromotionCodeId: stripePromotionCode.id,
    });

    if (!newCoupon) throw new Error("Coupon not created", { cause: 400 });

    revalidateTag(generateTags("coupons", "allRecords")[0]);

    await PushNotification(
      userId,
      "coupons",
      "Created",
      "created",
      newCoupon.code,
    );

    return NextResponse.json(
      {
        success: true,
        message: generateSuccessMsg(actions.updated),
        result: newCoupon,
      },
      { status: 200 },
    );
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error?.message },
      { status: 500 },
    );
  }
};
