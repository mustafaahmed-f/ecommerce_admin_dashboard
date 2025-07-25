"use client";

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/app/_components/ui/tabs";
import { useState } from "react";
import { productsType } from "../types/productsType";
import ProductReviewsSection from "./ProductReviewsSection";

interface ProductTabsProps {
  product: productsType & { reviews: any };
}

function ProductTabs({ product }: ProductTabsProps) {
  const { description, reviews } = product;
  const [value, setValue] = useState("1");

  const handleChange = (value: string) => {
    setValue(value);
  };

  return (
    <div className="px-2 py-8 sm:px-8 md:px-20">
      <Tabs value={value} onValueChange={handleChange} className="w-full">
        <TabsList className="border-b border-gray-200">
          <TabsTrigger value="1" className="cursor-pointer">
            Description
          </TabsTrigger>
          <TabsTrigger value="2" className="cursor-pointer">
            Reviews
          </TabsTrigger>
        </TabsList>
        <TabsContent value="1">
          <p>{description}</p>
        </TabsContent>
        <TabsContent value="2">
          <ProductReviewsSection reviews={reviews!} />
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default ProductTabs;
