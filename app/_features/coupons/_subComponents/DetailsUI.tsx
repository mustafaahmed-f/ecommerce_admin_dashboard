"use client";

import Link from "next/link";
import { couponType } from "../types/couponsType";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/app/_components/ui/accordion";
import Detail from "./Detail";

type Props = {
  coupon: couponType;
};

export default function DetailsUI({ coupon }: Props) {
  const {
    code,
    discount,
    discountType,
    expirationDate,
    usageLimit,
    usageCount,
    isActive,
    applicableProducts,
    applicableCategories,
    stripeCouponId,
    stipePromotionCodeId,
    createdAt,
    updatedAt,
  } = coupon;

  return (
    <div className="mx-auto max-w-4xl space-y-6 p-6 sm:p-10">
      <div className="flex items-center justify-between border-b pb-4">
        <h1 className="text-2xl font-bold">Coupon Details</h1>
        <Link
          href="/view/coupons"
          className="bg-primary hover:bg-primary/90 rounded px-4 py-2 text-white"
        >
          ← Back
        </Link>
      </div>

      <div className="space-y-4">
        <div className="grid grid-cols-1 gap-4 text-sm sm:grid-cols-2 sm:text-base">
          <Detail label="Code" value={code} />
          <Detail
            label="Discount"
            value={`${discount} ${discountType === "percentage" ? "%" : "$"}`}
          />
          <Detail
            label="Expiration Date"
            value={new Date(expirationDate).toLocaleDateString()}
          />
          <Detail label="Usage Limit" value={String(usageLimit)} />
          <Detail label="Usage Count" value={String(usageCount)} />
          <Detail label="Active" value={isActive ? "Yes" : "No"} />
          <Detail label="Stripe Coupon ID" value={stripeCouponId || "—"} />
          <Detail
            label="Stripe Promotion Code ID"
            value={stipePromotionCodeId || "—"}
          />
          <Detail
            label="Created At"
            value={new Date(createdAt).toLocaleString()}
          />
          <Detail
            label="Updated At"
            value={new Date(updatedAt).toLocaleString()}
          />
        </div>

        <Accordion
          type="multiple"
          className="bg-background rounded-md border text-sm"
        >
          <AccordionItem value="products">
            <AccordionTrigger>Applicable Products</AccordionTrigger>
            <AccordionContent>
              {applicableProducts.length > 0 ? (
                <ul className="list-disc pl-6">
                  {applicableProducts.map((id, i) => (
                    <li key={i}>{id}</li>
                  ))}
                </ul>
              ) : (
                <p className="text-muted-foreground">No applicable products</p>
              )}
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="categories">
            <AccordionTrigger>Applicable Categories</AccordionTrigger>
            <AccordionContent>
              {applicableCategories.length > 0 ? (
                <ul className="list-disc pl-6">
                  {applicableCategories.map((id, i) => (
                    <li key={i}>{id}</li>
                  ))}
                </ul>
              ) : (
                <p className="text-muted-foreground">
                  No applicable categories
                </p>
              )}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
}
