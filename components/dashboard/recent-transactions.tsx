'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { TransactionWithDetails } from '@/lib/types'
import { TrendingUp, TrendingDown, PiggyBank, LineChart, ArrowRightLeft } from 'lucide-react'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount)
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}

const typeIcons = {
  income: TrendingUp,
  expense: TrendingDown,
  savings: PiggyBank,
  investment: LineChart,
  transfer: ArrowRightLeft,
}

const typeColors = {
  income: 'text-emerald-600 bg-emerald-50',
  expense: 'text-rose-600 bg-rose-50',
  savings: 'text-blue-600 bg-blue-50',
  investment: 'text-amber-600 bg-amber-50',
  transfer: 'text-gray-600 bg-gray-50',
}

export function RecentTransactions({ transactions }: { transactions: TransactionWithDetails[] }) {
  if (transactions.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Recent Transactions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-muted-foreground">
            No transactions yet. Add your first transaction to get started.
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Recent Transactions</CardTitle>
        <Button variant="ghost" size="sm" asChild>
          <Link href="/dashboard/transactions">View All</Link>
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {transactions.map((transaction) => {
            const Icon = typeIcons[transaction.type]
            const colorClass = typeColors[transaction.type]
            const isIncome = transaction.type === 'income'

            return (
              <div
                key={transaction.id}
                className="flex items-center gap-3 p-3 rounded-lg bg-muted/50"
              >
                <div className={cn('p-2 rounded-lg', colorClass)}>
                  <Icon className="h-4 w-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium truncate">
                    {transaction.description || transaction.categories?.name || transaction.type}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {transaction.accounts?.name} • {formatDate(transaction.date)}
                  </p>
                </div>
                <div
                  className={cn(
                    'font-semibold',
                    isIncome ? 'text-emerald-600' : 'text-foreground'
                  )}
                >
                  {isIncome ? '+' : '-'}{formatCurrency(Number(transaction.amount))}
                </div>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
