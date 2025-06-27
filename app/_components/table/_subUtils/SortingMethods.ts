import { configType } from "@/app/_types/configType";
import { Header, Table } from "@tanstack/react-table";
import { TransitionStartFunction } from "react";

export function indicateSortDirection(
  config: configType<any> | null,
  header: Header<any, unknown>,
  sortingMap: Map<string, 1 | -1 | 0>,
): 0 | 1 | -1 {
  if (config!.backendPagination) {
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

export function handleSorting(
  config: configType<any> | null,
  tableInstance: Table<any> | null,
  sortingMap: Map<string, 1 | -1 | 0>,
  setSortingMap: React.Dispatch<React.SetStateAction<Map<string, 1 | -1 | 0>>>,
  searchParams: URLSearchParams,
  router: any,
  pathName: string,
  header: Header<any, unknown>,
  startTransition: TransitionStartFunction,
) {
  let newMap = new Map(sortingMap);
  if (config!.backendPagination) {
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
    tableInstance!.getColumn(header.id)?.toggleSorting(undefined, true);
  }
}
