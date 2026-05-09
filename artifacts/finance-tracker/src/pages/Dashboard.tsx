import DashboardLayout from "@/layouts/DashboardLayout";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend
} from "recharts";
import { TrendingUp, TrendingDown, Wallet, PiggyBank, ArrowUpRight, ArrowDownRight } from "lucide-react";

const monthlyData = [
  { month: "Jan", income: 65000, expenses: 42000 },
  { month: "Feb", income: 70000, expenses: 38000 },
  { month: "Mar", income: 68000, expenses: 45000 },
  { month: "Apr", income: 72000, expenses: 40000 },
  { month: "May", income: 75000, expenses: 43000 },
  { month: "Jun", income: 80000, expenses: 47000 },
];

const expenseBreakdown = [
  { name: "Housing", value: 18000, color: "#3b82f6" },
  { name: "Food", value: 8000, color: "#10b981" },
  { name: "Transport", value: 5000, color: "#f59e0b" },
  { name: "Healthcare", value: 3000, color: "#ef4444" },
  { name: "Others", value: 7000, color: "#8b5cf6" },
];

const recentTransactions = [
  { name: "Salary Credit", category: "Income", date: "May 1", amount: 75000, type: "credit" },
  { name: "Rent Payment", category: "Housing", date: "May 2", amount: 18000, type: "debit" },
  { name: "Grocery Store", category: "Food", date: "May 4", amount: 2400, type: "debit" },
  { name: "Freelance Payment", category: "Income", date: "May 6", amount: 12000, type: "credit" },
  { name: "Electricity Bill", category: "Utilities", date: "May 8", amount: 1800, type: "debit" },
];

const stats = [
  { label: "Total Balance", value: "₹3,42,500", icon: Wallet, change: "+12.5%", up: true, color: "text-primary" },
  { label: "Monthly Income", value: "₹87,000", icon: TrendingUp, change: "+8.2%", up: true, color: "text-emerald-600" },
  { label: "Monthly Expenses", value: "₹47,000", icon: TrendingDown, change: "+4.1%", up: false, color: "text-rose-500" },
  { label: "Total Savings", value: "₹1,20,000", icon: PiggyBank, change: "+18.3%", up: true, color: "text-violet-600" },
];

export default function Dashboard() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground text-sm mt-1">Welcome back, John! Here's your financial summary.</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.label} className="bg-card rounded-xl border p-5 shadow-sm">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm text-muted-foreground">{stat.label}</span>
                  <div className={`p-2 rounded-lg bg-primary/10`}>
                    <Icon className={`h-4 w-4 ${stat.color}`} />
                  </div>
                </div>
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className={`flex items-center gap-1 mt-1 text-xs font-medium ${stat.up ? "text-emerald-600" : "text-rose-500"}`}>
                  {stat.up ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                  {stat.change} from last month
                </div>
              </div>
            );
          })}
        </div>

        {/* Charts row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Area chart */}
          <div className="lg:col-span-2 bg-card rounded-xl border p-5 shadow-sm">
            <h2 className="font-semibold mb-4">Income vs Expenses</h2>
            <ResponsiveContainer width="100%" height={220}>
              <AreaChart data={monthlyData}>
                <defs>
                  <linearGradient id="income" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.15} />
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="expenses" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ef4444" stopOpacity={0.15} />
                    <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 12 }} axisLine={false} tickLine={false} tickFormatter={(v) => `₹${v / 1000}k`} />
                <Tooltip formatter={(v: number) => `₹${v.toLocaleString()}`} />
                <Area type="monotone" dataKey="income" stroke="#3b82f6" strokeWidth={2} fill="url(#income)" name="Income" />
                <Area type="monotone" dataKey="expenses" stroke="#ef4444" strokeWidth={2} fill="url(#expenses)" name="Expenses" />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Pie chart */}
          <div className="bg-card rounded-xl border p-5 shadow-sm">
            <h2 className="font-semibold mb-4">Expense Breakdown</h2>
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie data={expenseBreakdown} cx="50%" cy="45%" innerRadius={55} outerRadius={80} dataKey="value" paddingAngle={3}>
                  {expenseBreakdown.map((entry, i) => (
                    <Cell key={i} fill={entry.color} />
                  ))}
                </Pie>
                <Legend iconType="circle" iconSize={8} formatter={(v) => <span className="text-xs text-muted-foreground">{v}</span>} />
                <Tooltip formatter={(v: number) => `₹${v.toLocaleString()}`} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Transactions */}
        <div className="bg-card rounded-xl border shadow-sm">
          <div className="flex items-center justify-between px-5 py-4 border-b">
            <h2 className="font-semibold">Recent Transactions</h2>
            <a href="#" className="text-sm text-primary font-medium hover:underline">View all</a>
          </div>
          <div className="divide-y">
            {recentTransactions.map((tx, i) => (
              <div key={i} className="flex items-center gap-4 px-5 py-3.5">
                <div className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 ${tx.type === "credit" ? "bg-emerald-100 text-emerald-600" : "bg-rose-100 text-rose-500"}`}>
                  {tx.type === "credit" ? <ArrowUpRight className="h-4 w-4" /> : <ArrowDownRight className="h-4 w-4" />}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium truncate">{tx.name}</div>
                  <div className="text-xs text-muted-foreground">{tx.category} · {tx.date}</div>
                </div>
                <div className={`text-sm font-semibold ${tx.type === "credit" ? "text-emerald-600" : "text-rose-500"}`}>
                  {tx.type === "credit" ? "+" : "-"}₹{tx.amount.toLocaleString()}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
