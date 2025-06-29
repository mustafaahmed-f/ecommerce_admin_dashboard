"use client";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  { day: "Sat", Deposit: 500, Withdraw: 150 },
  { day: "Sun", Deposit: 300, Withdraw: 200 },
  { day: "Mon", Deposit: 400, Withdraw: 250 },
  { day: "Tue", Deposit: 520, Withdraw: 320 },
  { day: "Wed", Deposit: 180, Withdraw: 80 },
  { day: "Thu", Deposit: 450, Withdraw: 250 },
  { day: "Fri", Deposit: 420, Withdraw: 300 },
];

export default function WeeklyActivityChart({ className = "" }) {
  return (
    <div className={`rounded-xl bg-white p-4 shadow ${className}`}>
      <h3 className="mb-4 text-lg font-bold">Weekly Activity</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="day" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="Deposit" fill="#00E0FF" />
          <Bar dataKey="Withdraw" fill="#FF69B4" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
