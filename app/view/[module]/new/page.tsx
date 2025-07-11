import FormClientWrapper from "@/app/_components/form/_subComponents/FormClientWrapper";
import ModuleNotFound from "@/app/_components/general/ModuleNotFound";
import { configType } from "@/app/_types/configType";
import { ModulesSet } from "@/app/_utils/constants/ModulesSet";

interface pageProps {
  params: Promise<any>;
}

async function page({ params }: pageProps) {
  const { module } = await params;
  if (!ModulesSet.has(module)) return <ModuleNotFound />;

  const configModule = await import(
    `@/app/_features/${module}/${module}Config.ts`
  );
  const config: configType<any> = configModule[`${module}Config`];

  if (!config.canAddNewRecord)
    throw new Error("Can't add new record of module !!");

  return <FormClientWrapper singleRecord={{}} />;
}

export default page;
