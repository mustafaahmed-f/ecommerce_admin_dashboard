import connectDB from "@/app/_mongoDB/connectDB";
import tempProductsModel from "@/app/_mongoDB/models/tempProductsModel";

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
