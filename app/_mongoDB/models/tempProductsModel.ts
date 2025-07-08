import mongoose, { Schema } from "mongoose";

const reviewSchema = new Schema({
  name: { type: String },
  rating: { type: Number },
  title: { type: String },
  content: { type: String },
  likes: { type: Number, default: 0 },
  dislikes: { type: Number, default: 0 },
});

const productSchema = new Schema(
  {
    productId: { type: Number, required: false },
    title: { type: String, required: true },
    image: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },

    brand: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Brand",
      required: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    model: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Model",
      required: true,
    },

    color: { type: String, default: null },
    size: { type: String, default: null }, // For cloths
    ram: { type: Number, default: null }, // For laptops & mobiles
    power: { type: Number, default: null }, // For appliances
    fps: { type: Number, default: null }, // For gaming
    soundOutput: { type: Number, default: null }, // For audio
    screenSize: { type: Number, default: null }, // For TVs

    discount: { type: Number, default: 0 },
    stock: { type: Number, default: 10 }, // Default stock value
    sold: { type: Number, default: 0 },
    rating: { type: Number, default: 0 },
    reviews: { type: [reviewSchema], default: [] },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  },
);

productSchema.pre("save", async function () {
  if (this.isNew && !this.productId) {
    const Product = mongoose.model("TempProduct");
    const productsNumber = await Product.countDocuments();
    this.productId = productsNumber + 1;
  }
});

export default mongoose.models.TempProduct ||
  mongoose.model("TempProduct", productSchema);
