"use client";
import Spinner from "@/app/_components/general/Spinner";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { useEffect, useState } from "react";
import { getAllRecords } from "../services/transactionsAPIs";
import { generalColumns } from "../table/columns";
import { StripeTransaction } from "../types/TransactionType";
import TransactionsUI from "./TransactionsUI";

interface TransactionsWrapperProps {}

function TransactionsWrapper({}: TransactionsWrapperProps) {
  const { 0: page, 1: setPage } = useState<number>(1);
  const { 0: transactions, 1: setTransactions } = useState<StripeTransaction[]>(
    [],
  );
  const { 0: startingAfter, 1: setStartingAfter } = useState<string>("");
  const { 0: endingBefore, 1: setEndingBefore } = useState<string>("");

  const queryKey = ["transactions", page];
  const { data, isPending, isError, error, isPlaceholderData, isFetching } =
    useQuery({
      queryKey,
      queryFn: () => {
        return getAllRecords({
          starting_after: startingAfter,
          ending_before: endingBefore,
        });
      },
      placeholderData: keepPreviousData,
    });

  useEffect(() => {
    if (data && data.success) setTransactions(data.result);
  }, [data, setTransactions]);

  function handleNext() {
    if (isError || !data || !data.success) return;
    if (!data.additionalInfo.hasMore) return;

    setStartingAfter(data.additionalInfo.lastId);
    setPage((prevPage) => prevPage + 1);
  }

  function handlePrev() {
    if (isError || !data || !data.success) return;
    if (!data.additionalInfo.hasPrevious) return;

    setEndingBefore(data.additionalInfo.firstId);
    setPage((prevPage) => prevPage - 1);
  }

  //// tableInstance
  const table = useReactTable<StripeTransaction>({
    data: transactions,
    columns: generalColumns(),
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
  });

  if (!data && isPending && !isPlaceholderData) return <Spinner />;

  if (isError || !data || !(data as any).success)
    throw new Error(
      (error as any)?.message ||
        (data as any)?.error ||
        "Unknown error from API",
    );

  return (
    <TransactionsUI
      table={table}
      handleNext={handleNext}
      handlePrev={handlePrev}
      additionalInfo={(data as any)?.additionalInfo}
      isPending={isFetching}
    />
  );
}

export default TransactionsWrapper;
