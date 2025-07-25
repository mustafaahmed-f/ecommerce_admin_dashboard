import mongoose, { Schema, Types } from "mongoose";

const cartSchema = new Schema(
  {
    userID: {
      type: Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    products: [
      {
        productID: {
          type: Number,
          required: true,
        },
        title: { type: String },
        unitPaymentPrice: { type: Number, required: true },
        discount: { type: Number, default: 0 },
        quantity: { type: Number, required: true },
        color: { type: String, default: null },
        category: { type: String, default: null },
        brand: { type: String, default: null },
        image: { type: String, default: null },
      },
    ],
    subTotal: { type: Number, required: true, default: 0 },
  },
  {
    timestamps: true,
  },
);

export default mongoose.models.Cart || mongoose.model("Cart", cartSchema);
