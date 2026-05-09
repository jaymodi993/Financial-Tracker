import DashboardLayout from "@/layouts/DashboardLayout";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line, PieChart, Pie, Cell, Legend
} from "recharts";

const monthlyComparison = [
  { month: "Jan", income: 65000, expenses: 42000, savings: 23000 },
  { month: "Feb", income: 70000, expenses: 38000, savings: 32000 },
  { month: "Mar", income: 68000, expenses: 45000, savings: 23000 },
  { month: "Apr", income: 72000, expenses: 40000, savings: 32000 },
  { month: "May", income: 87000, expenses: 47000, savings: 40000 },
];

const categorySpending = [
  { category: "Housing", amount: 18000 },
  { category: "Food", amount: 8000 },
  { category: "Transport", amount: 5000 },
  { category: "Healthcare", amount: 3000 },
  { category: "Entertainment", amount: 2500 },
  { category: "Shopping", amount: 4500 },
  { category: "Utilities", amount: 3500 },
  { category: "Others", amount: 2000 },
];

const savingsRate = [
  { month: "Jan", rate: 35 },
  { month: "Feb", rate: 46 },
  { month: "Mar", rate: 34 },
  { month: "Apr", rate: 44 },
  { month: "May", rate: 46 },
];

const incomeBreakdown = [
  { name: "Salary", value: 75000, color: "#3b82f6" },
  { name: "Freelance", value: 12000, color: "#10b981" },
  { name: "Dividends", value: 3500, color: "#f59e0b" },
  { name: "Interest", value: 850, color: "#8b5cf6" },
];

export default function Analytics() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Analytics</h1>
          <p className="text-muted-foreground text-sm mt-1">Detailed insights into your financial health</p>
        </div>

        {/* Monthly comparison */}
        <div className="bg-card rounded-xl border p-5 shadow-sm">
          <h2 className="font-semibold mb-4">Monthly Income, Expenses & Savings</h2>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={monthlyComparison} barGap={4}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12 }} axisLine={false} tickLine={false} tickFormatter={(v) => `₹${v / 1000}k`} />
              <Tooltip formatter={(v: number) => `₹${v.toLocaleString()}`} />
              <Bar dataKey="income" fill="#3b82f6" name="Income" radius={[4, 4, 0, 0]} />
              <Bar dataKey="expenses" fill="#ef4444" name="Expenses" radius={[4, 4, 0, 0]} />
              <Bar dataKey="savings" fill="#10b981" name="Savings" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Category spending */}
          <div className="bg-card rounded-xl border p-5 shadow-sm">
            <h2 className="font-semibold mb-4">Spending by Category</h2>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={categorySpending} layout="vertical" barSize={12}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" horizontal={false} />
                <XAxis type="number" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={(v) => `₹${v / 1000}k`} />
                <YAxis type="category" dataKey="category" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} width={80} />
                <Tooltip formatter={(v: number) => `₹${v.toLocaleString()}`} />
                <Bar dataKey="amount" fill="#3b82f6" name="Spent" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Savings rate */}
          <div className="bg-card rounded-xl border p-5 shadow-sm">
            <h2 className="font-semibold mb-4">Savings Rate (%)</h2>
            <ResponsiveContainer width="100%" height={220}>
              <LineChart data={savingsRate}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 12 }} axisLine={false} tickLine={false} tickFormatter={(v) => `${v}%`} domain={[0, 60]} />
                <Tooltip formatter={(v: number) => `${v}%`} />
                <Line type="monotone" dataKey="rate" stroke="#10b981" strokeWidth={2.5} dot={{ fill: "#10b981", r: 4 }} name="Savings Rate" />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Income breakdown */}
          <div className="bg-card rounded-xl border p-5 shadow-sm lg:col-span-2">
            <h2 className="font-semibold mb-4">Income Sources</h2>
            <div className="flex flex-col sm:flex-row items-center gap-6">
              <div className="w-full sm:w-64 h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={incomeBreakdown} cx="50%" cy="50%" outerRadius={80} dataKey="value" paddingAngle={3}>
                      {incomeBreakdown.map((entry, i) => (
                        <Cell key={i} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(v: number) => `₹${v.toLocaleString()}`} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="flex-1 grid grid-cols-2 gap-4">
                {incomeBreakdown.map((item) => (
                  <div key={item.name} className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
                    <div>
                      <div className="text-sm font-medium">{item.name}</div>
                      <div className="text-xs text-muted-foreground">₹{item.value.toLocaleString()}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
