import { useParams } from "next/navigation";
import {
  FieldValues,
  Path,
  PathValue,
  UseFormRegister,
  UseFormSetValue,
  UseFormTrigger,
  UseFormWatch,
} from "react-hook-form";

import { inputFieldType } from "@/app/_types/inputFieldType";
import { Input } from "../../ui/input";
import RemoveCircleIcon from "@/app/_icons/RemoveCircleIcon";
import AddCircleIcon from "@/app/_icons/AddCircleIcon";
import { getErrObject } from "@/app/_utils/helperMethods/getErrObject";

interface QuantityControlProps<T extends FieldValues>
  extends inputFieldType<T> {
  register: UseFormRegister<T>;
  errors: any;
  watch: UseFormWatch<T>;
  setValue: UseFormSetValue<T>;
  trigger: UseFormTrigger<T>;
}

function QuantityControl<T extends FieldValues>({
  name,
  lable,
  required,
  placeholder,
  register,
  errors,
  watch,
  setValue,
  trigger,
  fullWidth,
}: QuantityControlProps<T>) {
  const errObj = getErrObject<T>(errors, name);

  const quantityValue = watch(name);

  const handleIncrement = () => {
    if (quantityValue) {
      setValue(
        name,
        ((quantityValue as number) + 1) as PathValue<T, typeof name>,
      );
      trigger(name);
    }
  };

  const handleDecrement = () => {
    if (quantityValue) {
      setValue(
        name,
        ((quantityValue as number) - 1) as PathValue<T, typeof name>,
      );
      trigger(name);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === "" || e.target.value === "0") return;

    if (/^\d*$/.test(e.target.value)) {
      setValue(name, parseInt(e.target.value) as PathValue<T, typeof name>);
      trigger(name);
    }
  };

  return (
    <div
      className={`flex flex-col items-start ${
        fullWidth ? "col-span-2" : "col-span-1"
      } w-full`}
    >
      <div className="flex w-fit flex-col gap-1">
        <label htmlFor={name} className="text-sm font-medium text-gray-700">
          {lable}
          {required && <span className="ms-1 text-red-500">*</span>}
        </label>
        <div className="flex items-center gap-4">
          <div className={`flex items-center gap-2`}>
            <span onClick={handleDecrement} className="cursor-pointer">
              <RemoveCircleIcon />
            </span>
            <Input
              {...register(name)}
              id={name}
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              value={quantityValue}
              onChange={handleInputChange}
              placeholder={placeholder}
              className={`w-[60px] text-center ${errObj ? "border-red-500" : ""}`}
            />
            <span onClick={handleIncrement} className="cursor-pointer">
              <AddCircleIcon />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default QuantityControl;
