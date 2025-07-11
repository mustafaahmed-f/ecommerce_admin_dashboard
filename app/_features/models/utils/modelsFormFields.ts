import { InferFormValues } from "@/app/_types/InferFormValuesType";
import { inputFieldType } from "@/app/_types/inputFieldType";
import { validations } from "./modelsValidations";

export const formFields: inputFieldType<InferFormValues<typeof validations>>[] =
  [
    {
      type: "text",
      name: "title",
      lable: "Title",
      fullWidth: false,
      required: true,
      placeholder: "Enter category title",
    },
  ];
