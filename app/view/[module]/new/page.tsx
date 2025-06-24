import FormClientWrapper from "@/app/_components/form/_subComponents/FormClientWrapper";
import ModuleNotFound from "@/app/_components/general/ModuleNotFound";
import { ModulesSet } from "@/app/_utils/constants/ModulesSet";

interface pageProps {
  params: Promise<any>;
}

async function page({ params }: pageProps) {
  const { module } = await params;
  if (!ModulesSet.has(module)) return <ModuleNotFound />;

  return <FormClientWrapper singleRecord={{}} />;
}

export default page;
