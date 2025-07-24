import * as yup from "yup";
import {
  requiredFieldMsg,
  invalidNumberMsg,
  positiveNumberMsg,
} from "@/app/_utils/helperMethods/validationErrorMessages";

export const couponValidations = yup.object({
  code: yup
    .string()
    .required(requiredFieldMsg("Code"))
    .min(3, "Code must be at least 3 characters"),
  discount: yup
    .number()
    .typeError(invalidNumberMsg("Discount"))
    .required(requiredFieldMsg("Discount"))
    .min(1, positiveNumberMsg("Discount")),
  discountType: yup
    .string()
    .required(requiredFieldMsg("Discount Type"))
    .oneOf(["percentage", "amount"], "Must be either percentage or amount"),
  expirationDate: yup
    .date()
    .required(requiredFieldMsg("Expiration Date"))
    .min(new Date(), "Expiration date must be in the future"),
  usageLimit: yup
    .number()
    .typeError(invalidNumberMsg("Usage Limit"))
    .required(requiredFieldMsg("Usage Limit"))
    .min(1, positiveNumberMsg("Usage Limit"))
    .test("usageLimit", "Usage limit must be at least 1", (val) => {
      if (val < 1) return false;
      return true;
    }),

  isActive: yup.boolean().required("Status is required"),
});
