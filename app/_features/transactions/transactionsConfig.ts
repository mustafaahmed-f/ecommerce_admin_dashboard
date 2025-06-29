import { configType } from "@/app/_types/configType";
import { InferFormValues } from "@/app/_types/InferFormValuesType";
import { generalColumns } from "./table/columns";

//// avoid filtration on these columns:
const excludedColumns = ["amount", "currency"];

export const config: configType<InferFormValues<any>> = {
  title: "Transactions",
  tableTemplate: 1,
  formTemplate: 1,
  formFields: [],
  formDefaultValues: [],
  formValidations: {},
  pageSize: 10,
  canAddNewRecord: false,
  backendPagination: true,
  hasDetails: false,
  defaultFiltrationColumn: "title",
  filtrationColumns: generalColumns(true, "transactions")
    .map((column) => column.id!)
    .filter((column) => !excludedColumns.includes(column!)),
};
