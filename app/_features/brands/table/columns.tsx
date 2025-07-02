import { createColumnHelper } from "@tanstack/react-table";
import Link from "next/link";

import ActionsSection from "@/app/_components/table/_subComponents/ActionsSection";
import { brandsType } from "../types/brandsType";

const columnHelper = createColumnHelper<brandsType>();

export const generalColumns = (hasDetails?: boolean, module?: string) => {
  return [
    columnHelper.accessor((_row, i) => i + 1, {
      id: "no",
      header: "No.",
      cell: (info) => <span className="w-fit">{info.getValue()}</span>,
      meta: { className: "max-w-[80px] text-center" },
      enableColumnFilter: false,
      enableSorting: true,
      sortingFn: "alphanumeric",
      sortDescFirst: false,
    }),
    columnHelper.accessor((row) => row._id, {
      id: "_id",
      header: "ID",
      cell: (info) => <span className="w-fit">{info.getValue()}</span>,
      meta: { className: " text-center" },
      enableColumnFilter: false,
    }),
    columnHelper.accessor("title", {
      header: "Title",
      cell: (info) =>
        hasDetails ? (
          <Link
            href={`/view/${module}/details/${info.row.original._id}`}
            className="hover:underline"
          >
            {info.getValue()}
          </Link>
        ) : (
          <span>{info.getValue()}</span>
        ),
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
