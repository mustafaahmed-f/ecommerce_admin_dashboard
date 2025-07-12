import { createColumnHelper } from "@tanstack/react-table";
import Image from "next/image";
import Link from "next/link";
import ActionsSection from "@/app/_components/table/_subComponents/ActionsSection";
import { productsType } from "../types/productsType";

const columnHelper = createColumnHelper<productsType>();

export const generalColumns = (hasDetails?: boolean, module?: string) => {
  return [
    columnHelper.accessor((row) => row.productId, {
      id: "productId",
      header: "Product ID",
      cell: (info) => <span>{info.getValue()}</span>,
      enableColumnFilter: false,
      enableSorting: true,
      enablePinning: false,
    }),
    columnHelper.accessor((row) => row._id, {
      id: "_id",
      header: "Database ID",
      cell: (info) => <span>{info.getValue()}</span>,
      meta: { className: " text-center" },
      enableColumnFilter: false,
      enableSorting: false,
      enablePinning: false,
    }),
    columnHelper.accessor("title", {
      id: "title",
      header: "Title",
      cell: (info) =>
        hasDetails ? (
          <Link
            href={`/view/${module}/details/${info.row.original.productId}`}
            className="text-primary hover:underline"
          >
            {info.getValue()}
          </Link>
        ) : (
          <span>{info.getValue()}</span>
        ),
      meta: { className: " text-center min-w-[200px]" },
      enableSorting: true,
      enablePinning: false,
    }),
    columnHelper.accessor("image", {
      id: "image",
      header: "Image",
      cell: (info) => (
        <Image
          width={50}
          height={50}
          src={info.getValue()}
          alt="Product"
          className="mx-auto rounded object-cover"
        />
      ),
      enableColumnFilter: false,
      enableSorting: false,
      enablePinning: false,
    }),
    columnHelper.accessor("category", {
      id: "category",
      header: "Category",
      cell: (info) => <span>{info.getValue()}</span>,
      enableSorting: true,
      enablePinning: false,
    }),
    columnHelper.accessor("brand", {
      id: "brand",
      header: "Brand",
      cell: (info) => <span>{info.getValue()}</span>,
      enableSorting: true,
      enablePinning: false,
    }),

    columnHelper.accessor("model", {
      id: "model",
      header: "Model",
      cell: (info) => <span>{info.getValue()}</span>,
      enableSorting: true,
      enablePinning: false,
    }),
    columnHelper.accessor("stock", {
      id: "stock",
      header: "Stock",
      cell: (info) => <span>{info.getValue()}</span>,
      enableSorting: true,
      enablePinning: false,
    }),
    columnHelper.accessor("sold", {
      id: "sold",
      header: "Sold",
      cell: (info) => <span>{info.getValue()}</span>,
      enableSorting: true,
      enablePinning: false,
    }),
    columnHelper.accessor("discount", {
      id: "discount",
      header: "Discount (%)",
      cell: (info) => <span>{info.getValue() ?? 0}%</span>,
      enableSorting: true,
      enablePinning: false,
    }),
    columnHelper.accessor("price", {
      id: "price",
      header: "Price",
      cell: (info) => (
        <div className="flex w-full flex-col items-center justify-start gap-[2px] sm:gap-3">
          <p
            className={`text-textGrey text-sm ${
              info.row.original.discount !== 0 && "line-through"
            } sm:text-base`}
          >
            $ {info.getValue()}
          </p>

          {info.row.original.discount !== 0 && (
            <p className="text-base text-red-600 sm:text-lg">
              ${" "}
              {info.getValue() -
                info.getValue() * ((info.row.original.discount ?? 0) / 100)}
            </p>
          )}
        </div>
      ),
      enableSorting: true,
      enablePinning: false,
    }),
    columnHelper.accessor("createdAt", {
      id: "createdAt",
      header: "Created At",
      cell: (info) => <span>{new Date(info.getValue()).toDateString()}</span>,
      enableSorting: true,
      enablePinning: false,
    }),

    columnHelper.display({
      id: "actions",
      header: "Actions",
      cell: ({ row }) => (
        <ActionsSection recordId={String(row.original.productId)} />
      ),
      enableSorting: false,
      enablePinning: true,
    }),
  ];
};
