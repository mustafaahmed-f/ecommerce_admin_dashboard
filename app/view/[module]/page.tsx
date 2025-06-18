import ClientWrapper from "@/app/_components/general/ClientWrapper";

interface PageProps {
  params: Promise<any>;
}

async function Page({ params }: PageProps) {
  const { module } = await params;
  console.log(module);
  const apis = await import(`@/app/_features/${module}/services/${module}APIs`);
  const { result: data } = await apis.getAllRecords();

  return <ClientWrapper data={data} />;
}

export default Page;
