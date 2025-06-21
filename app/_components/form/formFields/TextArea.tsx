import { inputFieldType } from "@/app/_types/inputFieldType";
import { getErrObject } from "@/app/_utils/helperMethods/getErrObj";
import {
  FieldValues,
  PathValue,
  UseFormRegister,
  UseFormSetValue,
  UseFormTrigger,
  UseFormWatch,
} from "react-hook-form";
import { Textarea } from "../../ui/textarea";

interface TextAreaProps<T extends FieldValues> extends inputFieldType<T> {
  register: UseFormRegister<T>;
  errors: any;
  watch: UseFormWatch<T>;
  setValue: UseFormSetValue<T>;
  trigger: UseFormTrigger<T>;
}

function TextArea<T extends FieldValues>({
  name,
  lable,
  fullWidth,
  required,
  placeholder,
  trigger,
  setValue,
  watch,
  errors,
  register,
}: TextAreaProps<T>) {
  const watchedValue: PathValue<T, typeof name> = watch(name);
  const errorObj = getErrObject<T>(errors, name);
  return (
    <div className="col-span-2 flex w-full flex-col items-start">
      <label htmlFor={name} className="mb-1 text-sm font-medium text-gray-700">
        {lable}
        {required && <span className="ms-1 text-red-500">*</span>}
      </label>
      <Textarea
        id={name}
        placeholder={placeholder}
        rows={4}
        {...register(name)}
        value={watchedValue}
        className={`w-full ${errorObj ? "border-red-500" : ""}`}
      />
      {errorObj && (
        <p className="mt-1 text-xs text-red-600">{errorObj.message}</p>
      )}
    </div>
  );
}

export default TextArea;
