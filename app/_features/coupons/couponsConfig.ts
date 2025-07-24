import { InferFormValues } from "@/app/_types/InferFormValuesType";
import { validations } from "./utils/couponsValidations";
import { configType } from "@/app/_types/configType";
import { formFields } from "./utils/couponsFormFields";
import { defaultValues } from "./utils/couponsDefaultValues";
import { generalColumns } from "./table/columns";

//// avoid filtration on these columns:
const excludedColumns = [
  "image",
  "actions",
  "price",
  "discount",
  "stock",
  "_id",
  "createdAt",
  "updatedAt",
  "sold",
];

export const couponsConfig: configType<InferFormValues<typeof validations>> = {
  title: "Products",
  tableTemplate: 1,
  formTemplate: 1,
  formFields: formFields,
  formDefaultValues: defaultValues,
  formValidations: validations,
  pageSize: 10,
  canAddNewRecord: true,
  canEditRecord: true,
  backendPagination: true,
  hasDetails: true,
  hasFiltration: true,
  defaultFiltrationColumn: "code",
  filtrationColumns: ["code", "discountType"],
  typeOfPagination: "number",
};
