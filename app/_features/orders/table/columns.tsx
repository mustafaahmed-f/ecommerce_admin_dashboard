import { createColumnHelper } from "@tanstack/react-table";
import { ordersType } from "../types/ordersType";
import ActionsSection from "@/app/_components/table/_subComponents/ActionsSection";
import Link from "next/link";

const columnHelper = createColumnHelper<ordersType>();

export const generalColumns = (hasDetails?: boolean, module?: string) => {
  return [
    columnHelper.accessor("orderNumber", {
      id: "orderNumber",
      header: "Order #",
      cell: (info) =>
        hasDetails ? (
          <Link
            href={`/view/${module}/details/${info.row.original._id}`}
            className="text-primary hover:underline"
          >
            {info.getValue()}
          </Link>
        ) : (
          <span>{info.getValue()}</span>
        ),
      enableSorting: true,
      enablePinning: false,
    }),
    columnHelper.accessor((row) => row._id, {
      id: "_id",
      header: "ID",
      cell: (info) => <span className="w-fit">{info.getValue()}</span>,
      meta: { className: " text-center" },
      enableColumnFilter: false,
      enablePinning: false,
    }),

    columnHelper.accessor(
      (row) => `${row.userInfo.firstName} ${row.userInfo.lastName}`,
      {
        id: "fullName",
        header: "Customer",
        cell: (info) => <span>{info.getValue()}</span>,
        enableSorting: true,
        enablePinning: false,
      },
    ),
    columnHelper.accessor((row) => row.userInfo.email, {
      id: "email",
      header: "Email",
      cell: (info) => <span>{info.getValue()}</span>,
      enableSorting: true,
      enablePinning: false,
    }),
    columnHelper.accessor("paymentMethod", {
      id: "paymentMethod",
      header: "Payment",
      cell: (info) => <span className="capitalize">{info.getValue()}</span>,
      enableSorting: true,
      enablePinning: false,
    }),
    columnHelper.accessor((row) => row.orderStatus.status, {
      id: "orderStatus",
      header: "Status",
      cell: (info) => <span className="capitalize">{info.getValue()}</span>,
      enableSorting: true,
      enablePinning: false,
    }),
    columnHelper.accessor("subTotal", {
      id: "subTotal",
      header: "Subtotal",
      cell: (info) => <span>$ {info.getValue().toFixed(2)}</span>,
      enableSorting: true,
      enablePinning: false,
    }),
    columnHelper.accessor("finalPaidAmount", {
      id: "finalPaidAmount",
      header: "Final Paid",
      cell: (info) => <span>$ {info.getValue().toFixed(2)}</span>,
      enableSorting: true,
      enablePinning: false,
    }),
    columnHelper.accessor("createdAt", {
      id: "createdAt",
      header: "Created At",
      cell: (info) => (
        <span>{new Date(info.getValue()).toLocaleDateString()}</span>
      ),
      enableSorting: true,
      enablePinning: false,
    }),
    columnHelper.display({
      id: "actions",
      header: "Actions",
      cell: ({ row }) => <ActionsSection recordId={String(row.original._id)} />,
      meta: { className: "max-w-[80px] text-center" },
      enablePinning: true,
    }),
  ];
};
