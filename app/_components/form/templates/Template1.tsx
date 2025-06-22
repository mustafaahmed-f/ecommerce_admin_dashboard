"use client";

import { inputFieldType } from "@/app/_types/inputFieldType";
import { FieldValues, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { AnyObjectSchema } from "yup";
import { InferFormValues } from "@/app/_types/InferFormValuesType";
import { Button } from "../../ui/button";
import FormRenderer from "../FormRenderer";
import { useState } from "react";
import { useParams, useRouter } from "next/navigation";

interface Template1Props<T extends AnyObjectSchema> {
  defaultValues: InferFormValues<T>;
  validations: T; // Can use Yup schema here
  fields: inputFieldType<T>[];
  title: string;
}

function Template1<T extends AnyObjectSchema>({
  defaultValues,
  validations,
  fields,
  title,
}: Template1Props<T>) {
  const router = useRouter();
  const { 0: isLoading, 1: setIsLoading } = useState<boolean>(false);

  const methods = useForm<InferFormValues<T>>({
    resolver: yupResolver(validations),
    mode: "onChange",
    reValidateMode: "onChange",
    criteriaMode: "firstError",
    defaultValues: defaultValues,
  });
  const {
    watch,
    formState: { errors, isValid },
    setValue,
    trigger,
    register,
    // getValues,
  } = methods;

  const { module: moduleName, id } = useParams();
  const isEditMode = !!id;

  async function onSubmit(data: InferFormValues<T>) {}

  return (
    <section className="flex h-full w-full flex-col items-center gap-6 sm:gap-8">
      <p className="w-full text-2xl font-bold sm:text-3xl md:text-4xl">
        {`${title} : `}{" "}
        <span className="font-normal">{`${isEditMode ? "Edit Record" : "Add New Record"}`}</span>
      </p>

      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        className={`${isLoading ? "pointer-events-none opacity-40" : ""} w-full`}
      >
        <FormRenderer<InferFormValues<T>>
          fields={fields}
          watch={watch}
          setValue={setValue}
          trigger={trigger}
          register={register}
          errors={errors}
          control={methods.control}
        />
        <div className="mt-5 flex items-center justify-end px-1">
          <Button variant="secondary" type="submit" disabled={!isValid}>
            Add New
          </Button>
        </div>
      </form>
    </section>
  );
}

export default Template1;
