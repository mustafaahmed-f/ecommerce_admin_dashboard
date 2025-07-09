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
    if (currentProduct.brand) {
      brandDoc = await brandsModel.findById(currentProduct.brand);
    }

    let categoryDoc = null;
    if (currentProduct.category) {
      categoryDoc = await categoriesModel.findById(currentProduct.category);
    }

    let modelDoc = null;
    if (currentProduct.model) {
      modelDoc = await modelsModel.findById(currentProduct.model);
    }

    // Update currentProduct only if we have found or created these references
    if (brandDoc)
      currentProduct.brand = { _id: brandDoc._id, title: brandDoc.title };
    if (categoryDoc)
      currentProduct.category = {
        _id: categoryDoc._id,
        title: categoryDoc.title,
      };
    if (modelDoc)
      currentProduct.model = { _id: modelDoc._id, title: modelDoc.title };

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
