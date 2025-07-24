import * as yup from "yup";
import {
  requiredFieldMsg,
  invalidNumberMsg,
  positiveNumberMsg,
} from "@/app/_utils/helperMethods/validationErrorMessages";

export const validations = yup.object({
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
    .string()
    .required(requiredFieldMsg("Expiration Date"))
    .test("isFutureDate", "Expiration date must be in the future", (value) => {
      const date = new Date(value);
      return date > new Date();
    }),
  usageLimit: yup
    .number()
    .typeError(invalidNumberMsg("Usage Limit"))
    .required(requiredFieldMsg("Usage Limit"))
    .min(1, positiveNumberMsg("Usage Limit"))
    .test("usageLimit", "Usage limit must be at least 1", (val) => {
      if (val < 1) return false;
      return true;
    }),
});
