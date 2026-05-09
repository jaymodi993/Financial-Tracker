import { createClient } from '@/lib/supabase/server'
import { AccountCards } from '@/components/dashboard/account-cards'
import { QuickStats } from '@/components/dashboard/quick-stats'
import { RecentTransactions } from '@/components/dashboard/recent-transactions'
import { MonthlyChart } from '@/components/dashboard/monthly-chart'
import { AddTransactionDialog } from '@/components/dashboard/add-transaction-dialog'
import { SetupWizard } from '@/components/dashboard/setup-wizard'

export default async function DashboardPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  
  const { data: accounts } = await supabase
    .from('accounts')
    .select('*')
    .order('created_at', { ascending: true })

  const { data: categories } = await supabase
    .from('categories')
    .select('*')
    .order('name', { ascending: true })

  const { data: transactions } = await supabase
    .from('transactions')
    .select('*, accounts(*), categories(*)')
    .order('date', { ascending: false })
    .limit(10)

  // Get monthly summary for current year
  const currentYear = new Date().getFullYear()
  const { data: allTransactions } = await supabase
    .from('transactions')
    .select('*')
    .gte('date', `${currentYear}-01-01`)
    .lte('date', `${currentYear}-12-31`)

  // Show setup wizard if no accounts exist
  if (!accounts || accounts.length === 0) {
    return <SetupWizard userId={user!.id} />
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-balance">Financial Overview</h1>
          <p className="text-muted-foreground">Track your income, expenses, savings, and investments</p>
        </div>
        <AddTransactionDialog accounts={accounts || []} categories={categories || []} />
      </div>

      <QuickStats transactions={allTransactions || []} />
      
      <AccountCards accounts={accounts || []} />

      <div className="grid gap-6 lg:grid-cols-2">
        <MonthlyChart transactions={allTransactions || []} />
        <RecentTransactions transactions={transactions || []} />
      </div>
    </div>
  )
}
