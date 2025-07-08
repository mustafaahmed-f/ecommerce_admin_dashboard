import connectDB from "@/app/_mongoDB/connectDB";
import brandsModel from "@/app/_mongoDB/models/brandsModel";
import categoriesModel from "@/app/_mongoDB/models/categoriesModel";
import modelsModel from "@/app/_mongoDB/models/modelsModel";
import productsModel from "@/app/_mongoDB/models/productsModel";
import tempProductsModel from "@/app/_mongoDB/models/tempProductsModel";

function escapeRegex(str: string) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export async function migrate() {
  await connectDB();

  const products = await productsModel.find();

  const modifyProductsPromise = products.map(async (product) => {
    const currentProduct = product.toObject();
    let brandDoc = null;
    if (currentProduct.brand && currentProduct.brand.trim() !== "") {
      brandDoc = await brandsModel.findOne({
        title: new RegExp(`^${escapeRegex(currentProduct.brand.trim())}$`, "i"),
      });
      if (!brandDoc) {
        brandDoc = await brandsModel.create({
          title: currentProduct.brand.trim().toLowerCase(),
        });
      }
    }

    let categoryDoc = null;
    if (currentProduct.category && currentProduct.category.trim() !== "") {
      categoryDoc = await categoriesModel.findOne({
        title: currentProduct.category.trim(),
      });
      if (!categoryDoc) {
        categoryDoc = await categoriesModel.create({
          title: currentProduct.category.trim(),
        });
      }
    }

    let modelDoc = null;
    if (currentProduct.model && currentProduct.model.trim() !== "") {
      modelDoc = await modelsModel.findOne({
        title: currentProduct.model.trim(),
      });
      if (!modelDoc) {
        modelDoc = await modelsModel.create({
          title: currentProduct.model.trim(),
        });
      }
    }

    // Update currentProduct only if we have found or created these references
    if (brandDoc) currentProduct.brand = brandDoc._id;
    if (categoryDoc) currentProduct.category = categoryDoc._id;
    if (modelDoc) currentProduct.model = modelDoc._id;

    delete currentProduct._id;

    return tempProductsModel.create(currentProduct);
  });

  await Promise.all(modifyProductsPromise);

  console.log("Migration completed.");
}

export async function moveProductsToOriginalCollection() {
  await connectDB();
  const products = await tempProductsModel.find().sort({ productId: 1 });
  await productsModel.collection.drop();
  await productsModel.insertMany(products);
  console.log("Products moved to original collection.");
}
