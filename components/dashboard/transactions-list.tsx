'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { Account, Category, TransactionWithDetails } from '@/lib/types'
import { TrendingUp, TrendingDown, PiggyBank, LineChart, ArrowRightLeft, Trash2, Search } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useRouter } from 'next/navigation'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'

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

export function TransactionsList({
  transactions,
  accounts,
  categories,
}: {
  transactions: TransactionWithDetails[]
  accounts: Account[]
  categories: Category[]
}) {
  const [typeFilter, setTypeFilter] = useState<string>('all')
  const [accountFilter, setAccountFilter] = useState<string>('all')
  const [categoryFilter, setCategoryFilter] = useState<string>('all')
  const [searchQuery, setSearchQuery] = useState('')
  const router = useRouter()

  const handleDelete = async (transactionId: string, accountId: string, type: string, amount: number) => {
    const supabase = createClient()
    
    try {
      // Delete transaction
      const { error: deleteError } = await supabase
        .from('transactions')
        .delete()
        .eq('id', transactionId)

      if (deleteError) throw deleteError

      // Update account balance
      const account = accounts.find((a) => a.id === accountId)
      if (account) {
        const balanceChange = type === 'income' ? -amount : amount
        await supabase
          .from('accounts')
          .update({ balance: Number(account.balance) + balanceChange })
          .eq('id', accountId)
      }

      router.refresh()
    } catch (err) {
      console.error(err)
    }
  }

  const filteredTransactions = transactions.filter((t) => {
    const matchesType = typeFilter === 'all' || t.type === typeFilter
    const matchesAccount = accountFilter === 'all' || t.account_id === accountFilter
    const matchesCategory = categoryFilter === 'all' || t.category_id === categoryFilter
    const matchesSearch =
      searchQuery === '' ||
      t.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.categories?.name?.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesType && matchesAccount && matchesCategory && matchesSearch
  })

  // Group transactions by date
  const groupedTransactions = filteredTransactions.reduce((groups, transaction) => {
    const date = transaction.date
    if (!groups[date]) {
      groups[date] = []
    }
    groups[date].push(transaction)
    return groups
  }, {} as Record<string, TransactionWithDetails[]>)

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search transactions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
        <Select value={typeFilter} onValueChange={setTypeFilter}>
          <SelectTrigger className="w-full sm:w-40">
            <SelectValue placeholder="Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="income">Income</SelectItem>
            <SelectItem value="expense">Expense</SelectItem>
            <SelectItem value="savings">Savings</SelectItem>
            <SelectItem value="investment">Investment</SelectItem>
            <SelectItem value="transfer">Transfer</SelectItem>
          </SelectContent>
        </Select>
        <Select value={accountFilter} onValueChange={setAccountFilter}>
          <SelectTrigger className="w-full sm:w-48">
            <SelectValue placeholder="Account" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Accounts</SelectItem>
            {accounts.map((account) => (
              <SelectItem key={account.id} value={account.id}>
                {account.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
          <SelectTrigger className="w-full sm:w-48">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {categories.map((category) => (
              <SelectItem key={category.id} value={category.id}>
                {category.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {filteredTransactions.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center text-muted-foreground">
            No transactions found
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-6">
          {Object.entries(groupedTransactions).map(([date, dayTransactions]) => (
            <div key={date} className="space-y-2">
              <h3 className="text-sm font-medium text-muted-foreground px-1">
                {formatDate(date)}
              </h3>
              <Card>
                <CardContent className="p-0 divide-y">
                  {dayTransactions.map((transaction) => {
                    const Icon = typeIcons[transaction.type]
                    const colorClass = typeColors[transaction.type]
                    const isIncome = transaction.type === 'income'
                    const isTransfer = transaction.type === 'transfer'
                    const amount = Number(transaction.amount)
                    const isPositiveTransfer = isTransfer && amount > 0

                    return (
                      <div
                        key={transaction.id}
                        className="flex items-center gap-3 p-4"
                      >
                        <div className={cn('p-2 rounded-lg', colorClass)}>
                          <Icon className="h-4 w-4" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium truncate">
                            {transaction.description || transaction.categories?.name || (isTransfer ? 'Transfer' : transaction.type)}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {transaction.accounts?.name}
                            {transaction.categories && ` • ${transaction.categories.name}`}
                          </p>
                        </div>
                        <div
                          className={cn(
                            'font-semibold',
                            isIncome || isPositiveTransfer ? 'text-emerald-600' : 'text-foreground'
                          )}
                        >
                          {isTransfer 
                            ? (isPositiveTransfer ? '+' : '') + formatCurrency(amount)
                            : (isIncome ? '+' : '-') + formatCurrency(Math.abs(amount))}
                        </div>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <Trash2 className="h-4 w-4 text-muted-foreground hover:text-destructive" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Delete Transaction?</AlertDialogTitle>
                              <AlertDialogDescription>
                                This will delete the transaction and update the account balance. This action cannot be undone.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() =>
                                  handleDelete(
                                    transaction.id,
                                    transaction.account_id,
                                    transaction.type,
                                    Number(transaction.amount)
                                  )
                                }
                              >
                                Delete
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    )
                  })}
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
