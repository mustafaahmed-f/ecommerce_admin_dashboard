import { configType } from "@/app/_types/configType";
import { Table } from "@tanstack/react-table";

export interface TableProvderValuesType {
  tableInstance: Table<any>;
  config: configType<any> | null;
  data: any;
  additionalInfo: any;
  pageSize: number;
  currentFilterColumn: string;
  setCurrentFilterColumn: React.Dispatch<React.SetStateAction<string>>;
}
