import { configType } from "@/app/_types/configType";
import { InferFormValues } from "@/app/_types/InferFormValuesType";
import { validations } from "./utils/ordersValidations";
import { defaultValues } from "./utils/ordersDefaultValues";
import { formFields } from "./utils/ordersFormFields";

export const ordersConfig: configType<InferFormValues<typeof validations>> = {
  title: "Orders",
  tableTemplate: 1,
  formTemplate: 1,
  formFields: formFields,
  formDefaultValues: defaultValues,
  formValidations: validations,
  pageSize: 10,
  canAddNewRecord: false,
  backendPagination: true,
  hasDetails: true,
  hasFiltration: true,
  defaultFiltrationColumn: "orderNumber",
  filtrationColumns: ["orderNumber", "status", "paymentMethod"],
  typeOfPagination: "number",
};
