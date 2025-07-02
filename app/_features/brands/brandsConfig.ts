import { configType } from "@/app/_types/configType";
import { InferFormValues } from "@/app/_types/InferFormValuesType";
import { validations } from "./utils/brandsValidations";
import { formFields } from "./utils/brandsFormFields";
import { defaultValues } from "./utils/brandsDefaultValues";

export const brandsConfig: configType<InferFormValues<typeof validations>> = {
  title: "Brands",
  tableTemplate: 1,
  formTemplate: 1,
  formFields: formFields,
  formDefaultValues: defaultValues,
  formValidations: validations,
  pageSize: 10,
  canAddNewRecord: true,
  backendPagination: false,
  hasDetails: false,
  hasFiltration: true,
  defaultFiltrationColumn: "title",
  filtrationColumns: [...Object.keys(defaultValues), "_id"],
  typeOfPagination: "number",
};
