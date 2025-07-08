import connectDB from "@/app/_mongoDB/connectDB";
import brandsModel from "@/app/_mongoDB/models/brandsModel";
import categoriesModel from "@/app/_mongoDB/models/categoriesModel";
import modelsModel from "@/app/_mongoDB/models/modelsModel";
import productsModel from "@/app/_mongoDB/models/productsModel";
import mongoose from "mongoose";

export async function migrate() {
  await connectDB();

  const products = await productsModel.find();

  const modifyProductsPromise = products.map(async (product) => {
    let brandDoc = await brandsModel.findOne({ title: product.brand });
    if (!brandDoc) {
      brandDoc = await brandsModel.create({ title: product.brand });
    }

    // Find or create Category
    let categoryDoc = await categoriesModel.findOne({
      title: product.category,
    });
    if (!categoryDoc) {
      categoryDoc = await categoriesModel.create({ title: product.category });
    }

    // Find or create Model
    let modelDoc = await modelsModel.findOne({ title: product.model });
    if (!modelDoc) {
      modelDoc = await modelsModel.create({ title: product.model });
    }

    // Update product fields
    product.brand = brandDoc._id;
    product.category = categoryDoc._id;
    product.model = modelDoc._id;

    return product.save();
  });

  await Promise.all(modifyProductsPromise);

  console.log("Migration completed.");
  mongoose.disconnect();
}
