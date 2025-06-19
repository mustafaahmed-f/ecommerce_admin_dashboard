import ClientWrapper from "@/app/_components/general/ClientWrapper";
import ModuleNotFound from "@/app/_components/general/ModuleNotFound";
import { ModulesSet } from "@/app/_utils/constants/ModulesSet";

interface PageProps {
  params: Promise<any>;
  searchParams: any;
}

async function Page({ params, searchParams }: PageProps) {
  const { module } = await params;
  const { page, pageSize } = searchParams;
  if (!ModulesSet.has(module)) return <ModuleNotFound />;
  const apis = await import(`@/app/_features/${module}/services/${module}APIs`);
  const { result: data, additionalInfo } = await apis.getAllRecords({
    page: page ?? 1,
    pageSize: pageSize ?? 10,
  });

  return <ClientWrapper data={data} additionalInfo={additionalInfo} />;
}

export default Page;
