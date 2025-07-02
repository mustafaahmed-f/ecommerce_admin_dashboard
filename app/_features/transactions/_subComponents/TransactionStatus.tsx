import React from "react";
import clsx from "clsx";

export interface TransactionStatusProps {
  status: string;
}

function TransactionStatus({ status }: TransactionStatusProps) {
  const statusColors: Record<string, { bg: string; text: string }> = {
    succeeded: { bg: "bg-green-100", text: "text-green-800" },
    processing: { bg: "bg-blue-100", text: "text-blue-800" },
    requires_payment_method: {
      bg: "bg-yellow-100",
      text: "text-yellow-800",
    },
    requires_confirmation: {
      bg: "bg-yellow-100",
      text: "text-yellow-800",
    },
    requires_action: {
      bg: "bg-orange-100",
      text: "text-orange-800",
    },
    canceled: { bg: "bg-red-100", text: "text-red-800" },
  };

  const defaultColor = { bg: "bg-gray-100", text: "text-gray-800" };

  const color = statusColors[status] || defaultColor;

  return (
    <span
      className={clsx(
        "inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium",
        color.bg,
        color.text,
      )}
    >
      {status}
    </span>
  );
}

export default TransactionStatus;
