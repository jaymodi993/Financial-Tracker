'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Category } from '@/lib/types'
import { 
  Plus, 
  Pencil, 
  Trash2,
  ShoppingCart,
  Utensils,
  Car,
  Home,
  Zap,
  Smartphone,
  Heart,
  GraduationCap,
  Plane,
  Gift,
  Briefcase,
  TrendingUp,
  PiggyBank,
  Banknote,
  Building2,
  Wallet,
  CreditCard,
  Package,
  Film,
  Music,
  Dumbbell,
  Coffee,
  Beer,
  Scissors,
  Stethoscope,
  Baby,
  Dog,
  Fuel
} from 'lucide-react'
import { useRouter } from 'next/navigation'

type CategoryType = 'income' | 'expense' | 'savings' | 'investment'

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  'shopping-cart': ShoppingCart,
  'utensils': Utensils,
  'car': Car,
  'home': Home,
  'zap': Zap,
  'smartphone': Smartphone,
  'heart': Heart,
  'graduation-cap': GraduationCap,
  'plane': Plane,
  'gift': Gift,
  'briefcase': Briefcase,
  'trending-up': TrendingUp,
  'piggy-bank': PiggyBank,
  'banknote': Banknote,
  'building-2': Building2,
  'wallet': Wallet,
  'credit-card': CreditCard,
  'package': Package,
  'film': Film,
  'music': Music,
  'dumbbell': Dumbbell,
  'coffee': Coffee,
  'beer': Beer,
  'scissors': Scissors,
  'stethoscope': Stethoscope,
  'baby': Baby,
  'dog': Dog,
  'fuel': Fuel,
}

const availableIcons = Object.keys(iconMap)

const typeColors: Record<CategoryType, string> = {
  income: 'bg-emerald-100 text-emerald-700 border-emerald-200',
  expense: 'bg-red-100 text-red-700 border-red-200',
  savings: 'bg-blue-100 text-blue-700 border-blue-200',
  investment: 'bg-purple-100 text-purple-700 border-purple-200',
}

export function CategoriesManager({ categories }: { categories: Category[] }) {
  const [isAddOpen, setIsAddOpen] = useState(false)
  const [editCategory, setEditCategory] = useState<Category | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  // Form state
  const [name, setName] = useState('')
  const [type, setType] = useState<CategoryType>('expense')
  const [icon, setIcon] = useState('shopping-cart')

  const resetForm = () => {
    setName('')
    setType('expense')
    setIcon('shopping-cart')
    setError(null)
  }

  const handleAdd = async (e: React.FormEvent) => {
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
      const { error: insertError } = await supabase.from('categories').insert({
        user_id: user.id,
        name: name.trim(),
        type,
        icon,
      })

      if (insertError) throw insertError

      resetForm()
      setIsAddOpen(false)
      router.refresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add category')
    } finally {
      setIsLoading(false)
    }
  }

  const handleEdit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!editCategory) return

    setIsLoading(true)
    setError(null)

    const supabase = createClient()

    try {
      const { error: updateError } = await supabase
        .from('categories')
        .update({
          name: name.trim(),
          type,
          icon,
        })
        .eq('id', editCategory.id)

      if (updateError) throw updateError

      resetForm()
      setEditCategory(null)
      router.refresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update category')
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async (categoryId: string) => {
    const supabase = createClient()

    try {
      const { error: deleteError } = await supabase
        .from('categories')
        .delete()
        .eq('id', categoryId)

      if (deleteError) throw deleteError
      router.refresh()
    } catch (err) {
      console.error('Failed to delete category:', err)
    }
  }

  const openEditDialog = (category: Category) => {
    setName(category.name)
    setType(category.type)
    setIcon(category.icon || 'shopping-cart')
    setEditCategory(category)
  }

  const closeEditDialog = () => {
    resetForm()
    setEditCategory(null)
  }

  const getCategoriesByType = (categoryType: CategoryType) => {
    return categories.filter((c) => c.type === categoryType)
  }

  const CategoryCard = ({ category }: { category: Category }) => {
    const IconComponent = iconMap[category.icon || 'shopping-cart'] || ShoppingCart
    
    return (
      <div className="flex items-center justify-between p-4 rounded-lg border bg-card hover:shadow-sm transition-shadow">
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-lg ${typeColors[category.type]}`}>
            <IconComponent className="h-5 w-5" />
          </div>
          <div>
            <p className="font-medium text-foreground">{category.name}</p>
            <p className="text-sm text-muted-foreground capitalize">{category.type}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => openEditDialog(category)}
          >
            <Pencil className="h-4 w-4" />
          </Button>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive">
                <Trash2 className="h-4 w-4" />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Delete Category</AlertDialogTitle>
                <AlertDialogDescription>
                  Are you sure you want to delete &quot;{category.name}&quot;? This action cannot be undone. 
                  Transactions using this category will have their category set to none.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={() => handleDelete(category.id)}
                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                >
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
    )
  }

  const CategoryForm = ({ onSubmit, submitLabel }: { onSubmit: (e: React.FormEvent) => void; submitLabel: string }) => (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="grid gap-2">
        <Label htmlFor="name">Category Name</Label>
        <Input
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g., Groceries, Rent, Salary"
          required
        />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="type">Type</Label>
        <Select value={type} onValueChange={(v) => setType(v as CategoryType)}>
          <SelectTrigger id="type">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="expense">Expense</SelectItem>
            <SelectItem value="income">Income</SelectItem>
            <SelectItem value="savings">Savings</SelectItem>
            <SelectItem value="investment">Investment</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-2">
        <Label>Icon</Label>
        <div className="grid grid-cols-7 gap-2 p-3 border rounded-lg max-h-40 overflow-y-auto">
          {availableIcons.map((iconKey) => {
            const IconComp = iconMap[iconKey]
            return (
              <button
                key={iconKey}
                type="button"
                onClick={() => setIcon(iconKey)}
                className={`p-2 rounded-md transition-colors ${
                  icon === iconKey
                    ? 'bg-primary text-primary-foreground'
                    : 'hover:bg-accent'
                }`}
              >
                <IconComp className="h-5 w-5" />
              </button>
            )
          })}
        </div>
      </div>

      {error && <p className="text-sm text-destructive">{error}</p>}

      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? 'Saving...' : submitLabel}
      </Button>
    </form>
  )

  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <Dialog open={isAddOpen} onOpenChange={(open) => {
          setIsAddOpen(open)
          if (!open) resetForm()
        }}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Category
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Category</DialogTitle>
              <DialogDescription>
                Create a new category to organize your transactions
              </DialogDescription>
            </DialogHeader>
            <CategoryForm onSubmit={handleAdd} submitLabel="Add Category" />
          </DialogContent>
        </Dialog>
      </div>

      {/* Edit Dialog */}
      <Dialog open={!!editCategory} onOpenChange={(open) => {
        if (!open) closeEditDialog()
      }}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Category</DialogTitle>
            <DialogDescription>
              Update the category details
            </DialogDescription>
          </DialogHeader>
          <CategoryForm onSubmit={handleEdit} submitLabel="Save Changes" />
        </DialogContent>
      </Dialog>

      <Tabs defaultValue="expense" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="expense" className="gap-2">
            <ShoppingCart className="h-4 w-4 hidden sm:block" />
            Expense
          </TabsTrigger>
          <TabsTrigger value="income" className="gap-2">
            <Banknote className="h-4 w-4 hidden sm:block" />
            Income
          </TabsTrigger>
          <TabsTrigger value="savings" className="gap-2">
            <PiggyBank className="h-4 w-4 hidden sm:block" />
            Savings
          </TabsTrigger>
          <TabsTrigger value="investment" className="gap-2">
            <TrendingUp className="h-4 w-4 hidden sm:block" />
            Investment
          </TabsTrigger>
        </TabsList>

        {(['expense', 'income', 'savings', 'investment'] as CategoryType[]).map((categoryType) => {
          const typeCats = getCategoriesByType(categoryType)
          return (
            <TabsContent key={categoryType} value={categoryType}>
              <Card>
                <CardHeader>
                  <CardTitle className="capitalize">{categoryType} Categories</CardTitle>
                  <CardDescription>
                    {typeCats.length} {typeCats.length === 1 ? 'category' : 'categories'}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {typeCats.length === 0 ? (
                    <div className="text-center py-8 text-muted-foreground">
                      <p>No {categoryType} categories yet.</p>
                      <p className="text-sm mt-1">Click &quot;Add Category&quot; to create one.</p>
                    </div>
                  ) : (
                    <div className="grid gap-3">
                      {typeCats.map((category) => (
                        <CategoryCard key={category.id} category={category} />
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          )
        })}
      </Tabs>
    </div>
  )
}
