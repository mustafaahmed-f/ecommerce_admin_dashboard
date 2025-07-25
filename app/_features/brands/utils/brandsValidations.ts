import {
  minLengthMsg,
  requiredFieldMsg,
} from "@/app/_utils/helperMethods/validationErrorMessages";
import * as yup from "yup";

export const validations = yup.object({
  title: yup
    .string()
    .required(requiredFieldMsg("Title"))
    .min(3, minLengthMsg(3)),
});
