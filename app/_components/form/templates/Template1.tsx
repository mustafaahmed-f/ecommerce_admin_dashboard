"use client";

import { InferFormValues } from "@/app/_types/InferFormValuesType";
import { inputFieldType } from "@/app/_types/inputFieldType";
import { yupResolver } from "@hookform/resolvers/yup";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { AnyObjectSchema } from "yup";
import { Button } from "../../ui/button";
import FormRenderer from "../FormRenderer";

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
    getValues,
  } = methods;

  // console.log("Form values : ", getValues());

  const { module: moduleName, id } = useParams();
  const isEditMode = !!id;

  async function onSubmit(data: InferFormValues<T>) {
    //TODO : check image type ( string or File ) in the api route
    //TODO : use form data to send data to api route so it can handle mixed types ( type of image )
    /*
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("image", data.image); // File object
      // ... append all other fields

      await fetch("/api/products", {
        method: "POST",
        body: formData,
      });
    */
    // console.log("Submitted : ", data);
  }

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
          <Button
            variant="secondary"
            className="bg-primary hover:bg-primary/70 cursor-pointer"
            type="submit"
            disabled={!isValid}
          >
            Add New
          </Button>
        </div>
      </form>
    </section>
  );
}

export default Template1;
