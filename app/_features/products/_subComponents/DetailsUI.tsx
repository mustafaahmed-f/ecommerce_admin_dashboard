"use client";

import ActionsSection from "@/app/_components/table/_subComponents/ActionsSection";
import { Button } from "@/app/_components/ui/button";
import { useNextNavigation } from "@/app/_context/NextNavigationProvider";
import Image from "next/image";
import { productsType } from "../types/productsType";
import ProductInfo from "./ProductInfo";
import ProductTabs from "./ProductTabs";

interface DetailsUIProps {
  product: productsType;
}

function DetailsUI({ product }: DetailsUIProps) {
  const { title, image } = product;
  const { router } = useNextNavigation();

  return (
    <section className="flex w-full flex-col">
      <div className="mb-2 flex w-full justify-start">
        <Button
          variant={"link"}
          onClick={() => router.back()}
          className="cursor-pointer text-black hover:underline"
        >
          {"← "}
          back
        </Button>
      </div>
      <div className="relative flex flex-col px-5 py-6 sm:px-14 sm:py-10 md:px-20">
        {/* Out of stock ribbon */}
        {product.stock === 0 ? (
          <div className="absolute top-10 left-0 z-10 w-[110px] -rotate-45 transform bg-red-600 py-1 text-center text-sm font-semibold text-white shadow-md">
            Out of Stock
          </div>
        ) : null}
        {/* First section ( image and product info ) */}
        <div className="grid min-h-96 grid-cols-1 gap-2 sm:grid-cols-2">
          <div className="flex h-full items-center justify-center border-e-0 sm:border-e sm:border-slate-300">
            <Image src={image} alt={title} width={500} height={500} />
          </div>
          <div className="flex flex-col">
            <div className="flex justify-center gap-2 max-md:text-sm max-sm:my-3 sm:justify-end md:gap-3">
              <ActionsSection
                recordId={String(product.productId)}
                useIcons={false}
              />
            </div>
            <div className="my-auto w-full sm:ps-7 md:ps-9">
              <ProductInfo product={product} />
            </div>
          </div>
        </div>
      </div>
      <ProductTabs product={product} />
    </section>
  );
}

export default DetailsUI;
