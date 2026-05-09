import { createClient } from '@/lib/supabase/server'
import { AccountsManager } from '@/components/dashboard/accounts-manager'

export default async function AccountsPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  
  const { data: accounts } = await supabase
    .from('accounts')
    .select('*')
    .order('created_at', { ascending: true })

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Accounts</h1>
        <p className="text-muted-foreground">Manage your bank and demat accounts</p>
      </div>
      <AccountsManager accounts={accounts || []} userId={user!.id} />
    </div>
  )
}
