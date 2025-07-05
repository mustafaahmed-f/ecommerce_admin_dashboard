import FormClientWrapper from "@/app/_components/form/_subComponents/FormClientWrapper";
import ModuleNotFound from "@/app/_components/general/ModuleNotFound";
import { ModulesSet } from "@/app/_utils/constants/ModulesSet";
import { cookies } from "next/headers";

interface PageProps {
  params: Promise<any>;
}

async function Page({ params }: PageProps) {
  const { module, id } = await params;
  if (!ModulesSet.has(module)) return <ModuleNotFound />;

  const cookieStore = await cookies();
  const cookieHeader = {
    Cookie: cookieStore.toString(),
  };

  const isEditMode = id ? !!id : false;

  let singleRecord = {};

  if (isEditMode) {
    const singleRecordModule = await import(
      `@/app/_features/${module}/services/${module}APIs`
    );

    let response = await singleRecordModule.getSingleRecord(id, cookieHeader);

    singleRecord = response.result;
  }

  return <FormClientWrapper singleRecord={singleRecord} />;
}

export default Page;
