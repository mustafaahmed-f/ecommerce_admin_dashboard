import mongoose, { Schema } from "mongoose";

const categoriesSchema = new Schema(
  {
    title: { type: String, required: true, unique: true },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  },
);

export default mongoose.models.Category ||
  mongoose.model("Category", categoriesSchema);
