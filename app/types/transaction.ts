/**
 * Transaction Category Types
 */
export type TransactionCategory =
  | "groceries"
  | "dining"
  | "transport"
  | "shopping"
  | "bills"
  | "entertainment"
  | "health"
  | "education"
  | "travel"
  | "income"
  | "investment"
  | "other"

/**
 * Transaction Type
 */
export type TransactionType = "expense" | "income"

/**
 * Transaction Interface
 */
export interface Transaction {
  id: string
  amount: number
  type: TransactionType
  category: TransactionCategory
  description: string
  date: string // ISO date string
  notes?: string
  aiCategorized?: boolean
  aiConfidence?: number
  createdAt: string
  updatedAt: string
}

/**
 * Transaction Creation Input
 */
export interface TransactionInput {
  amount: number
  type: TransactionType
  category?: TransactionCategory
  description: string
  date?: string
  notes?: string
}

/**
 * Transaction Filter Options
 */
export interface TransactionFilter {
  startDate?: string
  endDate?: string
  category?: TransactionCategory
  type?: TransactionType
  minAmount?: number
  maxAmount?: number
  searchTerm?: string
}

/**
 * Transaction Statistics
 */
export interface TransactionStats {
  totalExpenses: number
  totalIncome: number
  netBalance: number
  transactionCount: number
  averageExpense: number
  categoryBreakdown: Record<TransactionCategory, number>
}
