import { Table } from "@tanstack/react-table";
import { configType } from "../_types/configType";
import { createContext, useContext } from "react";

interface TableProviderProps {
  tableInstance: Table<any> | null;
  config: configType<any> | null;
  data: any;
  additionalInfo: any;
  pageSize: number;
  currentFilterColumn: string;
  setCurrentFilterColumn: React.Dispatch<React.SetStateAction<string>>;
  children: React.ReactNode;
}

interface initialStateType {
  tableInstance: Table<any> | null;
  config: configType<any> | null;
  data: any;
  additionalInfo: any;
  pageSize: number;
  currentFilterColumn: string;
  setCurrentFilterColumn: React.Dispatch<React.SetStateAction<string>>;
}

const intialState: initialStateType = {
  tableInstance: null,
  config: null,
  data: null,
  additionalInfo: null,
  pageSize: 10,
  currentFilterColumn: "",
  setCurrentFilterColumn: () => {},
};

const tableContext = createContext<initialStateType>(intialState);

function TableProvider({
  children,
  tableInstance,
  config,
  data,
  additionalInfo,
  pageSize,
  currentFilterColumn,
  setCurrentFilterColumn,
}: TableProviderProps) {
  return (
    <tableContext.Provider
      value={{
        tableInstance,
        config,
        data,
        additionalInfo,
        pageSize,
        currentFilterColumn,
        setCurrentFilterColumn,
      }}
    >
      {children}
    </tableContext.Provider>
  );
}

export function useTableContext() {
  const context = useContext(tableContext);
  if (!context) {
    throw new Error("useTableContext must be used within a table provider");
  }
  return context;
}

export default TableProvider;
