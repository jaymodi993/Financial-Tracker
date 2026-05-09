import { useState } from "react";
import DashboardLayout from "@/layouts/DashboardLayout";
import { ArrowUpRight, ArrowDownRight, Search, Filter, Plus } from "lucide-react";

const allTransactions = [
  { id: 1, name: "Salary Credit", category: "Income", account: "SBI Salary", date: "May 1, 2026", amount: 75000, type: "credit" },
  { id: 2, name: "Rent Payment", category: "Housing", account: "HDFC Savings", date: "May 2, 2026", amount: 18000, type: "debit" },
  { id: 3, name: "Grocery Store", category: "Food", account: "ICICI Current", date: "May 4, 2026", amount: 2400, type: "debit" },
  { id: 4, name: "Freelance Payment", category: "Income", account: "HDFC Savings", date: "May 6, 2026", amount: 12000, type: "credit" },
  { id: 5, name: "Electricity Bill", category: "Utilities", account: "HDFC Savings", date: "May 8, 2026", amount: 1800, type: "debit" },
  { id: 6, name: "Netflix Subscription", category: "Entertainment", account: "ICICI Current", date: "May 10, 2026", amount: 649, type: "debit" },
  { id: 7, name: "Online Transfer", category: "Transfer", account: "SBI Salary", date: "May 11, 2026", amount: 20000, type: "debit" },
  { id: 8, name: "Dividend Income", category: "Income", account: "Zerodha Demat", date: "May 12, 2026", amount: 3500, type: "credit" },
  { id: 9, name: "Petrol", category: "Transport", account: "ICICI Current", date: "May 13, 2026", amount: 2200, type: "debit" },
  { id: 10, name: "Medical Checkup", category: "Healthcare", account: "HDFC Savings", date: "May 14, 2026", amount: 1500, type: "debit" },
  { id: 11, name: "Online Shopping", category: "Shopping", account: "ICICI Current", date: "May 15, 2026", amount: 4500, type: "debit" },
  { id: 12, name: "Interest Income", category: "Income", account: "HDFC Savings", date: "May 16, 2026", amount: 850, type: "credit" },
];

const categoryColors: Record<string, string> = {
  Income: "bg-emerald-100 text-emerald-700",
  Housing: "bg-blue-100 text-blue-700",
  Food: "bg-orange-100 text-orange-700",
  Utilities: "bg-yellow-100 text-yellow-700",
  Entertainment: "bg-purple-100 text-purple-700",
  Transfer: "bg-slate-100 text-slate-700",
  Transport: "bg-cyan-100 text-cyan-700",
  Healthcare: "bg-red-100 text-red-700",
  Shopping: "bg-pink-100 text-pink-700",
};

export default function Transactions() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"all" | "credit" | "debit">("all");

  const filtered = allTransactions.filter((tx) => {
    const matchSearch = tx.name.toLowerCase().includes(search.toLowerCase()) || tx.category.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === "all" || tx.type === filter;
    return matchSearch && matchFilter;
  });

  const totalIncome = allTransactions.filter((t) => t.type === "credit").reduce((s, t) => s + t.amount, 0);
  const totalExpense = allTransactions.filter((t) => t.type === "debit").reduce((s, t) => s + t.amount, 0);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Transactions</h1>
            <p className="text-muted-foreground text-sm mt-1">Track all your income and expenses</p>
          </div>
          <button className="inline-flex items-center gap-2 bg-primary text-primary-foreground text-sm font-medium px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors">
            <Plus className="h-4 w-4" /> Add Transaction
          </button>
        </div>

        {/* Summary cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-card rounded-xl border p-5 shadow-sm">
            <div className="text-sm text-muted-foreground">Total Income</div>
            <div className="text-2xl font-bold text-emerald-600 mt-1">+₹{totalIncome.toLocaleString()}</div>
          </div>
          <div className="bg-card rounded-xl border p-5 shadow-sm">
            <div className="text-sm text-muted-foreground">Total Expenses</div>
            <div className="text-2xl font-bold text-rose-500 mt-1">-₹{totalExpense.toLocaleString()}</div>
          </div>
          <div className="bg-card rounded-xl border p-5 shadow-sm">
            <div className="text-sm text-muted-foreground">Net Savings</div>
            <div className="text-2xl font-bold text-primary mt-1">₹{(totalIncome - totalExpense).toLocaleString()}</div>
          </div>
        </div>

        {/* Filters & search */}
        <div className="bg-card rounded-xl border shadow-sm">
          <div className="flex flex-col sm:flex-row gap-3 p-4 border-b">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search transactions..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-4 h-9 rounded-lg border bg-transparent text-sm outline-none focus:ring-2 focus:ring-ring/30"
              />
            </div>
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              {(["all", "credit", "debit"] as const).map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors capitalize ${filter === f ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-accent"}`}
                >
                  {f === "all" ? "All" : f === "credit" ? "Income" : "Expenses"}
                </button>
              ))}
            </div>
          </div>

          <div className="divide-y">
            {filtered.map((tx) => (
              <div key={tx.id} className="flex items-center gap-4 px-5 py-3.5 hover:bg-muted/30 transition-colors">
                <div className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 ${tx.type === "credit" ? "bg-emerald-100 text-emerald-600" : "bg-rose-100 text-rose-500"}`}>
                  {tx.type === "credit" ? <ArrowUpRight className="h-4 w-4" /> : <ArrowDownRight className="h-4 w-4" />}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium truncate">{tx.name}</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium hidden sm:inline-block ${categoryColors[tx.category] || "bg-muted text-muted-foreground"}`}>
                      {tx.category}
                    </span>
                  </div>
                  <div className="text-xs text-muted-foreground">{tx.account} · {tx.date}</div>
                </div>
                <div className={`text-sm font-semibold shrink-0 ${tx.type === "credit" ? "text-emerald-600" : "text-rose-500"}`}>
                  {tx.type === "credit" ? "+" : "-"}₹{tx.amount.toLocaleString()}
                </div>
              </div>
            ))}
            {filtered.length === 0 && (
              <div className="text-center py-12 text-muted-foreground text-sm">No transactions found</div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
