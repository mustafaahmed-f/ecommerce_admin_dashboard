import ModuleNotFound from "@/app/_components/general/ModuleNotFound";
import TableClientWrapper from "@/app/_components/table/_subComponents/TableClientWrapper";
import { configType } from "@/app/_types/configType";
import { ModulesSet } from "@/app/_utils/constants/ModulesSet";
import { cookies } from "next/headers";

interface PageProps {
  params: Promise<{ module: string }>;
  searchParams: Promise<any>;
}

async function Page({ params, searchParams }: PageProps) {
  const { module } = await params;
  if (!ModulesSet.has(module)) return <ModuleNotFound />;
  const { page, pageSize, searchTerm, searchField, sort } = await searchParams;
  const cookieStore = await cookies();
  const cookieHeader = {
    Cookie: cookieStore.toString(),
  };
  const apis = await import(`@/app/_features/${module}/services/${module}APIs`);
  const configModule = await import(
    `@/app/_features/${module}/${module}Config.ts`
  );
  const config: configType<any> = configModule[`${module}Config`];

  const { result: data, additionalInfo } = config.backendPagination
    ? await apis.getAllRecords({
        page: page ?? 1,
        pageSize: pageSize ?? 10,
        sort: sort ?? "",
        searchTerm: searchTerm ?? "",
        searchField: searchField ?? "",
        cookieHeader,
      })
    : await apis.getAllRecords({ cookieHeader });

  return <TableClientWrapper data={data} additionalInfo={additionalInfo} />;
}

export default Page;
