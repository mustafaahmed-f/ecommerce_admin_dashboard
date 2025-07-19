import { PushNotification } from "@/app/_features/notifications/utils/PushNotification";
import connectDB from "@/app/_mongoDB/connectDB";
import ordersModel from "@/app/_mongoDB/models/ordersModel";
import { actions } from "@/app/_utils/constants/Actions";
import { generateSuccessMsg } from "@/app/_utils/helperMethods/generateSuccessMsg";
import { getUserId } from "@/app/_utils/helperMethods/getUserId";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, props: any) {
  try {
    await connectDB();
    const params = await props.params;

    //TODO : after finishing coupons , uncomment this and use populate.
    // const order = await ordersModel.findById(params.id).populate({
    //   path: "couponId",
    //   select: "discountType discount code",
    // });

    const order = await ordersModel.findById(params.id);

    if (!order) {
      return NextResponse.json(
        { success: false, message: "Order not found" },
        { status: 404 },
      );
    }

    return NextResponse.json(
      {
        success: true,
        result: order,
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

export async function DELETE(request: NextRequest, props: any) {
  try {
    await connectDB();
    const AwaitedProps = await props.params;
    const orderId = await AwaitedProps.id;

    const order = await ordersModel.findById(orderId);
    if (!order) {
      throw new Error("Order not found", { cause: 404 });
    }

    if (
      order.orderStatus.status !== "cancelled" &&
      order.orderStatus.status !== "returned"
    ) {
      throw new Error("Only cancelled or returned orders can be deleted", {
        cause: 400,
      });
    }

    const deletedOrder = await ordersModel.findByIdAndDelete(orderId);

    if (!deletedOrder) {
      throw new Error("Failed deleting order", { cause: 404 });
    }

    //// Generate notification , add it to database and publish it to redis channel:
    const adminId = await getUserId();
    await PushNotification(
      adminId,
      "orders",
      "Deleted",
      "deleted",
      `# ${orderId}`,
    );

    return NextResponse.json(
      {
        success: true,
        result: deletedOrder,
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
