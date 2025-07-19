import { configType } from "@/app/_types/configType";
import { InferFormValues } from "@/app/_types/InferFormValuesType";
import { formFields } from "./utils/modelsFormFields";
import { defaultValues } from "./utils/modelsDefaultValues";
import { validations } from "./utils/modelsValidations";

export const modelsConfig: configType<InferFormValues<typeof validations>> = {
  title: "Models",
  tableTemplate: 1,
  formTemplate: 1,
  formFields: formFields,
  formDefaultValues: defaultValues,
  formValidations: validations,
  pageSize: 10,
  canAddNewRecord: true,
  canEditRecord: true,
  backendPagination: false,
  hasDetails: false,
  hasFiltration: true,
  defaultFiltrationColumn: "title",
  filtrationColumns: [...Object.keys(defaultValues), "_id"],
  typeOfPagination: "number",
};
