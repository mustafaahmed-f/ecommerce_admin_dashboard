import BalanceHistoryChart from "./_components/DashBoard/BalanceHistoryChart";
import ExpenseStatisticsChart from "./_components/DashBoard/ExpenseStatisticsChart";
import MyCardsSection from "./_components/DashBoard/MyCardsSection";
import QuickTransferSection from "./_components/DashBoard/QuickTransferSection";
import RecentTransactionsSection from "./_components/DashBoard/RecentTransactionsSection";
import WeeklyActivityChart from "./_components/DashBoard/WeeklyActivityChart";

export default function Home() {
  return (
    <main className="w-full space-y-8 p-4 md:p-6 lg:p-8">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">My Cards</h2>
        <button className="text-sm text-blue-600">See All</button>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="md:col-span-2">
          <MyCardsSection />
        </div>
        <div className="md:col-span-1">
          <RecentTransactionsSection />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        <WeeklyActivityChart className="md:col-span-2 lg:col-span-2" />
        <ExpenseStatisticsChart className="lg:col-span-1" />
        <QuickTransferSection className="lg:col-span-1" />
        <BalanceHistoryChart className="md:col-span-2" />
      </div>
    </main>
  );
}
