import { CartProduct } from "./CartProductType";

export type ordersType = {
  _id: string;
  orderNumber: number;
  userID: string;
  products: CartProduct[];
  couponId: string | null;
  subTotal: number;
  userInfo: {
    phoneNumber1: string;
    phoneNumber2?: string | null;
    city: string;
    country: string;
    firstName: string;
    lastName: string;
    email: string;
    address: string;
  };
  finalPaidAmount: number;
  paymentMethod: "cash" | "card";
  orderStatus: {
    status:
      | "pending"
      | "confirmed"
      | "shipped"
      | "delivered"
      | "returned"
      | "returning"
      | "cancelled";
    updatedAt: string;
  };
  isFromCart: boolean;
  notes?: string;
  createdAt: string;
  updatedAt: string;
};
