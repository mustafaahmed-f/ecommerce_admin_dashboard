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
            name: "orders",
            label: "Orders",
            href: "/",
            icon: Home,
          },
          {
            name: "users",
            label: "Users",
            href: "/",
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
            href: "/",
            icon: MessagesSquare,
          },
          {
            name: "transactions",
            label: "Transactions",
            href: "/",
            icon: MessagesSquare,
          },
        ],
      },
    ],
  },
};
