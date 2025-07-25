import { FieldValues, Path } from "react-hook-form";

export interface inputFieldType<T extends FieldValues> {
  type:
    | "email"
    | "text"
    | "phone"
    | "dropdown"
    | "quantity"
    | "number"
    | "TextArea"
    | "date"
    | "image"
    | "password";
  name: Path<T>;
  lable: string;
  fullWidth: boolean;
  required: boolean;
  placeholder: string;
  optionsMethod?: (
    dependency?: string,
  ) => Promise<{ value: string; lable: string }[]>;
  dependency?: Path<T>;
  isNumber?: boolean; //// Used to make text input of type number
  isNullable?: boolean; //// Used to allow empty fields for numerical input field ( as this is not allowed by default )
}
