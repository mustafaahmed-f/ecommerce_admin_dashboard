"use client";

import { useNextNavigation } from "@/app/_context/NextNavigationProvider";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { validations } from "../utils/loginValidations";
import { InferFormValues } from "@/app/_types/InferFormValuesType";
import { yupResolver } from "@hookform/resolvers/yup";
import { defaultValues } from "../utils/loginDefaultValues";
import { Button } from "@/app/_components/ui/button";
import FormRenderer from "@/app/_components/form/FormRenderer";
import { formFields } from "../utils/loginFormFields";

interface LoginUIProps {}

function LoginUI({}: LoginUIProps) {
  const { router } = useNextNavigation();
  const { 0: isLoading, 1: setIsLoading } = useState<boolean>(false);

  const methods = useForm<InferFormValues<typeof validations>>({
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

  async function onSubmit(data: InferFormValues<typeof validations>) {
    console.log(data);
  }

  return (
    <section className="bg-secondary-foreground m-auto rounded-2xl border-2 p-12">
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        className={`${isLoading ? "pointer-events-none opacity-40" : ""} mx-auto my-auto max-w-md`}
      >
        <FormRenderer<InferFormValues<typeof validations>>
          fields={formFields}
          watch={watch}
          setValue={setValue}
          trigger={trigger}
          register={register}
          errors={errors}
          control={methods.control}
          className="space-y-3"
        />
        <div className="mt-5 flex items-center justify-center px-1">
          <Button
            variant="default"
            className="bg-primary hover:bg-primary/70 cursor-pointer"
            type="submit"
            disabled={!isValid || isLoading}
          >
            {isLoading ? "Loading..." : "Login"}
          </Button>
        </div>
      </form>
    </section>
  );
}

export default LoginUI;
