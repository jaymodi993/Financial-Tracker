import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { CategoriesManager } from '@/components/dashboard/categories-manager'

export default async function CategoriesPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/auth/login')
  }

  const { data: categories } = await supabase
    .from('categories')
    .select('*')
    .eq('user_id', user.id)
    .order('type', { ascending: true })
    .order('name', { ascending: true })

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">Categories</h1>
        <p className="text-muted-foreground mt-1">
          Manage your expense, income, savings, and investment categories
        </p>
      </div>
      <CategoriesManager categories={categories || []} />
    </div>
  )
}
