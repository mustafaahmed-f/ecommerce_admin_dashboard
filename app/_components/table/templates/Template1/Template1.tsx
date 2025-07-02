"use client";

import { useNextNavigation } from "@/app/_context/NextNavigationProvider";
import { useTableContext } from "@/app/_context/TableProvider";
import { useState } from "react";
import TableUI1 from "./TableUI1";

function Template1() {
  const { searchParams } = useNextNavigation();
  const { tableInstance, config, additionalInfo, pageSize } = useTableContext();

  const params = new URLSearchParams(searchParams);

  const backEndInitialSorting: [string, 1 | -1][] =
    params.get("sort") === undefined ||
    params.get("sort") === "" ||
    params.get("sort") === null
      ? []
      : (params.get("sort") || "")
          .split("/")
          .map((sortField: string) => [
            sortField.startsWith("-") ? sortField.slice(1) : sortField,
            sortField.startsWith("-") ? -1 : 1,
          ]);

  const { 0: sortingMap, 1: setSortingMap } = useState<Map<string, 1 | -1 | 0>>(
    new Map(backEndInitialSorting),
  );

  const size = parseInt(params.get("pageSize") ?? "10");
  let count = config!.backendPagination
    ? Math.ceil(additionalInfo / (size ?? 10))
    : Math.ceil(tableInstance!.getFilteredRowModel().rows.length / pageSize);

  return (
    <TableUI1
      count={count}
      sortingMap={sortingMap}
      setSortingMap={setSortingMap}
    />
  );
}

export default Template1;
