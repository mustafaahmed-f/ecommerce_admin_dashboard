import mongoose, { Schema } from "mongoose";
import { unique } from "next/dist/build/utils";

const brandsSchema = new Schema(
  {
    title: { type: String, required: true, unique: true },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  },
);

brandsSchema.virtual("products", {
  ref: "Product",
  localField: "title",
  foreignField: "brand",
});

export default mongoose.models.Brand || mongoose.model("Brand", brandsSchema);
