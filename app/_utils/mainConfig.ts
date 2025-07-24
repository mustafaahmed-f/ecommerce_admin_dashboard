import {
  BadgeCheck,
  Boxes,
  Layers,
  MessagesSquare,
  ReceiptText,
  Shapes,
  ShoppingBag,
} from "lucide-react";
import { mainConfigType } from "../_types/mainConfig.type";

export const mainConfig: mainConfigType = {
  title: "Luminae",
  sideBar: {
    mainItems: [
      {
        name: "Modules",
        items: [
          {
            name: "products",
            label: "Products",
            href: "/view/products",
            icon: Boxes,
          },
          {
            name: "categories",
            label: "Categories",
            href: "/view/categories",
            icon: Layers,
          },
          {
            name: "brands",
            label: "Brands",
            href: "/view/brands",
            icon: BadgeCheck,
          },
          {
            name: "models",
            label: "Models",
            href: "/view/models",
            icon: Shapes,
          },
          {
            name: "orders",
            label: "Orders",
            href: "/view/orders",
            icon: ShoppingBag,
          },
          {
            name: "coupons",
            label: "Coupons",
            href: "/view/coupons",
            icon: ReceiptText,
          },
        ],
      },
      {
        name: "Activity",
        items: [
          {
            name: "messages",
            label: "Messages",
            href: "/messages",
            icon: MessagesSquare,
          },
          {
            name: "transactions",
            label: "Transactions",
            href: "/transactions",
            icon: ReceiptText,
          },
        ],
      },
    ],
  },
};
