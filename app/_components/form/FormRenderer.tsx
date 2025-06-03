import { inputFieldType } from "@/app/_types/inputFieldType";
import {
  Control,
  FieldValues,
  Path,
  UseFormRegister,
  UseFormSetValue,
  UseFormTrigger,
  UseFormWatch,
} from "react-hook-form";
import TextInputField from "./formFields/TextInputField";
import DropListField from "./formFields/DropListField";
import PhoneInputField from "./formFields/PhoneInputField";

interface FormRendererProps<T extends FieldValues> {
  fields: inputFieldType<T>[];
  register: UseFormRegister<T>;
  errors: any;
  watch: UseFormWatch<T>;
  setValue: UseFormSetValue<T>;
  trigger: UseFormTrigger<T>;
  control: Control<T>;
}

function FormRenderer<T extends FieldValues>({
  fields,
  watch,
  trigger,
  errors,
  setValue,
  register,
  control,
}: FormRendererProps<T>) {
  return (
    <div className="grid w-full grid-cols-2 gap-x-2 gap-y-3">
      {fields.map((field: inputFieldType<T>) => {
        switch (field.type) {
          case "dropdown":
            return (
              <DropListField<T>
                {...field}
                key={field.name}
                watch={watch}
                setValue={setValue}
                trigger={trigger}
                register={register}
                errors={errors}
              />
            );

          case "phone":
            return (
              <PhoneInputField<T>
                {...field}
                key={field.name}
                watch={watch}
                setValue={setValue}
                trigger={trigger}
                register={register}
                errors={errors}
                control={control}
              />
            );

          default:
            return (
              <TextInputField<T>
                {...field}
                key={field.name}
                watch={watch}
                setValue={setValue}
                trigger={trigger}
                register={register}
                errors={errors}
                isPassword={field.type === "password"}
              />
            );
        }
      })}
    </div>
  );
}

export default FormRenderer;
