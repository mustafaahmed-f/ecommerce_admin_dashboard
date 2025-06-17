import { getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { generalColumns } from "./columns";
import { Product } from "../types/productType";
import { useMemo } from "react";
import { products } from "../utils/fakeData";

export function useDataTable() {
  const columns = useMemo(() => generalColumns(true, "products"), []);

  const table = useReactTable<Product>({
    columns,
    data: products,
    getCoreRowModel: getCoreRowModel(),
  });

  return table;
}
