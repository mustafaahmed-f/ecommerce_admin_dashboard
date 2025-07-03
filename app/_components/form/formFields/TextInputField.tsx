import { inputFieldType } from "@/app/_types/inputFieldType";
import { getErrObject } from "@/app/_utils/helperMethods/getErrObject";
import {
  FieldValues,
  PathValue,
  UseFormRegister,
  UseFormSetValue,
  UseFormTrigger,
  UseFormWatch,
} from "react-hook-form";
import { Input } from "../../ui/input";
import { useState } from "react";

interface TextInputFieldProps<T extends FieldValues> extends inputFieldType<T> {
  register: UseFormRegister<T>;
  errors: any;
  watch: UseFormWatch<T>;
  setValue: UseFormSetValue<T>;
  trigger: UseFormTrigger<T>;
  isNumber?: boolean;
  isPassword?: boolean;
}

function TextInputField<T extends FieldValues>({
  name,
  lable,
  fullWidth,
  required,
  placeholder,
  trigger,
  setValue,
  watch,
  errors,
  isNumber = false,
  isNullable = false,
  isPassword = false,
}: TextInputFieldProps<T>) {
  const watchedValue: PathValue<T, typeof name> = watch(name);
  const errorObj = getErrObject<T>(errors, name);
  const [showPass, setShowPass] = useState(false);

  return (
    <div
      className={`flex flex-col items-start ${
        fullWidth ? "col-span-2" : "col-span-1"
      } w-full`}
    >
      <label htmlFor={name} className="mb-1 text-sm font-medium text-gray-700">
        {lable}
        {required && <span className="ms-1 text-red-500">*</span>}
      </label>
      <Input
        id={name}
        type={
          isNumber ? "number" : isPassword && !showPass ? "password" : "text"
        }
        placeholder={placeholder}
        value={watchedValue ?? ""}
        onChange={(e: any) => {
          if (isNumber) {
            if (
              name === "discount" &&
              (parseInt(e.target.value) < 0 || parseInt(e.target.value) > 100)
            ) {
              return;
            } else if (!isNullable && e.target.value === "") {
              setValue(name, 0 as PathValue<T, typeof name>, {
                shouldValidate: true,
              });
              return;
            } else if (
              isNullable &&
              (e.target.value === "" || e.target.value === "0")
            ) {
              setValue(name, null as PathValue<T, typeof name>, {
                shouldValidate: true,
              });
              return;
            }
          }
          const value = isNumber ? +e.target.value : e.target.value;
          setValue(name, value as PathValue<T, typeof name>, {
            shouldValidate: true,
          });
          trigger(name);
        }}
        className={`w-full ${errorObj ? "border-red-500" : ""}`}
      />
      {errorObj && (
        <p className="mt-1 text-xs text-red-600">{errorObj.message}</p>
      )}

      {isPassword && name !== "rePassword" && (
        <div className="flex items-center gap-1 px-2 py-1">
          <input
            type="checkbox"
            id={`${name}-show-password`}
            onChange={(e) => setShowPass(e.target.checked)}
          />
          <label htmlFor={`${name}-show-password`} className="select-none">
            Show password
          </label>
        </div>
      )}
    </div>
  );
}

export default TextInputField;
