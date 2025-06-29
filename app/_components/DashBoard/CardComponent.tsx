"use client";

export default function CardComponent({
  balance,
  cardHolder,
  validThru,
  number,
  variant = "blue",
}: {
  balance: number;
  cardHolder: string;
  validThru: string;
  number: string;
  variant?: "blue" | "white";
}) {
  const bg =
    variant === "blue"
      ? "bg-gradient-to-r from-[#4A3AFF] to-[#4A68FF]"
      : "bg-white border border-gray-200";

  const textColor = variant === "blue" ? "text-white" : "text-gray-800";

  return (
    <div
      className={`rounded-xl p-5 shadow ${bg} flex h-48 w-full flex-col justify-between`}
    >
      <div className={`text-sm font-light ${textColor}`}>Balance</div>
      <div className={`text-2xl font-bold ${textColor}`}>
        ${balance.toLocaleString()}
      </div>
      <div className="mt-4 flex items-center justify-between">
        <div className={`text-xs ${textColor}`}>
          <div className="tracking-widest uppercase">{cardHolder}</div>
          <div className="mt-1">VALID THRU {validThru}</div>
        </div>
        <div className={`font-mono text-xs ${textColor}`}>
          {number.replace(/\d{4}(?= \d{4})/g, "****")}
        </div>
      </div>
    </div>
  );
}
