"use client";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { month: "Jul", value: 200 },
  { month: "Aug", value: 400 },
  { month: "Sep", value: 800 },
  { month: "Oct", value: 600 },
  { month: "Nov", value: 300 },
  { month: "Dec", value: 500 },
  { month: "Jan", value: 700 },
];

export default function BalanceHistoryChart({ className = "" }) {
  return (
    <div className={`rounded-xl bg-white p-4 shadow ${className}`}>
      <h3 className="mb-4 text-lg font-bold">Balance History</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart height={300} data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="value"
            stroke="#4A3AFF"
            strokeWidth={3}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
