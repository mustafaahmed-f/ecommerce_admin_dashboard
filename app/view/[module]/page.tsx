import ClientWrapper from "@/app/_components/general/ClientWrapper";

interface PageProps {
  params: Promise<any>;
}

async function Page({ params }: PageProps) {
  const { module } = await params;
  console.log(module);
  // const [] = await Promise.all([]);

  return <ClientWrapper data={[]} />;
}

export default Page;
