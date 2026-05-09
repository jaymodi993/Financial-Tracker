import DashboardLayout from "@/layouts/DashboardLayout";
import { Plus, ArrowUpRight, ArrowDownRight, TrendingUp } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const portfolio = [
  { name: "Reliance Industries", symbol: "RELIANCE", type: "Stock", qty: 10, avgPrice: 2420, currentPrice: 2890, color: "text-blue-600" },
  { name: "HDFC Bank", symbol: "HDFCBANK", type: "Stock", qty: 25, avgPrice: 1540, currentPrice: 1680, color: "text-emerald-600" },
  { name: "Nifty 50 Index Fund", symbol: "NIFTY50", type: "Mutual Fund", qty: 150, avgPrice: 180, currentPrice: 215, color: "text-violet-600" },
  { name: "Infosys", symbol: "INFY", type: "Stock", qty: 15, avgPrice: 1320, currentPrice: 1290, color: "text-rose-500" },
  { name: "SBI Small Cap Fund", symbol: "SBISMALLCAP", type: "Mutual Fund", qty: 200, avgPrice: 95, currentPrice: 128, color: "text-amber-600" },
  { name: "Gold ETF", symbol: "GOLDBEES", type: "ETF", qty: 50, avgPrice: 520, currentPrice: 595, color: "text-yellow-600" },
];

const portfolioHistory = [
  { month: "Nov", value: 280000 },
  { month: "Dec", value: 295000 },
  { month: "Jan", value: 310000 },
  { month: "Feb", value: 298000 },
  { month: "Mar", value: 325000 },
  { month: "Apr", value: 342000 },
  { month: "May", value: 368000 },
];

const typeColors: Record<string, string> = {
  Stock: "bg-blue-100 text-blue-700",
  "Mutual Fund": "bg-violet-100 text-violet-700",
  ETF: "bg-amber-100 text-amber-700",
};

export default function Investments() {
  const totalInvested = portfolio.reduce((s, h) => s + h.qty * h.avgPrice, 0);
  const currentValue = portfolio.reduce((s, h) => s + h.qty * h.currentPrice, 0);
  const totalGain = currentValue - totalInvested;
  const gainPercent = ((totalGain / totalInvested) * 100).toFixed(2);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Investments</h1>
            <p className="text-muted-foreground text-sm mt-1">Track your portfolio performance</p>
          </div>
          <button className="inline-flex items-center gap-2 bg-primary text-primary-foreground text-sm font-medium px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors">
            <Plus className="h-4 w-4" /> Add Investment
          </button>
        </div>

        {/* Portfolio summary */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-card rounded-xl border p-5 shadow-sm">
            <div className="text-sm text-muted-foreground">Current Value</div>
            <div className="text-2xl font-bold mt-1">₹{currentValue.toLocaleString()}</div>
          </div>
          <div className="bg-card rounded-xl border p-5 shadow-sm">
            <div className="text-sm text-muted-foreground">Invested Amount</div>
            <div className="text-2xl font-bold mt-1">₹{totalInvested.toLocaleString()}</div>
          </div>
          <div className="bg-card rounded-xl border p-5 shadow-sm">
            <div className="text-sm text-muted-foreground">Total Gain / Loss</div>
            <div className={`text-2xl font-bold mt-1 flex items-center gap-1 ${totalGain >= 0 ? "text-emerald-600" : "text-rose-500"}`}>
              {totalGain >= 0 ? <ArrowUpRight className="h-5 w-5" /> : <ArrowDownRight className="h-5 w-5" />}
              ₹{Math.abs(totalGain).toLocaleString()}
              <span className="text-base">({gainPercent}%)</span>
            </div>
          </div>
        </div>

        {/* Portfolio chart */}
        <div className="bg-card rounded-xl border p-5 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="h-5 w-5 text-primary" />
            <h2 className="font-semibold">Portfolio Value (6 Months)</h2>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={portfolioHistory}>
              <defs>
                <linearGradient id="portfolio" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12 }} axisLine={false} tickLine={false} tickFormatter={(v) => `₹${v / 1000}k`} />
              <Tooltip formatter={(v: number) => `₹${v.toLocaleString()}`} />
              <Area type="monotone" dataKey="value" stroke="#3b82f6" strokeWidth={2} fill="url(#portfolio)" name="Portfolio Value" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Holdings table */}
        <div className="bg-card rounded-xl border shadow-sm overflow-hidden">
          <div className="px-5 py-4 border-b">
            <h2 className="font-semibold">Holdings</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-muted/50 text-muted-foreground">
                <tr>
                  <th className="text-left px-5 py-3 font-medium">Name</th>
                  <th className="text-left px-5 py-3 font-medium">Type</th>
                  <th className="text-right px-5 py-3 font-medium">Qty</th>
                  <th className="text-right px-5 py-3 font-medium">Avg Price</th>
                  <th className="text-right px-5 py-3 font-medium">Current</th>
                  <th className="text-right px-5 py-3 font-medium">Gain/Loss</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {portfolio.map((h) => {
                  const gain = (h.currentPrice - h.avgPrice) * h.qty;
                  const gainPct = (((h.currentPrice - h.avgPrice) / h.avgPrice) * 100).toFixed(1);
                  return (
                    <tr key={h.symbol} className="hover:bg-muted/30 transition-colors">
                      <td className="px-5 py-3.5">
                        <div className="font-medium">{h.name}</div>
                        <div className="text-xs text-muted-foreground">{h.symbol}</div>
                      </td>
                      <td className="px-5 py-3.5">
                        <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${typeColors[h.type]}`}>{h.type}</span>
                      </td>
                      <td className="px-5 py-3.5 text-right">{h.qty}</td>
                      <td className="px-5 py-3.5 text-right">₹{h.avgPrice.toLocaleString()}</td>
                      <td className="px-5 py-3.5 text-right font-medium">₹{h.currentPrice.toLocaleString()}</td>
                      <td className={`px-5 py-3.5 text-right font-semibold ${gain >= 0 ? "text-emerald-600" : "text-rose-500"}`}>
                        {gain >= 0 ? "+" : ""}₹{gain.toLocaleString()} ({gainPct}%)
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
