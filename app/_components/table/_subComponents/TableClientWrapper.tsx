"use client";

import { useEffect, useMemo, useState } from "react";
import {
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Product } from "@/app/_features/products/types/productType";
import { Column } from "@tanstack/react-table";
import { useParams } from "next/navigation";
import Spinner from "../../general/Spinner";
import { configType } from "@/app/_types/configType";
import { ColumnFiltersState } from "../types/ColumnFilterType";
import TableProvider from "@/app/_context/TableProvider";
import { TableProvderValuesType } from "../types/TableProvderValuesType";

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
  const [currentFilterColumn, setCurrentFilterColumn] = useState<string>("");

  const [sorting, setSorting] = useState<SortingState>([]);

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
      setCurrentFilterColumn(configModule.config.defaultFiltrationColumn);
      setColumnFilters([
        {
          id: configModule.config.defaultFiltrationColumn,
          value: "",
        },
      ]);
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
    getSortedRowModel: getSortedRowModel(),

    manualPagination: config?.backendPagination ? true : false,
    manualFiltering: config?.backendPagination ? true : false,
    manualSorting: config?.backendPagination ? true : false,

    defaultColumn: {
      filterFn: "includesString",
      sortingFn: "alphanumeric",
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
      sorting,
    },

    onPaginationChange: setPagination,
    onColumnFiltersChange: setColumnFilters,
    onSortingChange: setSorting,

    autoResetPageIndex: true,
  });

  const TableProviderValues: TableProvderValuesType = {
    tableInstance: table,
    config: config,
    data: data,
    additionalInfo: additionalInfo,
    pageSize: pagination.pageSize,
    currentFilterColumn: currentFilterColumn,
    setCurrentFilterColumn: setCurrentFilterColumn,
  };

  if (!TableComponent) {
    return <Spinner />;
  }

  return (
    <TableProvider {...TableProviderValues}>
      <TableComponent />
    </TableProvider>
  );
}
