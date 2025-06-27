"use client";

import { configType } from "@/app/_types/configType";
import { flexRender, Header, type Table } from "@tanstack/react-table";
import Link from "next/link";
import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";
import SortIndicators from "../../form/_subComponents/SortIndicators";
import ShadcnPagination from "../_subComponents/ShadcnPagination";
import { Button } from "../../ui/button";
import FilterationInput from "../_subComponents/FilterationInput";
import { filtrationPropsType } from "../types/filtrationPropsType";
import { useState, useTransition } from "react";

interface Template1Props {
  data: any;
  tableInstance: Table<any>;
  config: configType<any>;
  additionalInfo?: any;
  pageSize: number;
  currentFilterColumn: string;
  setCurrentFilterColumn: React.Dispatch<React.SetStateAction<string>>;
}

function Template1({
  data,
  tableInstance,
  config,
  additionalInfo,
  pageSize,
  currentFilterColumn,
  setCurrentFilterColumn,
}: Template1Props) {
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const router = useRouter();
  const pathName = usePathname();

  const { 0: isPending, 1: startTransition } = useTransition();

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
  let count = config.backendPagination
    ? Math.ceil(additionalInfo / (size ?? 10))
    : Math.ceil(tableInstance.getFilteredRowModel().rows.length / pageSize);

  const { module } = useParams();

  const filtrationProps: filtrationPropsType = {
    backendPagination: config.backendPagination ?? false,
    filtrationColumns: config.filtrationColumns,
    tableInstance,
    currentFilterColumn,
    setCurrentFilterColumn,
  };

  function handleSorting(header: Header<any, unknown>) {
    let newMap = new Map(sortingMap);
    if (config.backendPagination) {
      switch (newMap.get(header.id)) {
        case undefined:
          newMap.set(header.id, 1);
          break;
        case 0:
          newMap.set(header.id, 1);
          break;
        case 1:
          newMap.set(header.id, -1);
          break;
        case -1:
          newMap.set(header.id, 0);
          break;
      }
      setSortingMap(newMap);
      const params = new URLSearchParams(searchParams);
      params.set(
        "sort",
        Array.from(newMap)
          .filter((item) => item[1] !== 0)
          .map((item) => `${item[1] === 1 ? "" : "-"}${item[0]}`)
          .join("/"),
      );
      params.set("page", "1");
      startTransition(() => {
        router.replace(`${pathName}?${params.toString()}`);
      });
    } else {
      tableInstance.getColumn(header.id)?.toggleSorting(undefined, true);
    }
  }

  function indicateSortDirection(header: Header<any, unknown>): 0 | 1 | -1 {
    if (config.backendPagination) {
      if (sortingMap.has(header.id)) {
        return sortingMap.get(header.id)!;
      }
      return 0;
    } else {
      //// handle clientSide indicator
      switch (header.column.getNextSortingOrder()) {
        case "asc":
          return 0;
        case "desc":
          return 1;
        case false:
          return -1;
        default:
          return 0;
      }
    }
  }

  console.log("Sorting state : ", tableInstance.getState().sorting);
  console.log(
    "Sorting direction of No column : ",
    tableInstance.getColumn("no")?.getNextSortingOrder(),
  );

  return (
    <section className="flex h-full w-full flex-col items-center gap-6 sm:gap-8">
      <div className="flex w-full items-center justify-between">
        <p className="text-2xl font-bold sm:text-3xl md:text-4xl">
          {config.title}
        </p>
        {config.canAddNewRecord ? (
          <Button variant={"default"} className="ms-auto cursor-pointer">
            <Link href={`/view/${module}/new`}>Add New</Link>
          </Button>
        ) : (
          <span></span>
        )}
      </div>

      <div className="w-full">
        <FilterationInput {...filtrationProps} />
        <div
          className={`${isPending ? "pointer-events-none opacity-45" : ""} max-h-[600px] w-full overflow-auto rounded-2xl border-t bg-transparent px-3 shadow-lg max-md:max-w-screen`}
        >
          <table className="relative w-full table-auto">
            <thead className="bg-primary-foreground sticky top-0 z-10 border-b">
              {tableInstance.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id} className="border-b">
                  {headerGroup.headers.map((header) => {
                    return (
                      <th
                        key={header.id}
                        colSpan={header.colSpan}
                        className={`${header.column.getCanSort() ? "hover:bg-secondary-foreground cursor-pointer" : ""} text-table-header p-1 text-center text-sm text-[16px] font-medium text-nowrap sm:p-3 ${(header.column.columnDef.meta as any)?.className ?? ""}`}
                        onClick={
                          header.column.getCanSort()
                            ? () => handleSorting(header)
                            : undefined
                        }
                      >
                        <div className="flex items-center justify-center gap-1">
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                          {header.column.getCanSort() && (
                            <SortIndicators
                              sortDirection={indicateSortDirection(header)}
                            />
                          )}
                        </div>
                      </th>
                    );
                  })}
                </tr>
              ))}
            </thead>

            <tbody>
              {/* If data array is empty, show no data message */}
              {tableInstance.getRowModel().rows.length === 0 && (
                <tr>
                  <td
                    colSpan={tableInstance.getAllColumns().length}
                    className="h-24 text-center align-middle"
                  >
                    No results.
                  </td>
                </tr>
              )}

              {tableInstance.getRowModel().rows.map((row) => (
                <tr key={row.id}>
                  {row.getAllCells().map((cell) => (
                    <td
                      className={`border-b px-1 py-4 text-center ${(cell.column.columnDef.meta as any)?.className ?? ""}`}
                      key={cell.id}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <ShadcnPagination
        count={count}
        showFirstLast={true}
        siblingCount={2}
        tableInstance={tableInstance}
        backendPagination={config.backendPagination}
      />
    </section>
  );
}

export default Template1;
