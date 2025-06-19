import { inputFieldType } from "@/app/_types/inputFieldType";
import { FieldValues } from "react-hook-form";

interface Template1Props<T extends FieldValues> {
  defaultValues: T;
  validations: any; // Can use Yup schema here
  fields: inputFieldType<T>[];
}

function Template1<T extends FieldValues>({}: Template1Props<T>) {
  return <div></div>;
}

export default Template1;
