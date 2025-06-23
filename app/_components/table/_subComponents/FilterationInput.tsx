import { useRef, useState } from "react";
import { Input } from "../../ui/input";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Table } from "@tanstack/react-table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../ui/dropdown-menu";
import { Button } from "../../ui/button";

interface FilterationInputProps {
  backendPagination?: boolean;
  tableInstance: Table<any>;
  currentFilterColumn: string;
  setCurrentFilterColumn: React.Dispatch<React.SetStateAction<string>>;
  filtrationColumns: string[];
}

function FilterationInput({
  backendPagination,
  tableInstance,
  currentFilterColumn,
  setCurrentFilterColumn,
  filtrationColumns,
}: FilterationInputProps) {
  const timerOut = useRef<NodeJS.Timeout | null>(null);
  const router = useRouter();
  const pathName = usePathname();
  const searchParams = useSearchParams();
  const { 0: inputValue, 1: setInputValue } = useState<string>("");
  function handleFiltration(e: React.ChangeEvent<HTMLInputElement>) {
    setInputValue(e.target.value);
    if (backendPagination) {
      clearTimeout(timerOut.current!);
      timerOut.current = setTimeout(() => {
        const params = new URLSearchParams(searchParams);
        params.set("searchTerm", e.target.value);
        params.set("searchField", currentFilterColumn);
        params.set("page", "1");
        router.replace(`${pathName}?${params.toString()}`);
      }, 900);
    } else {
      //// handle client side filtration
      const tableColumn = tableInstance.getColumn(currentFilterColumn);
      tableColumn?.setFilterValue(e.target.value);
    }
  }

  function setFilterColumn(column: string) {
    setInputValue("");
    setCurrentFilterColumn(column);
    if (backendPagination) {
      const params = new URLSearchParams(searchParams);
      params.set("searchTerm", "");
      params.set("searchField", column);
      params.set("page", "1");
      router.replace(`${pathName}?${params.toString()}`);
    } else {
      //// handle client side filtration
      tableInstance.setColumnFilters([{ id: column, value: "" }]);
      const tableColumn = tableInstance.getColumn(column);
      tableColumn?.setFilterValue("");
    }
  }

  return (
    <div className="mb-4 flex w-full flex-col items-center justify-center max-sm:flex-wrap max-sm:gap-4 sm:flex-row sm:justify-between">
      <div className="flex items-center gap-1">
        <p className="text-sm font-semibold text-gray-700">Filter By:</p>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant={"outline"}
              className="flex cursor-pointer items-center gap-1 px-1 py-0.5 text-sm"
            >
              {currentFilterColumn}
              <span className="text-xs">▼</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {filtrationColumns.map((column) => (
              <DropdownMenuItem
                key={column}
                onClick={() => setFilterColumn(column)}
                // className="cursor-pointer"
              >
                {column}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <Input
        id="filterationInput"
        placeholder="Search ..."
        onChange={handleFiltration}
        value={inputValue}
        className="max-w-[200px]"
      />
    </div>
  );
}

export default FilterationInput;
