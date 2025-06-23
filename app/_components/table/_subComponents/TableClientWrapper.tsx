"use client";

import { useEffect, useMemo, useState } from "react";
import {
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Product } from "@/app/_features/products/types/productType";
import { Column } from "@tanstack/react-table";
import { useParams } from "next/navigation";
import Spinner from "../../general/Spinner";
import { configType } from "@/app/_types/configType";
import { ColumnFiltersState } from "../types/ColumnFilterType";
import { tableComponentPropsType } from "../types/tableComponentPropsType";

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
  const [pagination, setPagination] = useState({
    pageIndex: 0, //initial page index
    pageSize: 10, //default page size
  });
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [currentFilterColumn, setCurrentFilterColumn] = useState<string>(
    config?.defaultFiltrationColumn ?? "",
  );

  const pageCount = Math.ceil(data.length / pagination.pageSize); //// Used for client side pagination

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
    getFilteredRowModel: getFilteredRowModel(),

    manualPagination: config?.backendPagination ? true : false,
    manualFiltering: config?.backendPagination ? true : false,

    pageCount,

    defaultColumn: {
      filterFn: "includesString",
    },

    initialState: {
      pagination: {
        pageIndex: 0, //initial page index
        pageSize: 10, //default page size
      },
    },
    state: {
      pagination,
      columnFilters,
    },

    onPaginationChange: setPagination,
    onColumnFiltersChange: setColumnFilters,

    autoResetPageIndex: true,
  });

  if (!TableComponent) {
    return <Spinner />;
  }

  const TableComponentProps: tableComponentPropsType = {
    tableInstance: table,
    config: config,
    data: data,
    additionalInfo: additionalInfo,
    pageCount: pageCount,
    currentFilterColumn: currentFilterColumn,
    setCurrentFilterColumn: setCurrentFilterColumn,
  };

  return <TableComponent {...TableComponentProps} />;
}
