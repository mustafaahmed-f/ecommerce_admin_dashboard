"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Spinner from "../../general/Spinner";
import { configType } from "@/app/_types/configType";

interface FormClientWrapperProps {
  singleRecord: any;
}

function FormClientWrapper({ singleRecord }: FormClientWrapperProps) {
  const { module } = useParams();
  const [config, setConfig] = useState<configType<any> | null>(null);
  const [FormComponent, setFormComponent] =
    useState<React.ComponentType<any> | null>(null);

  useEffect(() => {
    const loadDependencies = async () => {
      const configModule = await import(
        `@/app/_features/${module}/${module}Config.ts`
      );

      const formTemplate = configModule.config.formTemplate;

      const Component = (
        await import(`@/app/_components/form/templates/Template${formTemplate}`)
      ).default;

      setConfig(configModule.config);

      setFormComponent(() => Component);
    };

    loadDependencies();
  }, [module]);

  const finalDefaultValues = { ...config?.formDefaultValues, ...singleRecord };

  if (!FormComponent) {
    return <Spinner />;
  }

  return (
    <FormComponent
      title={config?.title}
      fields={config?.formFields}
      defaultValues={finalDefaultValues}
      validations={config?.formValidations}
    />
  );
}

export default FormClientWrapper;
