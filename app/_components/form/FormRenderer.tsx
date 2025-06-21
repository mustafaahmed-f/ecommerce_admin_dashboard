import { inputFieldType } from "@/app/_types/inputFieldType";
import {
  Control,
  FieldValues,
  UseFormRegister,
  UseFormSetValue,
  UseFormTrigger,
  UseFormWatch,
} from "react-hook-form";
import DropListField from "./formFields/DropListField";
import PhoneInputField from "./formFields/PhoneInputField";
import TextInputField from "./formFields/TextInputField";
import QuantityControl from "./formFields/QuantityControl";
import TextArea from "./formFields/TextArea";

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
    <div className="grid w-full grid-cols-2 gap-x-4 gap-y-3">
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

          case "quantity":
            return (
              <QuantityControl<T>
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

          case "TextArea":
            return (
              <TextArea<T>
                {...field}
                key={field.name}
                watch={watch}
                setValue={setValue}
                trigger={trigger}
                register={register}
                errors={errors}
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
              />
            );
        }
      })}
    </div>
  );
}

export default FormRenderer;
