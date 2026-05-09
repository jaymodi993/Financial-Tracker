'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Transaction } from '@/lib/types'
import { TrendingUp, TrendingDown, PiggyBank, LineChart } from 'lucide-react'

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount)
}

export function QuickStats({ transactions }: { transactions: Transaction[] }) {
  const currentMonth = new Date().getMonth()
  const currentYear = new Date().getFullYear()

  const monthlyTransactions = transactions.filter((t) => {
    const date = new Date(t.date)
    return date.getMonth() === currentMonth && date.getFullYear() === currentYear
  })

  const stats = {
    income: monthlyTransactions
      .filter((t) => t.type === 'income')
      .reduce((sum, t) => sum + Number(t.amount), 0),
    expense: monthlyTransactions
      .filter((t) => t.type === 'expense')
      .reduce((sum, t) => sum + Number(t.amount), 0),
    savings: monthlyTransactions
      .filter((t) => t.type === 'savings')
      .reduce((sum, t) => sum + Number(t.amount), 0),
    investment: monthlyTransactions
      .filter((t) => t.type === 'investment')
      .reduce((sum, t) => sum + Number(t.amount), 0),
  }

  const netBalance = stats.income - stats.expense - stats.savings - stats.investment

  const cards = [
    {
      title: 'Monthly Income',
      value: stats.income,
      icon: TrendingUp,
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50',
    },
    {
      title: 'Monthly Expenses',
      value: stats.expense,
      icon: TrendingDown,
      color: 'text-rose-600',
      bgColor: 'bg-rose-50',
    },
    {
      title: 'Monthly Savings',
      value: stats.savings,
      icon: PiggyBank,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      title: 'Monthly Investments',
      value: stats.investment,
      icon: LineChart,
      color: 'text-amber-600',
      bgColor: 'bg-amber-50',
    },
  ]

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {cards.map((card) => {
        const Icon = card.icon
        return (
          <Card key={card.title}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {card.title}
              </CardTitle>
              <div className={`p-2 rounded-lg ${card.bgColor}`}>
                <Icon className={`h-4 w-4 ${card.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatCurrency(card.value)}</div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
