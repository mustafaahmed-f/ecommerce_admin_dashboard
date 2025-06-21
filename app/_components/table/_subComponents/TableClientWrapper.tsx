"use client";

import { useEffect, useMemo, useState } from "react";
import {
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Product } from "@/app/_features/products/types/productType";
import { Column } from "@tanstack/react-table";
import { useParams } from "next/navigation";
import Spinner from "../../general/Spinner";
import { configType } from "@/app/_types/configType";

interface TableClientWrapperProps {
  data: any[];
  additionalInfo?: any;
}

export default function TableClientWrapper({
  data,
  additionalInfo,
}: TableClientWrapperProps) {
  const { module } = useParams();
  const [TableComponent, setTableComponent] =
    useState<React.ComponentType<any> | null>(null);
  const [columns, setColumns] = useState<Column<any>[]>([]);
  const [config, setConfig] = useState<configType<any> | null>(null);

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
        columnsModule.generalColumns(configModule.config.hasDetails, module),
      );
      setTableComponent(() => Component);
    };

    loadDependencies();
  }, [module]);

  const table = useReactTable<Product>({
    columns: useMemo(() => columns, [columns]),
    data,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    manualPagination: config?.backendPagination ? true : false,
  });

  if (!TableComponent) {
    return <Spinner />;
  }

  return (
    <TableComponent
      tableInstance={table}
      config={config}
      data={data}
      additionalInfo={additionalInfo}
    />
  );
}
