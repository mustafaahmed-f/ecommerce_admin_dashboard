import { createColumnHelper } from "@tanstack/react-table";
import Link from "next/link";
import Image from "next/image";
import { usersType } from "../types/usersType";
import ActionsSection from "@/app/_components/table/_subComponents/ActionsSection";

const columnHelper = createColumnHelper<usersType>();

export const generalColumns = (
  hasDetails?: boolean,
  module: string = "users",
) => [
  columnHelper.accessor((_row, index) => index + 1, {
    id: "no",
    header: "No.",
    cell: (info) => <span>{info.row.index + 1}</span>,
    enableColumnFilter: false,
    enableSorting: false,
  }),
  columnHelper.accessor("_id", {
    id: "_id",
    header: "User ID",
    cell: (info) => <span>{info.getValue()}</span>,
    enableColumnFilter: false,
  }),
  columnHelper.accessor("userName", {
    id: "userName",
    header: "Username",
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
  columnHelper.accessor("firstName", {
    id: "firstName",
    header: "Full Name",
    cell: (info) => (
      <span>{info.getValue() + " " + info.row.original.lastName}</span>
    ),
  }),
  columnHelper.accessor("email", {
    id: "email",
    header: "Email",
    cell: (info) => <span>{info.getValue()}</span>,
  }),
  columnHelper.accessor("role", {
    id: "role",
    header: "Role",
    cell: (info) => <span>{info.getValue()}</span>,
  }),
  columnHelper.accessor("provider", {
    id: "provider",
    header: "Provider",
    cell: (info) => <span>{info.getValue()}</span>,
  }),
  columnHelper.accessor("profileImage", {
    id: "profileImage",
    header: "Image",
    cell: (info) =>
      info.getValue() ? (
        <Image
          src={info.getValue() || ""}
          alt="Profile"
          width={40}
          height={40}
          className="mx-auto rounded-full object-cover"
        />
      ) : (
        <span>N/A</span>
      ),
  }),
  columnHelper.display({
    id: "actions",
    header: "Actions",
    cell: ({ row }) => (
      <ActionsSection canEdit={false} recordId={String(row.original._id)} />
    ),
  }),
];
