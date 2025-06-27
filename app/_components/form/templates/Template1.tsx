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
    //TODO : check image type ( string or File ) in the api route
    //TODO : use form data to send data to api route so it can handle mixed types ( type of image )
    const formData = new FormData();

    formData.append("title", data.title);
    formData.append("image", data.image); // if image is a File object

    formData.append("price", String(data.price));
    formData.append("description", data.description);
    formData.append("brand", data.brand);
    formData.append("model", data.model);

    if (data.color) formData.append("color", data.color);
    if (data.size) formData.append("size", data.size);

    if (data.ram) formData.append("ram", String(data.ram));
    if (data.power) formData.append("power", String(data.power));
    if (data.fps) formData.append("fps", String(data.fps));
    if (data.soundOutput)
      formData.append("soundOutput", String(data.soundOutput));
    if (data.screenSize) formData.append("screenSize", String(data.screenSize));

    formData.append("category", data.category);
    formData.append("discount", String(data.discount));
    formData.append("stock", String(data.stock));

    try {
      const APIsFile = await import(
        `@/app/_features/${moduleName}/services/${moduleName}APIs`
      );
      const response = isEditMode
        ? await APIsFile.updateSingleRecord(id, formData)
        : await APIsFile.createSingleRecord(formData);

      if (response.success) {
        showSuccessToast(
          `${isEditMode ? "Record updated" : "Record created"} successfully!`,
        );

        router.push(`/view/${moduleName}`);
      } else {
        showErrorToast(
          response.error ||
            response.message ||
            `Failed ${isEditMode ? "updating" : "creating"} record`,
        );
      }

      setIsLoading(false);
    } catch (error: any) {
      showErrorToast(
        `Error submitting record : ${typeof error === "string" ? error : error.message ? error.message : "Unknown error"}`,
      );
      console.error("❌ Error submitting record:", error);
      setIsLoading(false);
    }
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
            {isEditMode ? "Update" : "Add New"}
          </Button>
        </div>
      </form>
    </section>
  );
}

export default Template1;
