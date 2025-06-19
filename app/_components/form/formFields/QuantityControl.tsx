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
}: QuantityControlProps<T>) {
  const errObj = getErrObject<T>(errors, name);
  const params = useParams();

  function set<P extends Path<T>>(path: P, value: PathValue<T, P>) {
    setValue(path, value);
  }

  const quantityValue = watch("products.0.quantity" as Path<T>);

  function handlePaymentChange(quantity: number) {}

  const handleIncrement = () => {};

  const handleDecrement = () => {};

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === "" || e.target.value === "0") return;

    if (/^\d*$/.test(e.target.value)) {
    }
  };

  return (
    <div className={`col-span-2 flex justify-start`}>
      <div className="flex w-fit flex-col gap-1">
        <label
          htmlFor={name}
          className="mb-1 text-sm font-medium text-gray-700"
        >
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
