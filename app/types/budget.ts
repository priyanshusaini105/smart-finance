import { TransactionCategory } from "./transaction"

/**
 * Budget Period
 */
export type BudgetPeriod = "monthly" | "weekly" | "yearly"

/**
 * Budget Status
 */
export type BudgetStatus = "on-track" | "warning" | "exceeded"

/**
 * Budget Interface
 */
export interface Budget {
  id: string
  name: string
  amount: number
  spent: number
  category: TransactionCategory
  period: BudgetPeriod
  startDate: string // ISO date string
  endDate: string // ISO date string
  status: BudgetStatus
  alertThreshold: number // Percentage (e.g., 80)
  createdAt: string
  updatedAt: string
}

/**
 * Budget Creation Input
 */
export interface BudgetInput {
  name: string
  amount: number
  category: TransactionCategory
  period: BudgetPeriod
  alertThreshold?: number
}

/**
 * Budget Progress
 */
export interface BudgetProgress {
  budgetId: string
  percentage: number
  remaining: number
  daysRemaining: number
  isOverBudget: boolean
  projectedSpend: number
}
