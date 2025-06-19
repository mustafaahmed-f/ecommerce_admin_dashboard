import ModuleNotFound from "@/app/_components/general/ModuleNotFound";
import { ModulesSet } from "@/app/_utils/constants/ModulesSet";

interface PageProps {
  params: Promise<any>;
}

async function Page({ params }: PageProps) {
  const { module } = await params;
  if (!ModulesSet.has(module)) return <ModuleNotFound />;
  return <div></div>;
}

export default Page;
