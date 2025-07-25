import connectDB from "@/app/_mongoDB/connectDB";
import cartModel from "@/app/_mongoDB/models/cartModel";
import productsModel from "@/app/_mongoDB/models/productsModel";
import userModel from "@/app/_mongoDB/models/userModel";
import { actions } from "@/app/_utils/constants/Actions";
import { generateSuccessMsg } from "@/app/_utils/helperMethods/generateSuccessMsg";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, props: any) {
  try {
    const params = await props.params;
    const userId = await params.id;
    const user = await userModel.findById(userId).select("-password");
    if (!user) throw new Error("User not found", { cause: 404 });

    return NextResponse.json(
      {
        success: true,
        result: user,
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
    const params = await props.params;
    const userId = await params.id;
    const user = await userModel.findById(userId);
    if (!user) throw new Error("User not found", { cause: 404 });
    //todo Check if user has cart and if yes loop over products and inc quantity - dec sold
    const userCart = await cartModel.findOne({ userID: userId });
    if (userCart) {
      const productsPromiseArr = userCart.products.map(async (product: any) => {
        return await productsModel.findOneAndUpdate(
          { productId: product.productID },
          { $inc: { stock: product.quantity, sold: -product.quantity } },
        );
      });
      try {
        await Promise.all(productsPromiseArr);
        await cartModel.findByIdAndDelete(userCart._id);
      } catch (error: any) {
        console.log(error);
        throw new Error("Failed to update products or delete user's cart", {
          cause: 500,
        });
      }
    }

    const deletedUser = await userModel.findByIdAndDelete(userId);
    if (!deletedUser) throw new Error("Failed deleting user", { cause: 404 });

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
