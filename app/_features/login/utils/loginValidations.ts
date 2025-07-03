import {
  minLengthMsg,
  requiredFieldMsg,
} from "@/app/_utils/helperMethods/validationErrorMessages";
import * as yup from "yup";
export const validations = yup.object({
  email: yup
    .string()
    .required(requiredFieldMsg("Email"))
    .email("Invalid email format"),
  password: yup
    .string()
    .required(requiredFieldMsg("Password"))
    .min(8, minLengthMsg(8))
    .matches(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
      "Password should contain at least one number and one uppercase letter",
    ),
});
