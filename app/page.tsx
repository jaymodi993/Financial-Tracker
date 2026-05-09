import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { 
  Wallet, 
  TrendingUp, 
  PiggyBank, 
  LineChart, 
  CreditCard, 
  Shield,
  BarChart3,
  ArrowRight
} from 'lucide-react'

const features = [
  {
    icon: CreditCard,
    title: 'Multiple Accounts',
    description: 'Track multiple bank accounts and demat accounts in one place',
  },
  {
    icon: TrendingUp,
    title: 'Income Tracking',
    description: 'Monitor all your income sources with detailed categorization',
  },
  {
    icon: PiggyBank,
    title: 'Savings Goals',
    description: 'Track your savings and set financial goals',
  },
  {
    icon: LineChart,
    title: 'Investment Tracking',
    description: 'Monitor your investments and portfolio performance',
  },
  {
    icon: BarChart3,
    title: 'Analytics',
    description: 'Get insights with monthly and yearly financial reports',
  },
  {
    icon: Shield,
    title: 'Secure',
    description: 'Your financial data is protected with enterprise-grade security',
  },
]

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-2 text-primary">
            <Wallet className="h-6 w-6" />
            <span className="text-xl font-bold">FinanceTracker</span>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" asChild>
              <Link href="/auth/login">Login</Link>
            </Button>
            <Button asChild>
              <Link href="/auth/sign-up">Get Started</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-24 text-center">
        <div className="mx-auto max-w-3xl space-y-6">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl text-balance">
            Take Control of Your{' '}
            <span className="text-primary">Financial Future</span>
          </h1>
          <p className="text-xl text-muted-foreground text-pretty">
            Track your income, expenses, savings, and investments across multiple bank and demat accounts. 
            Get powerful insights with monthly and yearly analytics.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" asChild>
              <Link href="/auth/sign-up">
                Start Free <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/auth/login">Login to Dashboard</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Everything You Need to Manage Your Finances</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A comprehensive personal finance management solution designed to help you track, analyze, 
            and optimize your financial health.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => {
            const Icon = feature.icon
            return (
              <Card key={feature.title}>
                <CardHeader>
                  <div className="mb-2 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{feature.description}</CardDescription>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16">
        <Card className="bg-primary text-primary-foreground">
          <CardContent className="py-12 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Start Managing Your Finances?</h2>
            <p className="text-primary-foreground/80 max-w-xl mx-auto mb-8">
              Join thousands of users who are already taking control of their financial future with FinanceTracker.
            </p>
            <Button size="lg" variant="secondary" asChild>
              <Link href="/auth/sign-up">
                Create Free Account <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      </section>

      {/* Footer */}
      <footer className="border-t py-8">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Wallet className="h-5 w-5" />
            <span className="font-semibold">FinanceTracker</span>
          </div>
          <p className="text-sm">&copy; {new Date().getFullYear()} FinanceTracker. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
