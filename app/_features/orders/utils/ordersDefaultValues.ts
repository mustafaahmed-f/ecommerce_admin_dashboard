import { ordersType } from "../types/ordersType";

export const defaultValues: ordersType = {
  _id: "",
  orderNumber: 0,
  userID: "",
  products: [
    {
      productID: "",
      title: "",
      unitPaymentPrice: 0,
      discount: 0,
      quantity: 0,
      color: "",
      category: "",
      brand: "",
      image: "",
    },
  ],
  couponId: null,
  subTotal: 0,
  userInfo: {
    phoneNumber1: "",
    phoneNumber2: "",
    city: "",
    country: "",
    firstName: "",
    lastName: "",
    email: "",
    address: "",
  },
  finalPaidAmount: 0,
  paymentMethod: "cash",
  orderStatus: {
    status: "pending",
    updatedAt: new Date().toISOString(),
  },
  isFromCart: false,
  notes: "",
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};
