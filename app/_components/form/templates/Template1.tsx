"use client";

import { useNextNavigation } from "@/app/_context/NextNavigationProvider";
import { InferFormValues } from "@/app/_types/InferFormValuesType";
import { inputFieldType } from "@/app/_types/inputFieldType";
import { showErrorToast, showSuccessToast } from "@/app/_utils/toasts";
import { yupResolver } from "@hookform/resolvers/yup";
import { useParams } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { AnyObjectSchema } from "yup";
import { Button } from "../../ui/button";
import FormRenderer from "../FormRenderer";
import { FormDataCreator } from "@/app/_utils/helperMethods/FormDataCreator";

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
  const { router } = useNextNavigation();
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
    setIsLoading(true);

    const formData = FormDataCreator(data);

    try {
      const APIsFile = await import(
        `@/app/_features/${moduleName}/services/${moduleName}APIs`
      );
      const response = isEditMode
        ? await APIsFile.updateSingleRecord(id, data.image ? formData : data)
        : await APIsFile.createSingleRecord(data.image ? formData : data);

      if (response.success) {
        showSuccessToast(
          `${isEditMode ? "Record updated" : "Record created"} successfully!`,
        );

        router.push(`/view/${moduleName}`);
      } else {
        if (response.message === "Validation failed") {
          showErrorToast(response.errors[0]);
        }
        showErrorToast(
          response.error ||
            response.message ||
            `Failed ${isEditMode ? "updating" : "creating"} record`,
        );
      }

      setIsLoading(false);
    } catch (error: any) {
      if (error.message === "Validation failed") {
        showErrorToast(error.errors);
      }
      showErrorToast(
        `Error submitting record : ${typeof error === "string" ? error : error.message ? error.message : "Unknown error"}`,
      );
      console.error("❌ Error submitting record:", error);
      setIsLoading(false);
    }
  }

  return (
    <section className="flex h-full w-full flex-col items-center">
      <div className="mb-4 flex w-full justify-start">
        <Button
          variant={"link"}
          onClick={() => router.back()}
          className="cursor-pointer px-0 text-black hover:underline"
        >
          {"← "}
          back
        </Button>
      </div>
      <p className="mb-4 w-full text-2xl font-bold sm:text-3xl md:text-4xl">
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
            {isEditMode ? "Update" : "Add New"}
          </Button>
        </div>
      </form>
    </section>
  );
}

export default Template1;
