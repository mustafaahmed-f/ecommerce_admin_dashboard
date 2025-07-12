import DetailsClientWrapper from "@/app/_components/general/DetailsClientWrapper";
import ModuleNotFound from "@/app/_components/general/ModuleNotFound";
import Spinner from "@/app/_components/general/Spinner";
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

  const configModule = await import(
    `@/app/_features/${module}/${module}Config.ts`
  );

  const config = configModule[`${module}Config`];

  if (!config.hasDetails) throw new Error(`No details for ${module}`);

  const ModuleAPIs = await import(
    `@/app/_features/${module}/services/${module}APIs`
  );

  let response = await ModuleAPIs.getSingleRecord(id, cookieHeader);

  const singleRecord = response.result;

  return (
    <DetailsClientWrapper singleRecord={singleRecord}></DetailsClientWrapper>
  );
}

export default Page;
