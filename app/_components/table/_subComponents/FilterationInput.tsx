import { useNextNavigation } from "@/app/_context/NextNavigationProvider";
import { useTableContext } from "@/app/_context/TableProvider";
import { TransitionStartFunction, useRef, useState } from "react";
import { Button } from "../../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../ui/dropdown-menu";
import { Input } from "../../ui/input";

function FilterationInput({
  startTransition,
}: {
  startTransition: TransitionStartFunction;
}) {
  const timerOut = useRef<NodeJS.Timeout | null>(null);
  const { router, searchParams, pathName } = useNextNavigation();
  const { 0: inputValue, 1: setInputValue } = useState<string>("");
  const { config, setCurrentFilterColumn, currentFilterColumn, tableInstance } =
    useTableContext();
  const backendPagination = config?.backendPagination;
  const filtrationColumns = config?.filtrationColumns;

  function handleBackEndLogic(
    searchTermValue: string,
    searchFieldValue: string,
  ) {
    const params = new URLSearchParams(searchParams);
    params.set("searchTerm", searchTermValue);
    params.set("searchField", searchFieldValue);
    params.set("page", "1");
    startTransition(() => {
      router.replace(`${pathName}?${params.toString()}`);
    });
  }

  function handleFiltration(e: React.ChangeEvent<HTMLInputElement>) {
    setInputValue(e.target.value);
    if (backendPagination) {
      clearTimeout(timerOut.current!);
      timerOut.current = setTimeout(() => {
        handleBackEndLogic(e.target.value, currentFilterColumn);
      }, 500);
    } else {
      //// handle client side filtration
      const tableColumn = tableInstance!.getColumn(currentFilterColumn);
      tableColumn?.setFilterValue(e.target.value);
    }
  }

  function setFilterColumn(column: string) {
    setInputValue("");
    setCurrentFilterColumn(column);
    if (backendPagination) {
      handleBackEndLogic("", column);
    } else {
      //// handle client side filtration
      tableInstance!.setColumnFilters([{ id: column, value: "" }]);
      const tableColumn = tableInstance!.getColumn(column);
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
            {filtrationColumns!.map((column) => (
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
