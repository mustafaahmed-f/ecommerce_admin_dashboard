"use client";

import { flexRender, type Table } from "@tanstack/react-table";
import { useParams } from "next/navigation";

interface Template1Props {
  data: any;
  tableInstance: Table<any>;
  config: any;
}

function Template1({ data, tableInstance, config }: Template1Props) {
  const { module } = useParams();
  return (
    <div className="flex items-center justify-center w-full h-full ">
      <table>
        <thead>
          {tableInstance.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <th
                    key={header.id}
                    colSpan={header.colSpan}
                    className="text-sm p-1 border font-bold text-center"
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
                <td className="border" key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Template1;
