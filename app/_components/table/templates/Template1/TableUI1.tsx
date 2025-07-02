import { useTableContext } from "@/app/_context/TableProvider";
import { Button } from "../../../ui/button";
import Link from "next/link";
import FilterationInput from "../../_subComponents/FilterationInput";
import { useParams } from "next/navigation";
import { useTransition } from "react";
import { useNextNavigation } from "@/app/_context/NextNavigationProvider";
import {
  handleSorting,
  indicateSortDirection,
} from "../../_subUtils/SortingMethods";
import { flexRender } from "@tanstack/react-table";
import SortIndicators from "../../_subComponents/SortIndicators";
import ShadcnPagination from "../../_subComponents/ShadcnPagination";

interface TableUI1Props {
  count: number;
  sortingMap: Map<string, 1 | -1 | 0>;
  setSortingMap: React.Dispatch<React.SetStateAction<Map<string, 1 | -1 | 0>>>;
}

function TableUI1({ count, setSortingMap, sortingMap }: TableUI1Props) {
  const { module } = useParams();
  const { config, tableInstance } = useTableContext();
  const { 0: isPending, 1: startTransition } = useTransition();
  const { pathName, router, searchParams } = useNextNavigation();

  return (
    <section className="flex h-full w-full flex-col items-center gap-6 sm:gap-8">
      <div className="flex w-full items-center justify-between">
        <p className="text-2xl font-bold sm:text-3xl md:text-4xl">
          {config!.title}
        </p>
        {config!.canAddNewRecord ? (
          <Button variant={"default"} className="ms-auto cursor-pointer">
            <Link href={`/view/${module}/new`}>Add New</Link>
          </Button>
        ) : (
          <span></span>
        )}
      </div>

      <div className="w-full">
        {config?.hasFiltration && (
          <FilterationInput startTransition={startTransition} />
        )}
        <div
          className={`${isPending ? "pointer-events-none opacity-45" : ""} max-h-[600px] w-full overflow-auto rounded-2xl border-t bg-transparent px-3 shadow-lg max-md:max-w-screen`}
        >
          <table className="relative w-full table-auto">
            <thead className="bg-primary-foreground sticky top-0 z-10 border-b">
              {tableInstance!.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id} className="border-b">
                  {headerGroup.headers.map((header) => {
                    return (
                      <th
                        key={header.id}
                        colSpan={header.colSpan}
                        className={`${header.column.getCanSort() ? "hover:bg-secondary-foreground cursor-pointer" : ""} text-table-header p-1 text-center text-sm text-[16px] font-medium text-nowrap sm:p-3 ${(header.column.columnDef.meta as any)?.className ?? ""}`}
                        onClick={
                          header.column.getCanSort()
                            ? () =>
                                handleSorting(
                                  config,
                                  tableInstance,
                                  sortingMap,
                                  setSortingMap,
                                  searchParams,
                                  router,
                                  pathName,
                                  header,
                                  startTransition,
                                )
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
                              sortDirection={indicateSortDirection(
                                config,
                                header,
                                sortingMap,
                              )}
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
              {tableInstance!.getRowModel().rows.length === 0 && (
                <tr>
                  <td
                    colSpan={tableInstance!.getAllColumns().length}
                    className="h-24 text-center align-middle"
                  >
                    No results.
                  </td>
                </tr>
              )}

              {tableInstance!.getRowModel().rows.map((row) => (
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

      {config?.typeOfPagination === "number" && (
        <ShadcnPagination
          count={count}
          showFirstLast={true}
          siblingCount={2}
          startTransition={startTransition}
        />
      )}
    </section>
  );
}

export default TableUI1;
