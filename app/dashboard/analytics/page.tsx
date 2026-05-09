import { createClient } from '@/lib/supabase/server'
import { AnalyticsDashboard } from '@/components/dashboard/analytics-dashboard'

export default async function AnalyticsPage() {
  const supabase = await createClient()
  
  const { data: transactions } = await supabase
    .from('transactions')
    .select('*, categories(*)')
    .order('date', { ascending: false })

  const { data: accounts } = await supabase
    .from('accounts')
    .select('*')

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Analytics</h1>
        <p className="text-muted-foreground">Analyze your income, expenses, savings, and investments</p>
      </div>
      <AnalyticsDashboard transactions={transactions || []} accounts={accounts || []} />
    </div>
  )
}
