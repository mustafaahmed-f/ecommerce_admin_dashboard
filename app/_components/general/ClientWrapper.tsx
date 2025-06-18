"use client";

import { useEffect, useMemo, useState } from "react";
import { getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { Product } from "@/app/_features/products/types/productType";
import { Column } from "@tanstack/react-table";
import { useParams } from "next/navigation";

interface ClientWrapperProps {
  data: any[];
}

export default function ClientWrapper({ data }: ClientWrapperProps) {
  const { module } = useParams();
  const [TableComponent, setTableComponent] =
    useState<React.ComponentType<any> | null>(null);
  const [columns, setColumns] = useState<Column<any>[]>([]);
  const [config, setConfig] = useState<any>(null);

  useEffect(() => {
    const loadDependencies = async () => {
      const configModule = await import(
        `@/app/_features/${module}/${module}Config.ts`
      );
      const columnsModule = await import(
        `@/app/_features/${module}/table/columns.tsx`
      );
      const tableTemplate = configModule.config.tableTemplate;

      const Component = (
        await import(
          `@/app/_components/table/templates/Template${tableTemplate}`
        )
      ).default;

      setConfig(configModule.config);
      setColumns(
        columnsModule.generalColumns(configModule.config.hasDetails, module)
      );
      setTableComponent(() => Component);
    };

    loadDependencies();
  }, [module]);

  const table = useReactTable<Product>({
    columns: useMemo(() => columns, [columns]),
    data,
    getCoreRowModel: getCoreRowModel(),
  });

  if (!TableComponent) {
    return (
      <div className="w-full items-center justify-center">Loading table...</div>
    );
  }

  return <TableComponent tableInstance={table} config={config} data={data} />;
}
