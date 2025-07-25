import { configType } from "@/app/_types/configType";
import { InferFormValues } from "@/app/_types/InferFormValuesType";

export const usersConfig: configType<InferFormValues<any>> = {
  title: "Users",
  tableTemplate: 1,
  formTemplate: 1,
  formFields: [],
  formDefaultValues: {},
  formValidations: {} as any,
  pageSize: 10,
  canAddNewRecord: false,
  canEditRecord: false,
  backendPagination: true,
  hasDetails: true,
  hasFiltration: true,
  defaultFiltrationColumn: "userName",
  filtrationColumns: ["userName", "firstName", "lastName", "email"],
  typeOfPagination: "number",
};
