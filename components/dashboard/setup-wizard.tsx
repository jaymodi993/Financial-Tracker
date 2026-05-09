'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useRouter } from 'next/navigation'
import { CreditCard, TrendingUp, Plus, Trash2 } from 'lucide-react'

type AccountInput = {
  name: string
  type: 'bank' | 'demat'
  balance: string
}

const defaultAccounts: AccountInput[] = [
  { name: 'Bank Account 1', type: 'bank', balance: '0' },
  { name: 'Bank Account 2', type: 'bank', balance: '0' },
  { name: 'Bank Account 3', type: 'bank', balance: '0' },
  { name: 'Demat Account', type: 'demat', balance: '0' },
]

const defaultCategories = [
  { name: 'Salary', type: 'income' },
  { name: 'Freelance', type: 'income' },
  { name: 'Interest', type: 'income' },
  { name: 'Dividends', type: 'income' },
  { name: 'Food & Dining', type: 'expense' },
  { name: 'Shopping', type: 'expense' },
  { name: 'Transportation', type: 'expense' },
  { name: 'Bills & Utilities', type: 'expense' },
  { name: 'Entertainment', type: 'expense' },
  { name: 'Healthcare', type: 'expense' },
  { name: 'Education', type: 'expense' },
  { name: 'Rent/EMI', type: 'expense' },
  { name: 'Fixed Deposit', type: 'savings' },
  { name: 'Recurring Deposit', type: 'savings' },
  { name: 'Emergency Fund', type: 'savings' },
  { name: 'Stocks', type: 'investment' },
  { name: 'Mutual Funds', type: 'investment' },
  { name: 'SIP', type: 'investment' },
  { name: 'Bonds', type: 'investment' },
]

export function SetupWizard({ userId }: { userId: string }) {
  const [accounts, setAccounts] = useState<AccountInput[]>(defaultAccounts)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const updateAccount = (index: number, field: keyof AccountInput, value: string) => {
    const updated = [...accounts]
    updated[index] = { ...updated[index], [field]: value }
    setAccounts(updated)
  }

  const addAccount = () => {
    setAccounts([...accounts, { name: '', type: 'bank', balance: '0' }])
  }

  const removeAccount = (index: number) => {
    if (accounts.length > 1) {
      setAccounts(accounts.filter((_, i) => i !== index))
    }
  }

  const handleSetup = async () => {
    setIsLoading(true)
    setError(null)
    const supabase = createClient()

    try {
      // Create accounts
      const accountsToInsert = accounts
        .filter(a => a.name.trim())
        .map(a => ({
          user_id: userId,
          name: a.name.trim(),
          type: a.type,
          balance: parseFloat(a.balance) || 0,
          currency: 'INR'
        }))

      if (accountsToInsert.length === 0) {
        setError('Please add at least one account')
        setIsLoading(false)
        return
      }

      const { error: accountError } = await supabase
        .from('accounts')
        .insert(accountsToInsert)

      if (accountError) throw accountError

      // Create default categories
      const categoriesToInsert = defaultCategories.map(c => ({
        user_id: userId,
        name: c.name,
        type: c.type,
      }))

      const { error: categoryError } = await supabase
        .from('categories')
        .insert(categoriesToInsert)

      if (categoryError) throw categoryError

      router.refresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Setup failed')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold">Welcome to FinanceTracker</h1>
        <p className="text-muted-foreground">
          {"Let's set up your accounts to get started"}
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="h-5 w-5" />
            Your Accounts
          </CardTitle>
          <CardDescription>
            Add your bank accounts and demat account with their current balances
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {accounts.map((account, index) => (
            <div key={index} className="flex gap-3 items-end">
              <div className="flex-1 grid gap-2">
                <Label htmlFor={`name-${index}`}>Account Name</Label>
                <Input
                  id={`name-${index}`}
                  value={account.name}
                  onChange={(e) => updateAccount(index, 'name', e.target.value)}
                  placeholder="e.g., HDFC Savings"
                />
              </div>
              <div className="w-32 grid gap-2">
                <Label htmlFor={`type-${index}`}>Type</Label>
                <Select
                  value={account.type}
                  onValueChange={(v) => updateAccount(index, 'type', v as 'bank' | 'demat')}
                >
                  <SelectTrigger id={`type-${index}`}>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="bank">Bank</SelectItem>
                    <SelectItem value="demat">Demat</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="w-36 grid gap-2">
                <Label htmlFor={`balance-${index}`}>Balance (INR)</Label>
                <Input
                  id={`balance-${index}`}
                  type="number"
                  value={account.balance}
                  onChange={(e) => updateAccount(index, 'balance', e.target.value)}
                  placeholder="0"
                />
              </div>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => removeAccount(index)}
                disabled={accounts.length <= 1}
                className="shrink-0"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}

          <Button type="button" variant="outline" onClick={addAccount} className="w-full">
            <Plus className="h-4 w-4 mr-2" />
            Add Another Account
          </Button>

          {error && <p className="text-sm text-destructive">{error}</p>}

          <Button onClick={handleSetup} disabled={isLoading} className="w-full">
            {isLoading ? 'Setting up...' : 'Complete Setup'}
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Default Categories
          </CardTitle>
          <CardDescription>
            {"We'll create these categories for you automatically"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
            {defaultCategories.map((cat) => (
              <div
                key={cat.name}
                className="px-3 py-2 rounded-md bg-muted text-sm"
              >
                {cat.name}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
