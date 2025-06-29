"use client";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "Entertainment", value: 30, color: "#2F49D1" },
  { name: "Bill Expense", value: 15, color: "#FF8C00" },
  { name: "Investment", value: 20, color: "#FF00FF" },
  { name: "Others", value: 35, color: "#0000FF" },
];

export default function ExpenseStatisticsChart({ className = "" }) {
  return (
    <div className={`rounded-xl bg-white p-4 shadow ${className}`}>
      <h3 className="mb-4 text-lg font-bold">Expense Statistics</h3>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart width={300} height={300}>
          <Pie data={data} dataKey="value" nameKey="name" outerRadius={100}>
            {data.map((entry, i) => (
              <Cell key={`cell-${i}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
