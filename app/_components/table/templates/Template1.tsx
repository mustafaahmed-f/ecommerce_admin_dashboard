"use client";

import { flexRender, type Table } from "@tanstack/react-table";
import { useParams } from "next/navigation";
import { Button } from "../../ui/button";

interface Template1Props {
  data: any;
  tableInstance: Table<any>;
  config: any;
}

function Template1({ data, tableInstance, config }: Template1Props) {
  const { module } = useParams();
  return (
    <section className="w-full h-full flex flex-col items-center gap-6 sm:gap-8">
      <div className="flex items-center justify-between w-full">
        <p className="font-bold text-xl sm:text-3xl md:text-4xl">
          {config.title}
        </p>
        {config.canAddNewRecord && (
          <Button variant={"default"} className="ms-auto cursor-pointer">
            Add New
          </Button>
        )}
      </div>

      <div className="flex items-center justify-center w-full ">
        <div className="overflow-hidden rounded-2xl shadow-lg border-t bg-transparent px-3">
          <table className="overflow-hidden relative">
            <thead className="sticky top-0">
              {tableInstance.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <th
                        key={header.id}
                        colSpan={header.colSpan}
                        className={`text-sm p-1  sm:p-3 text-nowrap border-b font-medium text-center text-table-header text-[16px]`}
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
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
                      className="border-b text-center px-1 py-4"
                      key={cell.id}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

export default Template1;
