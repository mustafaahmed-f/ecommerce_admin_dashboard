import { createColumnHelper } from "@tanstack/react-table";
import { couponType } from "../types/couponsType";
import ActionsSection from "@/app/_components/table/_subComponents/ActionsSection";
import Link from "next/link";

const columnHelper = createColumnHelper<couponType>();

export const generalColumns = (hasDetails?: boolean, module?: string) => [
  columnHelper.accessor("code", {
    header: "Code",
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
  }),
  columnHelper.accessor("discount", {
    header: "Discount",
    cell: (info) => (
      <span>
        {info.getValue()}{" "}
        {info.row.original.discountType === "percentage" ? "%" : "$"}
      </span>
    ),
  }),
  columnHelper.accessor("expirationDate", {
    header: "Expiration Date",
    cell: (info) => (
      <span>{new Date(info.getValue()).toLocaleDateString()}</span>
    ),
  }),
  columnHelper.accessor("usageLimit", {
    header: "Usage Limit",
    cell: (info) => <span>{info.getValue()}</span>,
  }),
  columnHelper.accessor("usageCount", {
    header: "Used",
    cell: (info) => <span>{info.getValue()}</span>,
  }),
  columnHelper.accessor("isActive", {
    header: "Active",
    cell: (info) => (
      <span className={info.getValue() ? "text-green-600" : "text-red-600"}>
        {info.getValue() ? "Yes" : "No"}
      </span>
    ),
    enableSorting: false,
  }),
  columnHelper.accessor("createdAt", {
    header: "Created At",
    cell: (info) => <span>{new Date(info.getValue()).toDateString()}</span>,
  }),
  columnHelper.display({
    id: "actions",
    header: "Actions",
    cell: ({ row }) => <ActionsSection recordId={row.original._id} />,
  }),
];
