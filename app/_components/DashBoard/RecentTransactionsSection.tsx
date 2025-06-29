export default function RecentTransactionsSection({ className = "" }) {
  const transactions = [
    {
      icon: "🪙",
      title: "Deposit from my Card",
      date: "28 January 2021",
      amount: "-$850",
      color: "text-red-500",
    },
    {
      icon: "💳",
      title: "Deposit Paypal",
      date: "25 January 2021",
      amount: "+$2,500",
      color: "text-green-500",
    },
    {
      icon: "👤",
      title: "Jemi Wilson",
      date: "21 January 2021",
      amount: "+$5,400",
      color: "text-green-500",
    },
  ];

  return (
    <div
      className={`col-span-1 h-full rounded-xl bg-white p-4 shadow ${className}`}
    >
      <h3 className="mb-4 text-lg font-bold">Recent Transaction</h3>
      <ul className="space-y-3">
        {transactions.map((tx, i) => (
          <li key={i} className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-xl">{tx.icon}</span>
              <div>
                <div className="text-sm font-semibold">{tx.title}</div>
                <div className="text-xs text-gray-400">{tx.date}</div>
              </div>
            </div>
            <div className={`text-sm font-bold ${tx.color}`}>{tx.amount}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}
