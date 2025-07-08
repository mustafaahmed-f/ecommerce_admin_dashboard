import connectDB from "@/app/_mongoDB/connectDB";
import brandsModel from "@/app/_mongoDB/models/brandsModel";

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
      const brandToKeep = brandGroup[0];

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
