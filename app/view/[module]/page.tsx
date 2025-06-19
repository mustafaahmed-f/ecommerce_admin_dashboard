import ClientWrapper from "@/app/_components/general/ClientWrapper";
import ModuleNotFound from "@/app/_components/general/ModuleNotFound";
import { ModulesSet } from "@/app/_utils/constants/ModulesSet";

interface PageProps {
  params: Promise<any>;
}

async function Page({ params }: PageProps) {
  const { module } = await params;
  if (!ModulesSet.has(module)) return <ModuleNotFound />;
  const apis = await import(`@/app/_features/${module}/services/${module}APIs`);
  const { result: data } = await apis.getAllRecords();

  return <ClientWrapper data={data} />;
}

export default Page;
