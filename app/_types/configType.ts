import { FieldValues } from "react-hook-form";
import { inputFieldType } from "./inputFieldType";

export interface configType<T extends FieldValues> {
  title: string;
  tableTemplate: number;
  formTemplate: number;
  formFields: inputFieldType<T>[];
  formDefaultValues: T;
  formValidations: any;
  pageSize: number; //// Size of data per page
  backendPagination?: boolean;
  hasDetails?: boolean;
  canAddNewRecord: boolean;
}
