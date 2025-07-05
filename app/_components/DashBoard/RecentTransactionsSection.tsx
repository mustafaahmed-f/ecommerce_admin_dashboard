"use client";

import { StripeTransaction } from "@/app/_features/transactions/types/TransactionType";
import { format } from "date-fns";

export default function RecentTransactionsSection({
  className = "",
  transactions: fetchedTransactions,
}: {
  transactions: StripeTransaction[];
  className?: string;
}) {
  const transactions = fetchedTransactions.slice(0, 10);

  return (
    <div
      className={`col-span-1 h-full max-h-[280px] overflow-y-auto rounded-xl bg-white p-4 shadow ${className}`}
    >
      <h3 className="mb-4 text-lg font-bold">Recent Transaction</h3>
      <ul className="space-y-4">
        {transactions.map((tx, i) => (
          <li key={i} className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-4">
              <span className="text-xl">💳</span>
              <div>
                <div className="text-sm font-semibold">{tx.id}</div>
                <div className="text-xs text-gray-400">
                  {format(new Date(tx.created * 1000), "MM/dd/yyyy")}
                </div>
              </div>
            </div>
            <div
              className={`text-sm font-bold text-nowrap ${tx.status === "succeeded" ? "text-green-500" : "text-red-500"}`}
            >
              $ {Math.abs(tx.amount / 100).toFixed(2)}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
