import { configType } from "@/app/_types/configType";
import { validations } from "./utils/productsValidations";
import { InferFormValues } from "@/app/_types/InferFormValuesType";
import { defaultValues } from "./utils/productsDefaultValues";
import { formFields } from "./utils/productsFormFields";
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

export const productsConfig: configType<InferFormValues<typeof validations>> = {
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
  hasFiltration: true,
  defaultFiltrationColumn: "title",
  filtrationColumns: generalColumns(true, "products")
    .map((column) => column.id!)
    .filter((column) => !excludedColumns.includes(column!)),
  typeOfPagination: "number",
};
