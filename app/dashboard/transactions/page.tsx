import { createClient } from '@/lib/supabase/server'
import { TransactionsList } from '@/components/dashboard/transactions-list'
import { AddTransactionDialog } from '@/components/dashboard/add-transaction-dialog'

export default async function TransactionsPage() {
  const supabase = await createClient()
  
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

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Transactions</h1>
          <p className="text-muted-foreground">View and manage all your transactions</p>
        </div>
        <AddTransactionDialog accounts={accounts || []} categories={categories || []} />
      </div>
      <TransactionsList 
        transactions={transactions || []} 
        accounts={accounts || []} 
        categories={categories || []} 
      />
    </div>
  )
}
