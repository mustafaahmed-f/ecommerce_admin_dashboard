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
import { loginFn } from "../services/loginMethod";
import { showErrorToast, showSuccessToast } from "@/app/_utils/toasts";

interface LoginUIProps {}

function LoginUI({}: LoginUIProps) {
  const { router, searchParams } = useNextNavigation();
  const { 0: isLoading, 1: setIsLoading } = useState<boolean>(false);
  const redirectURL = searchParams.get("redirectto") || "/";

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
    setIsLoading(true);
    try {
      const response = await loginFn(data.email, data.password);
      if (response.success) {
        setIsLoading(false);
        showSuccessToast(response.message);
        //TODO: dispatch user to redux;
        await new Promise((resolve) => setTimeout(resolve, 1000));
        //// Get search Params from url:
        let finalURL = new URL(redirectURL, window.location.origin);
        searchParams.forEach((value, key) => {
          if (key !== "redirectto") {
            finalURL.searchParams.set(key, value);
          }
        });
        window.location.href = finalURL.pathname + finalURL.search;
      } else {
        setIsLoading(false);
        showErrorToast(response.message);
      }
    } catch (error: any) {
      setIsLoading(false);
      showErrorToast(error.message || "Unknown error from login API");
    }
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
