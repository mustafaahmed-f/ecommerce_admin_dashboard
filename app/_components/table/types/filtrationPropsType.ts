import { Table } from "@tanstack/react-table";

export interface filtrationPropsType {
  backendPagination: boolean;
  tableInstance: Table<any>;
  currentFilterColumn: string;
  setCurrentFilterColumn: React.Dispatch<React.SetStateAction<string>>;
  filtrationColumns: string[];
}
