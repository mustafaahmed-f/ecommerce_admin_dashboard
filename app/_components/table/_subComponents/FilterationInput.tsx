import { useRef, useState } from "react";
import { Input } from "../../ui/input";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Table } from "@tanstack/react-table";

interface FilterationInputProps {
  backendPagination?: boolean;
  tableInstance: Table<any>;
  currentFilterColumn: string;
  setCurrentFilterColumn: React.Dispatch<React.SetStateAction<string>>;
}

function FilterationInput({
  backendPagination,
  tableInstance,
  currentFilterColumn,
  setCurrentFilterColumn,
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
        router.replace(`${pathName}?${params.toString()}`);
      }, 1000);
    } else {
      //// handle client side filtration
    }
  }
  return (
    <div className="mb-4 flex w-full items-center justify-end">
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
