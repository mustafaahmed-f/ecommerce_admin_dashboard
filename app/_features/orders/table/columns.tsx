import { createColumnHelper } from "@tanstack/react-table";
import { ordersType } from "../types/ordersType";
import ActionsSection from "@/app/_components/table/_subComponents/ActionsSection";

const columnHelper = createColumnHelper<ordersType>();

export const generalColumns = (hasDetails?: boolean, module?: string) => {
  return [
    columnHelper.accessor((row) => row._id, {
      id: "_id",
      header: "ID",
      cell: (info) => <span className="w-fit">{info.getValue()}</span>,
      meta: { className: " text-center" },
      enableColumnFilter: false,
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
