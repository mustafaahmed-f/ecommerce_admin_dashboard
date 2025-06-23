import { configType } from "@/app/_types/configType";
import { validations } from "./utils/productsValidations";
import { InferFormValues } from "@/app/_types/InferFormValuesType";
import { defaultValues } from "./utils/productsDefaultValues";
import { formFields } from "./utils/productsFormFields";

//// avoid filtration on these columns:
const excludedColumns = ["image"];

export const config: configType<InferFormValues<typeof validations>> = {
  title: "Products",
  tableTemplate: 1,
  formTemplate: 1,
  formFields: formFields,
  formDefaultValues: defaultValues,
  formValidations: validations,
  pageSize: 10,
  canAddNewRecord: true,
  backendPagination: true,
  hasDetails: true,
  defaultFiltrationColumn: "title",
  filtrationColumns: Object.keys(defaultValues).filter(
    (key) => !excludedColumns.includes(key),
  ),
};
