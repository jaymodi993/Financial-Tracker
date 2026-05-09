'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Account, Category } from '@/lib/types'
import { Plus, Tags, ArrowRightLeft } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

type TransactionType = 'income' | 'expense' | 'savings' | 'investment' | 'transfer'

export function AddTransactionDialog({
  accounts,
  categories,
}: {
  accounts: Account[]
  categories: Category[]
}) {
  const [open, setOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const [type, setType] = useState<TransactionType>('expense')
  const [accountId, setAccountId] = useState('')
  const [toAccountId, setToAccountId] = useState('')
  const [categoryId, setCategoryId] = useState('')
  const [amount, setAmount] = useState('')
  const [description, setDescription] = useState('')
  const [date, setDate] = useState(new Date().toISOString().split('T')[0])

  const isTransfer = type === 'transfer'

  const filteredCategories = categories.filter((c) => c.type === type)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      setError('You must be logged in')
      setIsLoading(false)
      return
    }

    try {
      const parsedAmount = parseFloat(amount)

      if (isTransfer) {
        // For transfers, we create two transactions and update both accounts
        if (accountId === toAccountId) {
          throw new Error('Source and destination accounts must be different')
        }

        // Insert deduction transaction (from source account)
        const { error: deductError } = await supabase.from('transactions').insert({
          user_id: user.id,
          account_id: accountId,
          category_id: null,
          type: 'transfer',
          amount: -parsedAmount,
          description: `Transfer to ${accounts.find(a => a.id === toAccountId)?.name || 'account'}${description ? ': ' + description : ''}`,
          date,
        })
        if (deductError) throw deductError

        // Insert addition transaction (to destination account)
        const { error: addError } = await supabase.from('transactions').insert({
          user_id: user.id,
          account_id: toAccountId,
          category_id: null,
          type: 'transfer',
          amount: parsedAmount,
          description: `Transfer from ${accounts.find(a => a.id === accountId)?.name || 'account'}${description ? ': ' + description : ''}`,
          date,
        })
        if (addError) throw addError

        // Update source account balance (deduct)
        const sourceAccount = accounts.find((a) => a.id === accountId)
        if (sourceAccount) {
          const { error: sourceBalanceError } = await supabase
            .from('accounts')
            .update({ balance: Number(sourceAccount.balance) - parsedAmount })
            .eq('id', accountId)
          if (sourceBalanceError) throw sourceBalanceError
        }

        // Update destination account balance (add)
        const destAccount = accounts.find((a) => a.id === toAccountId)
        if (destAccount) {
          const { error: destBalanceError } = await supabase
            .from('accounts')
            .update({ balance: Number(destAccount.balance) + parsedAmount })
            .eq('id', toAccountId)
          if (destBalanceError) throw destBalanceError
        }
      } else {
        // Regular transaction (income, expense, savings, investment)
        const { error: txError } = await supabase.from('transactions').insert({
          user_id: user.id,
          account_id: accountId,
          category_id: categoryId || null,
          type,
          amount: parsedAmount,
          description: description || null,
          date,
        })

        if (txError) throw txError

        // Update account balance
        const account = accounts.find((a) => a.id === accountId)
        if (account) {
          const balanceChange = type === 'income' 
            ? parsedAmount 
            : -parsedAmount
          
          const { error: balanceError } = await supabase
            .from('accounts')
            .update({ balance: Number(account.balance) + balanceChange })
            .eq('id', accountId)

          if (balanceError) throw balanceError
        }
      }

      // Reset form
      setType('expense')
      setAccountId('')
      setToAccountId('')
      setCategoryId('')
      setAmount('')
      setDescription('')
      setDate(new Date().toISOString().split('T')[0])
      setOpen(false)
      router.refresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add transaction')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add Transaction
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add Transaction</DialogTitle>
          <DialogDescription>
            Record a new income, expense, savings, or investment
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-2">
            <Label htmlFor="type">Type</Label>
            <Select value={type} onValueChange={(v) => {
              setType(v as TransactionType)
              setCategoryId('')
            }}>
              <SelectTrigger id="type">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="income">Income</SelectItem>
                <SelectItem value="expense">Expense</SelectItem>
                <SelectItem value="savings">Savings</SelectItem>
                <SelectItem value="investment">Investment</SelectItem>
                <SelectItem value="transfer">Transfer</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="account">{isTransfer ? 'From Account (Deduct)' : 'Account'}</Label>
            <Select value={accountId} onValueChange={setAccountId} required>
              <SelectTrigger id="account">
                <SelectValue placeholder={isTransfer ? 'Select source account' : 'Select account'} />
              </SelectTrigger>
              <SelectContent>
                {accounts.map((account) => (
                  <SelectItem key={account.id} value={account.id} disabled={isTransfer && account.id === toAccountId}>
                    {account.name} ({account.type === 'bank' ? 'Bank' : 'Demat'})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {isTransfer && (
            <div className="grid gap-2">
              <Label htmlFor="toAccount">To Account (Add)</Label>
              <Select value={toAccountId} onValueChange={setToAccountId} required>
                <SelectTrigger id="toAccount">
                  <SelectValue placeholder="Select destination account" />
                </SelectTrigger>
                <SelectContent>
                  {accounts.map((account) => (
                    <SelectItem key={account.id} value={account.id} disabled={account.id === accountId}>
                      {account.name} ({account.type === 'bank' ? 'Bank' : 'Demat'})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          {isTransfer && (
            <div className="flex items-center gap-2 p-3 rounded-lg bg-muted/50 text-sm text-muted-foreground">
              <ArrowRightLeft className="h-4 w-4" />
              <span>Money will be transferred between accounts</span>
            </div>
          )}

          {!isTransfer && (
            <div className="grid gap-2">
              <Label htmlFor="category">Category</Label>
              {filteredCategories.length === 0 ? (
                <div className="flex items-center gap-2 p-3 rounded-lg border border-dashed text-sm text-muted-foreground">
                  <Tags className="h-4 w-4" />
                  <span>No {type} categories.</span>
                  <Link 
                    href="/dashboard/categories" 
                    className="text-primary hover:underline"
                    onClick={() => setOpen(false)}
                  >
                    Create one
                  </Link>
                </div>
              ) : (
                <Select value={categoryId} onValueChange={setCategoryId}>
                  <SelectTrigger id="category">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {filteredCategories.map((category) => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            </div>
          )}

          <div className="grid gap-2">
            <Label htmlFor="amount">Amount (INR)</Label>
            <Input
              id="amount"
              type="number"
              step="0.01"
              min="0"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.00"
              required
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="description">Description (optional)</Label>
            <Input
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="e.g., Monthly salary"
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="date">Date</Label>
            <Input
              id="date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </div>

          {error && <p className="text-sm text-destructive">{error}</p>}

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? 'Adding...' : 'Add Transaction'}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
