"use client";

import { productsType } from "@/app/_features/products/types/productsType";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Spinner from "./Spinner";

interface DetailsClientWrapperProps {
  singleRecord: any;
}

function DetailsClientWrapper({ singleRecord }: DetailsClientWrapperProps) {
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
  return <DetailsComponent singleRecord={singleRecord}></DetailsComponent>;
}

export default DetailsClientWrapper;
