"use client";
import { Button } from "@/app/_components/ui/button";
import { ordersType } from "../types/ordersType";
import { useNextNavigation } from "@/app/_context/NextNavigationProvider";
import OrderSummary from "./OrderSummary";
import OrderUserInfoAccordion from "./OrderUserInfoAccordion";
import OrderItemsAccordion from "./OrderItemsAccordion";
import CouponApplied from "./CouponApplied";
import Chip from "./Chip";
import dayjs from "dayjs";
import { getChipColors } from "../utils/getChipColor";
import ActionsSection from "@/app/_components/table/_subComponents/ActionsSection";

interface DetailsUIProps {
  singleRecord: ordersType;
}

function DetailsUI({ singleRecord }: DetailsUIProps) {
  const { router } = useNextNavigation();
  const order = singleRecord;
  const orderStatus = order?.orderStatus.status || "";

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
      <div>
        {/* Header */}
        <div className="mt-5 mb-14 flex flex-col justify-between gap-4 border-b pb-4 md:flex-row md:items-center">
          {/* Left Side: ID, Status Chip, and Dates */}
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="text-lg font-bold sm:text-2xl md:text-3xl">
                Order ID: {order._id}
              </h2>
              <Chip
                label={orderStatus}
                className={`border text-sm capitalize`}
                size="small"
                style={{
                  color: getChipColors(orderStatus).text,
                  backgroundColor: getChipColors(orderStatus).bg,
                  borderColor: getChipColors(orderStatus).border,
                }}
              />
            </div>
            {order.couponId && <CouponApplied coupon={order.couponId} />}
            <div className="mt-3 text-sm text-slate-500">
              <p>
                Created: {dayjs(order.createdAt).format("MMM D, YYYY - h:mm A")}
              </p>
              <p>
                Updated: {dayjs(order.updatedAt).format("MMM D, YYYY - h:mm A")}
              </p>
            </div>
          </div>

          {/* Right Side: Buttons */}
          <div className="flex flex-row items-start gap-2 max-md:flex-wrap md:flex-col md:items-end">
            <ActionsSection
              canEdit={false}
              useIcons={false}
              recordId={order._id}
            />
          </div>
        </div>

        {/* Accordions */}
        <div className="space-y-5">
          <OrderItemsAccordion order={order} />
          <OrderUserInfoAccordion order={order} />
          <OrderSummary order={order} />
        </div>
      </div>
    </section>
  );
}

export default DetailsUI;
