import ActionsSection from "@/app/_components/general/ActionsSection";
import { createColumnHelper } from "@tanstack/react-table";
import { Product } from "../types/productType";
import Image from "next/image";
import Link from "next/link";

const columnHelper = createColumnHelper<Product>();

export const generalColumns = (hasDetails?: boolean, module?: string) => {
  return [
    columnHelper.accessor((row) => row._id, {
      id: "id",
      header: "ID",
      cell: (info) => <span className="w-fit">{info.getValue()}</span>,
      meta: { className: " text-center" },
      enableColumnFilter: false,
    }),
    columnHelper.accessor((row) => row.productId, {
      id: "productId",
      header: "Product ID",
      cell: (info) => <span>{info.getValue()}</span>,
      enableColumnFilter: false,
    }),
    columnHelper.accessor("title", {
      header: "Title",
      cell: (info) =>
        hasDetails ? (
          <Link
            href={`/view/${module}/details/${info.row.original.productId}`}
            className="hover:underline"
          >
            {info.getValue()}
          </Link>
        ) : (
          <span>{info.getValue()}</span>
        ),
    }),
    columnHelper.accessor("image", {
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
    }),
    columnHelper.accessor("category", {
      header: "Category",
      cell: (info) => <span>{info.getValue()}</span>,
    }),
    columnHelper.accessor("brand", {
      header: "Brand",
      cell: (info) => <span>{info.getValue()}</span>,
    }),

    columnHelper.accessor("model", {
      header: "Model",
      cell: (info) => <span>{info.getValue()}</span>,
    }),
    columnHelper.accessor("stock", {
      header: "Stock",
      cell: (info) => <span>{info.getValue()}</span>,
    }),
    columnHelper.accessor("discount", {
      header: "Discount (%)",
      cell: (info) => <span>{info.getValue() ?? 0}%</span>,
    }),
    columnHelper.accessor("price", {
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
    }),

    columnHelper.display({
      id: "actions",
      header: "Actions",
      cell: ({ row }) => (
        <ActionsSection recordId={String(row.original.productId)} />
      ),
    }),
  ];
};
