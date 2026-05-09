export type Account = {
  id: string
  user_id: string
  name: string
  type: 'bank' | 'demat'
  balance: number
  currency: string
  created_at: string
  updated_at: string
}

export type Category = {
  id: string
  user_id: string
  name: string
  type: 'income' | 'expense' | 'savings' | 'investment'
  icon: string | null
  created_at: string
}

export type Transaction = {
  id: string
  user_id: string
  account_id: string
  category_id: string | null
  type: 'income' | 'expense' | 'savings' | 'investment' | 'transfer'
  amount: number
  description: string | null
  date: string
  created_at: string
  updated_at: string
}

export type TransactionWithDetails = Transaction & {
  accounts?: Account
  categories?: Category
}

export type MonthlyData = {
  month: string
  income: number
  expense: number
  savings: number
  investment: number
}

export type YearlyData = {
  year: number
  income: number
  expense: number
  savings: number
  investment: number
}
