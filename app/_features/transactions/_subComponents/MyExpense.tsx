import {
  Bar,
  BarChart,
  DefaultLegendContent,
  ResponsiveContainer,
  Tooltip,
  XAxis,
} from "recharts";

interface MyExpenseProps {}

const data = [
  { month: "Jan", expense: 500 },
  { month: "Feb", expense: 300 },
  { month: "Mar", expense: 400 },
  { month: "Apr", expense: 520 },
  { month: "May", expense: 180 },
];

function MyExpense({}: MyExpenseProps) {
  return (
    <div className="flex flex-col gap-2">
      <h3 className="text-xl font-bold">My Expense</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          {/* <CartesianGrid strokeDasharray="3 3" /> */}
          <XAxis dataKey="month" />
          {/* <YAxis /> */}
          <Tooltip />
          <DefaultLegendContent />
          <Bar dataKey="expense" fill="#16DBCC" />
          {/* <Bar dataKey="Withdraw" fill="#FF69B4" /> */}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default MyExpense;
