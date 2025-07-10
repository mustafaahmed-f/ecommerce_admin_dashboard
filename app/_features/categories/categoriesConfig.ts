import { configType } from "@/app/_types/configType";
import { InferFormValues } from "@/app/_types/InferFormValuesType";
import { validations } from "./utils/categoriesValidations";
import { defaultValues } from "./utils/categoriesDefaultValues";
import { formFields } from "./utils/categoriesFormFields";

export const categoriesConfig: configType<InferFormValues<typeof validations>> =
  {
    title: "Categories",
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
