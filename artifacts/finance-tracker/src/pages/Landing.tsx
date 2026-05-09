import { Link } from "wouter";
import { Wallet, CreditCard, TrendingUp, PiggyBank, ChartLine, ChartColumn, Shield, ArrowRight } from "lucide-react";

const features = [
  {
    icon: CreditCard,
    title: "Multiple Accounts",
    description: "Track multiple bank accounts and demat accounts in one place",
  },
  {
    icon: TrendingUp,
    title: "Income Tracking",
    description: "Monitor all your income sources with detailed categorization",
  },
  {
    icon: PiggyBank,
    title: "Savings Goals",
    description: "Track your savings and set financial goals",
  },
  {
    icon: ChartLine,
    title: "Investment Tracking",
    description: "Monitor your investments and portfolio performance",
  },
  {
    icon: ChartColumn,
    title: "Analytics",
    description: "Get insights with monthly and yearly financial reports",
  },
  {
    icon: Shield,
    title: "Secure",
    description: "Your financial data is protected with enterprise-grade security",
  },
];

export default function Landing() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-2 text-primary">
            <Wallet className="h-6 w-6" aria-hidden="true" />
            <span className="text-xl font-bold">FinanceTracker</span>
          </div>
          <div className="flex items-center gap-4">
            <Link
              href="/auth/login"
              className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-all hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2"
            >
              Login
            </Link>
            <Link
              href="/auth/sign-up"
              className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-all bg-primary text-primary-foreground hover:bg-primary/90 h-9 px-4 py-2"
            >
              Get Started
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="container mx-auto px-4 py-24 text-center">
        <div className="mx-auto max-w-3xl space-y-6">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl text-balance">
            Take Control of Your{" "}
            <span className="text-primary">Financial Future</span>
          </h1>
          <p className="text-xl text-muted-foreground text-pretty">
            Track your income, expenses, savings, and investments across multiple bank and demat accounts. Get powerful insights with monthly and yearly analytics.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/auth/sign-up"
              className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-all bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-6"
            >
              Start Free <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
            </Link>
            <Link
              href="/auth/login"
              className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-all border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground h-10 px-6"
            >
              Login to Dashboard
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Everything You Need to Manage Your Finances</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A comprehensive personal finance management solution designed to help you track, analyze, and optimize your financial health.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className="bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm"
              >
                <div className="px-6">
                  <div className="mb-2 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Icon className="h-6 w-6 text-primary" aria-hidden="true" />
                  </div>
                  <div className="font-semibold text-lg">{feature.title}</div>
                </div>
                <div className="px-6">
                  <div className="text-muted-foreground text-sm">{feature.description}</div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* CTA */}
      <section className="container mx-auto px-4 py-16">
        <div className="flex flex-col gap-6 rounded-xl border py-6 shadow-sm bg-primary text-primary-foreground">
          <div className="px-6 py-12 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Start Managing Your Finances?</h2>
            <p className="text-primary-foreground/80 max-w-xl mx-auto mb-8">
              Join thousands of users who are already taking control of their financial future with FinanceTracker.
            </p>
            <Link
              href="/auth/sign-up"
              className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-all bg-secondary text-secondary-foreground hover:bg-secondary/80 h-10 px-6"
            >
              Create Free Account <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-8">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Wallet className="h-5 w-5" aria-hidden="true" />
            <span className="font-semibold">FinanceTracker</span>
          </div>
          <p className="text-sm">© 2026 FinanceTracker. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
