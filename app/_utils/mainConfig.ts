import { Home, MessagesSquare } from "lucide-react";
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
            icon: Home,
          },
          {
            name: "categories",
            label: "Categories",
            href: "/view/categories",
            icon: Home,
          },
          {
            name: "brands",
            label: "Brands",
            href: "/view/brands",
            icon: Home,
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
            icon: MessagesSquare,
          },
        ],
      },
    ],
  },
};
