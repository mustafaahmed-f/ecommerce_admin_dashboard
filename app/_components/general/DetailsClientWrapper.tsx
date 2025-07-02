"use client";

import { Product } from "@/app/_features/products/types/productsType";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Spinner from "./Spinner";

interface DetailsClientWrapperProps {
  product: Product;
}

function DetailsClientWrapper({ product }: DetailsClientWrapperProps) {
  const { module } = useParams();
  const [DetailsComponent, setDetailsComponent] =
    useState<React.ComponentType<any> | null>(null);

  useEffect(() => {
    async function loadDependencies() {
      const detailsModule = await import(
        `@/app/_features/${module}/_subComponents/DetailsUI.tsx`
      );
      const Component = detailsModule.default;
      setDetailsComponent(() => Component);
    }

    loadDependencies();
  }, [module]);

  if (!DetailsComponent) {
    return <Spinner />;
  }
  return <DetailsComponent product={product}></DetailsComponent>;
}

export default DetailsClientWrapper;
