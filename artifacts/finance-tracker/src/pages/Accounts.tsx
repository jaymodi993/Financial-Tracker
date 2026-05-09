import DashboardLayout from "@/layouts/DashboardLayout";
import { CreditCard, Building2, TrendingUp, Plus, ArrowUpRight, ArrowDownRight } from "lucide-react";

const accounts = [
  {
    name: "HDFC Savings Account",
    number: "XXXX XXXX 4521",
    type: "Savings",
    bank: "HDFC Bank",
    balance: 142500,
    icon: Building2,
    color: "bg-blue-100 text-blue-600",
    change: "+₹8,200",
    up: true,
  },
  {
    name: "SBI Salary Account",
    number: "XXXX XXXX 7832",
    type: "Salary",
    bank: "State Bank of India",
    balance: 85000,
    icon: Building2,
    color: "bg-emerald-100 text-emerald-600",
    change: "+₹75,000",
    up: true,
  },
  {
    name: "ICICI Current Account",
    number: "XXXX XXXX 2190",
    type: "Current",
    bank: "ICICI Bank",
    balance: 35000,
    icon: CreditCard,
    color: "bg-violet-100 text-violet-600",
    change: "-₹12,000",
    up: false,
  },
  {
    name: "Zerodha Demat Account",
    number: "XXXX XXXX 9041",
    type: "Demat",
    bank: "Zerodha",
    balance: 320000,
    icon: TrendingUp,
    color: "bg-amber-100 text-amber-600",
    change: "+₹24,800",
    up: true,
  },
  {
    name: "Groww Demat Account",
    number: "XXXX XXXX 5512",
    type: "Demat",
    bank: "Groww",
    balance: 95000,
    icon: TrendingUp,
    color: "bg-pink-100 text-pink-600",
    change: "+₹6,500",
    up: true,
  },
];

export default function Accounts() {
  const total = accounts.reduce((sum, a) => sum + a.balance, 0);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Accounts</h1>
            <p className="text-muted-foreground text-sm mt-1">Manage your bank and demat accounts</p>
          </div>
          <button className="inline-flex items-center gap-2 bg-primary text-primary-foreground text-sm font-medium px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors">
            <Plus className="h-4 w-4" /> Add Account
          </button>
        </div>

        {/* Total balance */}
        <div className="bg-primary text-primary-foreground rounded-xl p-6 shadow-sm">
          <div className="text-sm font-medium opacity-80">Total Portfolio Value</div>
          <div className="text-4xl font-bold mt-1">₹{total.toLocaleString()}</div>
          <div className="flex items-center gap-1 mt-2 text-sm opacity-90">
            <ArrowUpRight className="h-4 w-4" /> +₹1,07,500 this month
          </div>
        </div>

        {/* Accounts list */}
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {accounts.map((account) => {
            const Icon = account.icon;
            return (
              <div key={account.number} className="bg-card rounded-xl border p-5 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${account.color}`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <span className="text-xs font-medium px-2 py-1 rounded-full bg-muted text-muted-foreground">{account.type}</span>
                </div>
                <div className="font-semibold">{account.name}</div>
                <div className="text-xs text-muted-foreground mt-0.5">{account.bank} · {account.number}</div>
                <div className="mt-4 pt-4 border-t flex items-end justify-between">
                  <div>
                    <div className="text-xs text-muted-foreground">Balance</div>
                    <div className="text-xl font-bold mt-0.5">₹{account.balance.toLocaleString()}</div>
                  </div>
                  <div className={`flex items-center gap-1 text-xs font-medium ${account.up ? "text-emerald-600" : "text-rose-500"}`}>
                    {account.up ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                    {account.change}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </DashboardLayout>
  );
}
