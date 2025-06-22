"use client";

import { flexRender, type Table } from "@tanstack/react-table";
import { useParams, useSearchParams } from "next/navigation";
import { Button } from "../../ui/button";
import ShadcnPagination from "../../general/ShadcnPagination";
import Link from "next/link";
import { configType } from "@/app/_types/configType";

interface Template1Props {
  data: any;
  tableInstance: Table<any>;
  config: configType<any>;
  additionalInfo?: any;
  pageCount: number;
}

function Template1({
  data,
  tableInstance,
  config,
  additionalInfo,
  pageCount,
}: Template1Props) {
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const size = parseInt(params.get("pageSize") ?? "10");
  let count = config.backendPagination
    ? Math.ceil(additionalInfo / (size ?? 10))
    : pageCount;

  const { module } = useParams();
  return (
    <section className="flex h-full min-w-full flex-col items-center gap-6 sm:gap-8">
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

      <div className="flex w-full items-center justify-center">
        <div className="max-h-[600px] w-full overflow-y-auto rounded-2xl border-t bg-transparent px-3 shadow-lg">
          <table className="relative w-full table-auto">
            <thead className="bg-primary-foreground sticky top-0 z-10 border-b">
              {tableInstance.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id} className="border-b">
                  {headerGroup.headers.map((header) => {
                    return (
                      <th
                        key={header.id}
                        colSpan={header.colSpan}
                        className={`text-table-header p-1 text-center text-sm text-[16px] font-medium text-nowrap sm:p-3 ${(header.column.columnDef.meta as any)?.className ?? ""}`}
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                      </th>
                    );
                  })}
                </tr>
              ))}
            </thead>

            <tbody>
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
