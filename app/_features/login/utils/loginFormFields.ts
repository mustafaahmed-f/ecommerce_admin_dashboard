import { InferFormValues } from "@/app/_types/InferFormValuesType";
import { validations } from "./loginValidations";
import { inputFieldType } from "@/app/_types/inputFieldType";

export const formFields: inputFieldType<InferFormValues<typeof validations>>[] =
  [
    {
      type: "email",
      name: "email",
      lable: "Email",
      fullWidth: true,
      required: true,
      placeholder: "Enter email",
    },
    {
      type: "password",
      name: "password",
      lable: "Password",
      fullWidth: true,
      required: true,
      placeholder: "Enter password",
    },
  ];
