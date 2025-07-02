import { createColumnHelper } from "@tanstack/react-table";
import { StripeTransaction } from "../types/TransactionType";
import TransactionStatus from "../_subComponents/TransactionStatus";

const columnHelper = createColumnHelper<StripeTransaction>();

export const generalColumns = () => {
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

    columnHelper.accessor("status", {
      id: "status",
      header: "Status",
      cell: (info) => <TransactionStatus status={info.getValue()} />,
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
    columnHelper.accessor("amount_received", {
      id: "amount_received",
      header: "Received",
      cell: (info) => {
        const val = info.getValue();
        const dollars = (val / 100).toFixed(2);
        return (
          <span className="text-green-600">${Math.abs(Number(dollars))}</span>
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
    columnHelper.accessor("payment_method_types", {
      id: "payment_method_types",
      header: "Payment Method(s)",
      cell: (info) => <span>{info.getValue().join(", ")}</span>,
      enableSorting: false,
    }),
    columnHelper.accessor("latest_charge", {
      id: "latest_charge",
      header: "Latest Charge ID",
      cell: (info) => <span>{info.getValue() || "-"}</span>,
      enableSorting: false,
    }),
  ];
};
