"use client";

import { flexRender, type Table } from "@tanstack/react-table";
import { useParams, useSearchParams } from "next/navigation";
import { Button } from "../../ui/button";
import ShadcnPagination from "../../general/ShadcnPagination";

interface Template1Props {
  data: any;
  tableInstance: Table<any>;
  config: any;
  additionalInfo?: any;
}

function Template1({
  data,
  tableInstance,
  config,
  additionalInfo,
}: Template1Props) {
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const size = parseInt(params.get("pageSize") ?? "10");
  console.log("additionalInfo : ", additionalInfo);
  console.log("size : ", size);
  let count = Math.ceil(additionalInfo / (size ?? 10));
  console.log("Count : ", count);
  // const { module } = useParams();
  return (
    <section className="flex h-full w-full flex-col items-center gap-6 sm:gap-8">
      <div className="flex w-full items-center justify-between">
        <p className="text-2xl font-bold sm:text-3xl md:text-4xl">
          {config.title}
        </p>
        {config.canAddNewRecord ? (
          <Button variant={"default"} className="ms-auto cursor-pointer">
            Add New
          </Button>
        ) : (
          <span></span>
        )}
      </div>

      <div className="flex w-full items-center justify-center">
        <div className="max-h-[600px] overflow-y-auto rounded-2xl border-t bg-transparent px-3 shadow-lg">
          <table className="relative">
            <thead className="bg-primary-foreground sticky top-0 z-10 border-b">
              {tableInstance.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id} className="border-b">
                  {headerGroup.headers.map((header) => {
                    return (
                      <th
                        key={header.id}
                        colSpan={header.colSpan}
                        className={`text-table-header p-1 text-center text-sm text-[16px] font-medium text-nowrap sm:p-3`}
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
              {tableInstance.getCoreRowModel().rows.map((row) => (
                <tr key={row.id}>
                  {row.getAllCells().map((cell) => (
                    <td
                      className="border-b px-1 py-4 text-center"
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

      <ShadcnPagination count={count} showFirstLast={true} siblingCount={2} />
    </section>
  );
}

export default Template1;
