import { createColumnHelper } from "@tanstack/react-table";
import { StripeTransaction } from "../types/TransactionType";

const columnHelper = createColumnHelper<StripeTransaction>();

export const generalColumns = (hasDetails?: boolean, module?: string) => {
  return [
    columnHelper.accessor("id", {
      id: "id",
      header: "Transaction ID",
      cell: (info) => <span>{info.getValue()}</span>,
      enableSorting: true,
    }),
    columnHelper.accessor("created", {
      id: "created",
      header: "Date",
      cell: (info) => (
        <span>{new Date(info.getValue() * 1000).toLocaleDateString()}</span>
      ),
      enableSorting: true,
    }),
    columnHelper.accessor("merchant_name", {
      id: "merchant_name",
      header: "Merchant Name",
      cell: (info) => <span>{info.getValue() || "-"}</span>,
      enableSorting: true,
    }),
    columnHelper.accessor("merchant_category", {
      id: "merchant_category",
      header: "Merchant Category",
      cell: (info) => <span>{info.getValue() || "-"}</span>,
      enableSorting: true,
    }),
    columnHelper.accessor("amount", {
      id: "amount",
      header: "Amount",
      cell: (info) => {
        const val = info.getValue();
        const dollars = (val / 100).toFixed(2);
        return (
          <span className={val < 0 ? "text-red-600" : "text-green-600"}>
            {val < 0 ? "-" : ""}${Math.abs(Number(dollars))}
          </span>
        );
      },
      enableSorting: true,
    }),
    columnHelper.accessor("currency", {
      id: "currency",
      header: "Currency",
      cell: (info) => <span>{info.getValue().toUpperCase()}</span>,
      enableSorting: true,
    }),
    columnHelper.accessor("type", {
      id: "type",
      header: "Type",
      cell: (info) => <span>{info.getValue()}</span>,
      enableSorting: true,
    }),
    columnHelper.accessor("cardholder", {
      id: "cardholder",
      header: "Cardholder ID",
      cell: (info) => <span>{info.getValue()}</span>,
      enableSorting: true,
    }),
  ];
};
