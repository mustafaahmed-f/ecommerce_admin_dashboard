import { CartProduct } from "@/app/_features/orders/types/CartProductType";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/app/_components/ui/accordion";
import { ordersType } from "../types/ordersType";
import ShoppingItem from "./ShoppingItem";

interface OrderItemsAccordionProps {
  order: ordersType;
}

function OrderItemsAccordion({ order }: OrderItemsAccordionProps) {
  return (
    <div className="w-full">
      <Accordion
        type="single"
        collapsible
        className="w-full"
        defaultValue="order-items"
      >
        <AccordionItem value="order-items">
          <AccordionTrigger className="text-base font-semibold">
            Order Items
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4">
              {order.products.length === 0 ? (
                <p className="text-center text-red-600">
                  Order has no products
                </p>
              ) : (
                order.products.map((item: CartProduct, index: number) => (
                  <div key={item.productID}>
                    <ShoppingItem
                      {...item}
                      isOrdered
                      orderStatus={order.orderStatus.status}
                      orderId={order._id}
                    />
                    {index !== order.products.length - 1 && <hr />}
                  </div>
                ))
              )}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}

export default OrderItemsAccordion;
