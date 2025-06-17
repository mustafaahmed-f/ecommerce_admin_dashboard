import { getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { generalColumns } from "./columns";
import { Product } from "../types/productType";
import { useMemo } from "react";

export function useDataTable() {
  const columns = useMemo(() => generalColumns(true, "products"), []);

  const table = useReactTable<Product>({
    columns,
    data: [],
    getCoreRowModel: getCoreRowModel(),
  });

  return table;
}
