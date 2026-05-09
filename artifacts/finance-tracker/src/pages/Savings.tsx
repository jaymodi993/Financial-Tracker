import DashboardLayout from "@/layouts/DashboardLayout";
import { Plus, Target, Calendar } from "lucide-react";

const savingsGoals = [
  {
    name: "Emergency Fund",
    icon: "🛡️",
    target: 300000,
    saved: 210000,
    deadline: "Dec 2026",
    color: "bg-blue-500",
  },
  {
    name: "New Car",
    icon: "🚗",
    target: 800000,
    saved: 280000,
    deadline: "Mar 2028",
    color: "bg-emerald-500",
  },
  {
    name: "Home Down Payment",
    icon: "🏠",
    target: 1500000,
    saved: 420000,
    deadline: "Jun 2029",
    color: "bg-violet-500",
  },
  {
    name: "Europe Vacation",
    icon: "✈️",
    target: 200000,
    saved: 85000,
    deadline: "Sep 2026",
    color: "bg-amber-500",
  },
  {
    name: "MacBook Pro",
    icon: "💻",
    target: 220000,
    saved: 190000,
    deadline: "Jul 2026",
    color: "bg-pink-500",
  },
];

export default function Savings() {
  const totalTarget = savingsGoals.reduce((s, g) => s + g.target, 0);
  const totalSaved = savingsGoals.reduce((s, g) => s + g.saved, 0);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Savings Goals</h1>
            <p className="text-muted-foreground text-sm mt-1">Track your progress towards financial goals</p>
          </div>
          <button className="inline-flex items-center gap-2 bg-primary text-primary-foreground text-sm font-medium px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors">
            <Plus className="h-4 w-4" /> New Goal
          </button>
        </div>

        {/* Summary */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-card rounded-xl border p-5 shadow-sm">
            <div className="text-sm text-muted-foreground">Total Saved</div>
            <div className="text-2xl font-bold text-primary mt-1">₹{totalSaved.toLocaleString()}</div>
          </div>
          <div className="bg-card rounded-xl border p-5 shadow-sm">
            <div className="text-sm text-muted-foreground">Total Target</div>
            <div className="text-2xl font-bold mt-1">₹{totalTarget.toLocaleString()}</div>
          </div>
          <div className="bg-card rounded-xl border p-5 shadow-sm">
            <div className="text-sm text-muted-foreground">Overall Progress</div>
            <div className="text-2xl font-bold text-emerald-600 mt-1">{Math.round((totalSaved / totalTarget) * 100)}%</div>
          </div>
        </div>

        {/* Goals grid */}
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {savingsGoals.map((goal) => {
            const percent = Math.round((goal.saved / goal.target) * 100);
            const remaining = goal.target - goal.saved;
            return (
              <div key={goal.name} className="bg-card rounded-xl border p-5 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="text-2xl">{goal.icon}</div>
                    <div>
                      <div className="font-semibold">{goal.name}</div>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground mt-0.5">
                        <Calendar className="h-3 w-3" />
                        {goal.deadline}
                      </div>
                    </div>
                  </div>
                  <span className="text-sm font-bold text-primary">{percent}%</span>
                </div>

                {/* Progress bar */}
                <div className="w-full bg-muted rounded-full h-2 mb-3">
                  <div
                    className={`h-2 rounded-full ${goal.color} transition-all`}
                    style={{ width: `${Math.min(percent, 100)}%` }}
                  />
                </div>

                <div className="flex justify-between text-sm">
                  <div>
                    <div className="text-xs text-muted-foreground">Saved</div>
                    <div className="font-semibold text-emerald-600">₹{goal.saved.toLocaleString()}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-muted-foreground">Remaining</div>
                    <div className="font-semibold">₹{remaining.toLocaleString()}</div>
                  </div>
                </div>

                <div className="mt-3 pt-3 border-t flex items-center justify-between text-xs text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Target className="h-3 w-3" />
                    Target: ₹{goal.target.toLocaleString()}
                  </div>
                  <button className="text-primary font-medium hover:underline">Add Funds</button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </DashboardLayout>
  );
}
