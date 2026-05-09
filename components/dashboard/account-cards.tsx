'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Account } from '@/lib/types'
import { CreditCard, TrendingUp, Wallet } from 'lucide-react'

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount)
}

export function AccountCards({ accounts }: { accounts: Account[] }) {
  const totalBalance = accounts.reduce((sum, acc) => sum + Number(acc.balance), 0)
  const bankAccounts = accounts.filter((a) => a.type === 'bank')
  const dematAccounts = accounts.filter((a) => a.type === 'demat')

  const bankBalance = bankAccounts.reduce((sum, acc) => sum + Number(acc.balance), 0)
  const dematBalance = dematAccounts.reduce((sum, acc) => sum + Number(acc.balance), 0)

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Your Accounts</h2>
        <div className="flex items-center gap-2 text-lg font-medium">
          <Wallet className="h-5 w-5 text-primary" />
          Total: {formatCurrency(totalBalance)}
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {accounts.map((account) => (
          <Card key={account.id} className="relative overflow-hidden">
            <div className={`absolute inset-0 opacity-5 ${account.type === 'bank' ? 'bg-blue-500' : 'bg-amber-500'}`} />
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">{account.name}</CardTitle>
              {account.type === 'bank' ? (
                <CreditCard className="h-4 w-4 text-blue-600" />
              ) : (
                <TrendingUp className="h-4 w-4 text-amber-600" />
              )}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatCurrency(Number(account.balance))}</div>
              <p className="text-xs text-muted-foreground mt-1 capitalize">{account.type} Account</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="bg-blue-50 border-blue-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-blue-800">Total Bank Balance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-900">{formatCurrency(bankBalance)}</div>
            <p className="text-xs text-blue-700 mt-1">{bankAccounts.length} bank account(s)</p>
          </CardContent>
        </Card>

        <Card className="bg-amber-50 border-amber-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-amber-800">Total Demat Balance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-900">{formatCurrency(dematBalance)}</div>
            <p className="text-xs text-amber-700 mt-1">{dematAccounts.length} demat account(s)</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
