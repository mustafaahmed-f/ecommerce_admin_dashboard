import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/app/_components/ui/accordion";
import { couponType } from "../types/CouponType";
import { CartProduct } from "../types/CartProductType";

function OrderSummary({ order }: { order: any }) {
  const amountToDiscount = order.couponId
    ? order.couponId.discountType === couponType.AMOUNT
      ? order.couponId.discount
      : (order.couponId.discount / 100) * order.subTotal
    : 0;

  const totalCartDiscount = order.products.reduce(
    (acc: number, el: CartProduct) => el.discount! * el.quantity + acc,
    0,
  );

  const shippingCost = 3.99;
  const CashOnDelivery: number = order.paymentMethod === "cash" ? 2.99 : 0;

  return (
    <div className="mt-5 w-full">
      <Accordion
        type="single"
        collapsible
        defaultChecked={false}
        className="w-full"
        // defaultValue="summary"
      >
        <AccordionItem value="summary">
          <AccordionTrigger className="text-base font-semibold">
            Order Summary
          </AccordionTrigger>
          <AccordionContent>
            <div className="mt-5 grid grid-cols-[2fr_1fr] gap-1">
              <p>Price After Discount</p>
              <p className="text-right">$ {order.subTotal}</p>
              <p>Total Discount</p>
              <p className="text-right">
                $ {(totalCartDiscount + amountToDiscount).toFixed(2)}
              </p>
              <p>Shipping</p>
              <p className="text-right">$ {shippingCost}</p>
              <p>Tax</p>
              <p className="text-right">$ 0.00</p>
              <p>Cash On Delivery</p>
              <p className="text-right">$ {CashOnDelivery.toFixed(2)}</p>
              <p>Coupon Discount</p>
              <p className="text-right">$ {amountToDiscount.toFixed(2)}</p>
              <hr className="col-span-2 my-1 border-t-[1px] border-slate-950 sm:my-2" />
              <p className="font-semibold">Total Paid Amount</p>
              <p className="text-right font-semibold">
                $ {order.finalPaidAmount.toFixed(2)}
              </p>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}

export default OrderSummary;
