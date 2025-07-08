import mongoose, { Schema } from "mongoose";

const brandsSchema = new Schema(
  {
    title: { type: String, required: true },
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
