import connectDB from "@/app/_mongoDB/connectDB";
import brandsModel from "@/app/_mongoDB/models/brandsModel";
import tempProductsModel from "@/app/_mongoDB/models/tempProductsModel";

export async function RemoveDuplicatedDocumentsOFBrands() {
  await connectDB();
  const brands = await brandsModel.find();

  // Group brands by lower-case title
  const groups: { [key: string]: any } = brands.reduce((acc, brand: any) => {
    const lowerTitle = brand.title.toLowerCase();
    acc[lowerTitle] = acc[lowerTitle] || [];
    acc[lowerTitle].push(brand);
    return acc;
  }, {});

  for (const [lowerTitle, brandGroup] of Object.entries(groups)) {
    if (brandGroup.length > 1) {
      console.log(`Found duplicates for: ${lowerTitle}`);

      // keep the first brand
      //   const brandToKeep = brandGroup[0];

      // delete all others
      for (let i = 1; i < brandGroup.length; i++) {
        const duplicateBrand = brandGroup[i];
        await brandsModel.deleteOne({ _id: duplicateBrand._id });
        console.log(
          `Deleted duplicate brand: ${duplicateBrand.title} (id: ${duplicateBrand._id})`,
        );
      }
    }
  }

  console.log("✅ Duplicate removal complete.");
}

export async function removeDuplicateProductsByProductId() {
  await connectDB();

  const products = await tempProductsModel.find();

  // Group products by productId
  const groups: { [key: string]: any[] } = products.reduce(
    (acc, product: any) => {
      const id = product.productId?.toString();
      if (!id) return acc;
      acc[id] = acc[id] || [];
      acc[id].push(product);
      return acc;
    },
    {},
  );

  for (const [productId, productGroup] of Object.entries(groups)) {
    if (productGroup.length > 1) {
      console.log(`Found duplicates for productId: ${productId}`);

      // Keep the first product, delete the rest
      for (let i = 1; i < productGroup.length; i++) {
        const duplicateProduct = productGroup[i];
        await tempProductsModel.deleteOne({ _id: duplicateProduct._id });
        console.log(
          `Deleted duplicate product with _id: ${duplicateProduct._id}`,
        );
      }
    }
  }

  console.log("✅ Duplicate product removal complete.");
}

export async function sortProducts() {
  // Load sorted products from the old collection
  const sortedProducts = await tempProductsModel
    .find()
    .sort({ productId: 1 })
    .lean();

  // Drop old collection
  await tempProductsModel.collection.drop();

  // Re-create the collection
  await tempProductsModel.create(sortedProducts);
  console.log("✅ Product sorting complete.");
}
