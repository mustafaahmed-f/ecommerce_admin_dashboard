import { FieldValues } from "react-hook-form";
import { inputFieldType } from "./inputFieldType";
import * as yup from "yup";

export interface configType<T extends FieldValues> {
  title: string;
  tableTemplate: number;
  formTemplate: number;
  formFields: inputFieldType<T>[];
  formDefaultValues: T;
  formValidations: yup.AnySchema;
  pageSize: number; //// Size of data per page
  backendPagination?: boolean;
  hasDetails?: boolean;
  canAddNewRecord: boolean;
  hasFiltration: boolean;
  defaultFiltrationColumn: string;
  filtrationColumns: string[];
  typeOfPagination: "number" | "nextPrev";
}
