import { InferFormValues } from "@/app/_types/InferFormValuesType";
import { validations } from "./ordersValidations";
import { inputFieldType } from "@/app/_types/inputFieldType";

export const formFields: inputFieldType<InferFormValues<typeof validations>>[] =
  [];
