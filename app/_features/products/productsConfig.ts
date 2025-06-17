import { configType } from "@/app/_types/configType";
import { validations } from "./utils/productsValidations";
import { InferFormValues } from "@/app/_types/InferFormValuesType";
import { defaultValues } from "./utils/productsDefaultValues";
import { formFields } from "./utils/productsFormFields";

export const config: configType<InferFormValues<typeof validations>> = {
  title: "Products",
  tableTemplate: 1,
  formTemplate: 1,
  formFields: formFields,
  formDefaultValues: defaultValues,
  formValidations: validations,
};
