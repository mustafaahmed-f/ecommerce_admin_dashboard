import * as yup from "yup";
import {
  requiredFieldMsg,
  positiveNumberMsg,
  invalidEmailMsg,
} from "@/app/_utils/helperMethods/validationErrorMessages";

export const validations = yup.object({
  _id: yup.string().required(),

  orderNumber: yup
    .number()
    .required(requiredFieldMsg("Order number"))
    .min(1, positiveNumberMsg("Order number")),

  userID: yup.string().required(requiredFieldMsg("User ID")),

  products: yup
    .array(
      yup.object({
        productID: yup.string().required(requiredFieldMsg("Product ID")),
        title: yup.string().required(requiredFieldMsg("Product title")),
        unitPaymentPrice: yup
          .number()
          .required(requiredFieldMsg("Unit price"))
          .min(0, positiveNumberMsg("Unit price")),
        discount: yup
          .number()
          .min(0, positiveNumberMsg("Discount"))
          .required(requiredFieldMsg("Discount")),
        quantity: yup
          .number()
          .required(requiredFieldMsg("Quantity"))
          .min(1, positiveNumberMsg("Quantity")),
        color: yup.string().nullable(),
        category: yup.string().nullable(),
        brand: yup.string().nullable(),
        image: yup.string().nullable(),
      }),
    )
    .required(),

  couponId: yup.string().nullable(),

  subTotal: yup
    .number()
    .required(requiredFieldMsg("Subtotal"))
    .min(0, positiveNumberMsg("Subtotal")),

  userInfo: yup
    .object({
      phoneNumber1: yup.string().required(requiredFieldMsg("Phone number")),
      phoneNumber2: yup.string().nullable(),
      city: yup.string().required(requiredFieldMsg("City")),
      country: yup.string().required(requiredFieldMsg("Country")),
      firstName: yup.string().required(requiredFieldMsg("First name")),
      lastName: yup.string().required(requiredFieldMsg("Last name")),
      email: yup
        .string()
        .email(invalidEmailMsg())
        .required(requiredFieldMsg("Email")),
      address: yup.string().required(requiredFieldMsg("Address")),
    })
    .required(),

  finalPaidAmount: yup
    .number()
    .required(requiredFieldMsg("Final paid amount"))
    .min(0, positiveNumberMsg("Final paid amount")),

  paymentMethod: yup
    .mixed<"cash" | "card">()
    .oneOf(["cash", "card"], "Invalid payment method")
    .required(requiredFieldMsg("Payment method")),

  orderStatus: yup
    .object({
      status: yup
        .mixed<
          | "pending"
          | "confirmed"
          | "shipped"
          | "delivered"
          | "returned"
          | "cancelled"
          | "returning"
        >()
        .oneOf(
          [
            "pending",
            "confirmed",
            "shipped",
            "delivered",
            "returned",
            "cancelled",
            "returning",
          ],
          "Invalid order status",
        )
        .required(requiredFieldMsg("Order status")),
      updatedAt: yup.string().required(requiredFieldMsg("Status update time")),
    })
    .required(),

  isFromCart: yup.boolean().required(),

  notes: yup.string().nullable(),

  createdAt: yup.string().required(requiredFieldMsg("Created at")),
  updatedAt: yup.string().required(requiredFieldMsg("Updated at")),
});
