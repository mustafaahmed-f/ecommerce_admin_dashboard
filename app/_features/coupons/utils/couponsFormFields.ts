import { InferFormValues } from "@/app/_types/InferFormValuesType";
import { inputFieldType } from "@/app/_types/inputFieldType";
import { getDiscountTypes } from "../services/couponsAPIs";
import { validations } from "./couponsValidations";

export const formFields: inputFieldType<InferFormValues<typeof validations>>[] =
  [
    {
      type: "text",
      name: "code",
      lable: "Coupon Code",
      required: true,
      fullWidth: false,
      placeholder: "Enter coupon code",
    },
    {
      type: "text",
      name: "discount",
      lable: "Discount",
      required: true,
      isNumber: true,
      fullWidth: false,
      placeholder: "Enter discount value",
    },
    {
      type: "dropdown",
      name: "discountType",
      lable: "Discount Type",
      required: true,
      fullWidth: false,
      placeholder: "Select type",
      optionsMethod: getDiscountTypes,
    },
    {
      type: "text",
      name: "usageLimit",
      lable: "Usage Limit",
      required: true,
      isNumber: true,
      fullWidth: false,
      placeholder: "Enter maximum usage limit",
    },
    {
      type: "text",
      name: "expirationDate",
      lable: "Expiration Date",
      required: true,
      fullWidth: false,
      placeholder: "Select expiration date",
    },
  ];
