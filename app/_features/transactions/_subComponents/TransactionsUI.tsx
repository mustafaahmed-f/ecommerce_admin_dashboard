import MyCardsSection from "@/app/_components/DashBoard/MyCardsSection";
import NextPrevPagination from "@/app/_components/table/_subComponents/NextPrevPagination";
import { Button } from "@/app/_components/ui/button";
import { flexRender, Table } from "@tanstack/react-table";
import MyExpense from "./MyExpense";

interface TransactionsUIProps {
  table: Table<any> | null;
  handleNext: () => void;
  handlePrev: () => void;
  additionalInfo: {
    hasMore: boolean;
    hasPrevious: boolean;
    firstId: string;
    lastId: string;
  };
  isPending: boolean;
}

function TransactionsUI({
  table: tableInstance,
  handleNext,
  handlePrev,
  additionalInfo,
  isPending,
}: TransactionsUIProps) {
  console.log("Is pending : ", isPending);
  return (
    <section className="flex h-full w-full flex-col items-center gap-6 sm:gap-8">
      <div className="mb-5 grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="md:col-span-2">
          <div className="flex w-full items-center justify-between">
            <h2 className="text-xl font-bold">My Cards</h2>
            <Button variant={"ghost"} className="text-sm text-blue-600">
              + Add Card
            </Button>
          </div>
          <MyCardsSection />
        </div>
        <div className="md:col-span-1">
          <MyExpense />
        </div>
      </div>

      <h3>Transactions</h3>

      <div
        className={`${isPending ? "pointer-events-none opacity-45" : ""} max-h-[600px] w-full max-w-full overflow-auto rounded-2xl border-t bg-transparent px-3 shadow-lg max-md:max-w-screen`}
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
                    >
                      <div className="flex items-center justify-center gap-1">
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
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
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <NextPrevPagination
        hasNext={additionalInfo.hasMore}
        hasPrev={additionalInfo.hasPrevious}
        onNext={handleNext}
        onPrev={handlePrev}
      />
    </section>
  );
}

export default TransactionsUI;
