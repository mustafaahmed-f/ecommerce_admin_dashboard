import FormClientWrapper from "@/app/_components/form/_subComponents/FormClientWrapper";
import ModuleNotFound from "@/app/_components/general/ModuleNotFound";
import { ModulesSet } from "@/app/_utils/constants/ModulesSet";

interface PageProps {
  params: Promise<any>;
}

async function Page({ params }: PageProps) {
  const { module, id } = await params;
  if (!ModulesSet.has(module)) return <ModuleNotFound />;

  const isEditMode = id ? !!id : false;

  let singleRecord = {};

  if (isEditMode) {
    const singleRecordModule = await import(
      `@/app/_features/${module}/services/${module}APIs`
    );

    let response = await singleRecordModule.getSingleRecord(id);

    singleRecord = response.result;
  }

  return <FormClientWrapper singleRecord={singleRecord} />;
}

export default Page;
