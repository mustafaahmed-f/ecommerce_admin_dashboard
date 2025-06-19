import ModuleNotFound from "@/app/_components/general/ModuleNotFound";
import { ModulesSet } from "@/app/_utils/constants/ModulesSet";

interface pageProps {
  params: Promise<any>;
}

async function page({ params }: pageProps) {
  const { module } = await params;
  if (!ModulesSet.has(module)) return <ModuleNotFound />;
  return <div></div>;
}

export default page;
