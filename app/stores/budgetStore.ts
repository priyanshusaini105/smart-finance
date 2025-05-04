/**
 * Budget Store
 *
 * Manages budget-related state and operations
 */

import { create } from "zustand"
import { Budget, BudgetInput, BudgetProgress } from "@/types"
import { getItem, setItem, StorageKeys } from "../services/storage/mmkvStorage"
import { useTransactionStore } from "./transactionStore"
import { startOfMonth, endOfMonth, differenceInDays, parseISO, addWeeks, addYears } from "date-fns"

interface BudgetState {
  budgets: Budget[]
  isLoading: boolean

  // Actions
  loadBudgets: () => void
  addBudget: (input: BudgetInput) => Budget
  updateBudget: (id: string, updates: Partial<Budget>) => void
  deleteBudget: (id: string) => void
  getBudget: (id: string) => Budget | undefined
  getBudgetProgress: (budgetId: string) => BudgetProgress | null
  getActiveBudgets: () => Budget[]
  refreshBudgetSpending: () => void
}

export const useBudgetStore = create<BudgetState>((set, get) => ({
  budgets: [],
  isLoading: false,

  /**
   * Load budgets from storage
   */
  loadBudgets: () => {
    set({ isLoading: true })
    const stored = getItem<Budget[]>(StorageKeys.BUDGETS)
    set({ budgets: stored || [], isLoading: false })
  },

  /**
   * Add a new budget
   */
  addBudget: (input: BudgetInput) => {
    const now = new Date()
    const startDate = startOfMonth(now)
    let endDate = endOfMonth(now)

    // Calculate dates based on period
    if (input.period === "weekly") {
      endDate = addWeeks(startDate, 1)
    } else if (input.period === "yearly") {
      endDate = addYears(startDate, 1)
    }

    const newBudget: Budget = {
      id: `budget_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      name: input.name,
      amount: input.amount,
      spent: 0,
      category: input.category,
      period: input.period,
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
      status: "on-track",
      alertThreshold: input.alertThreshold || 80,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    const budgets = [...get().budgets, newBudget]
    set({ budgets })
    setItem(StorageKeys.BUDGETS, budgets)

    return newBudget
  },

  /**
   * Update an existing budget
   */
  updateBudget: (id: string, updates: Partial<Budget>) => {
    const budgets = get().budgets.map((budget) =>
      budget.id === id
        ? {
            ...budget,
            ...updates,
            updatedAt: new Date().toISOString(),
          }
        : budget,
    )

    set({ budgets })
    setItem(StorageKeys.BUDGETS, budgets)
  },

  /**
   * Delete a budget
   */
  deleteBudget: (id: string) => {
    const budgets = get().budgets.filter((budget) => budget.id !== id)
    set({ budgets })
    setItem(StorageKeys.BUDGETS, budgets)
  },

  /**
   * Get a single budget by ID
   */
  getBudget: (id: string) => {
    return get().budgets.find((budget) => budget.id === id)
  },

  /**
   * Get budget progress
   */
  getBudgetProgress: (budgetId: string): BudgetProgress | null => {
    const budget = get().getBudget(budgetId)
    if (!budget) return null

    const percentage = (budget.spent / budget.amount) * 100
    const remaining = budget.amount - budget.spent
    const daysRemaining = differenceInDays(parseISO(budget.endDate), new Date())
    const isOverBudget = budget.spent > budget.amount

    // Simple projection based on daily average
    const start = parseISO(budget.startDate)
    const daysSinceStart = differenceInDays(new Date(), start)
    const dailyAverage = daysSinceStart > 0 ? budget.spent / daysSinceStart : 0
    const totalDays = differenceInDays(parseISO(budget.endDate), start)
    const projectedSpend = dailyAverage * totalDays

    return {
      budgetId,
      percentage,
      remaining,
      daysRemaining,
      isOverBudget,
      projectedSpend,
    }
  },

  /**
   * Get active budgets (not expired)
   */
  getActiveBudgets: () => {
    const now = new Date()
    return get().budgets.filter((budget) => parseISO(budget.endDate) >= now)
  },

  /**
   * Refresh spending for all budgets based on transactions
   */
  refreshBudgetSpending: () => {
    const transactionStore = useTransactionStore.getState()
    const budgets = get().budgets.map((budget) => {
      // Get transactions for this budget's category and period
      const transactions = transactionStore.filterTransactions({
        startDate: budget.startDate,
        endDate: budget.endDate,
        category: budget.category,
        type: "expense",
      })

      const spent = transactions.reduce((sum, txn) => sum + txn.amount, 0)
      const percentage = (spent / budget.amount) * 100

      // Determine status
      let status: Budget["status"] = "on-track"
      if (percentage >= 100) {
        status = "exceeded"
      } else if (percentage >= budget.alertThreshold) {
        status = "warning"
      }

      return {
        ...budget,
        spent,
        status,
        updatedAt: new Date().toISOString(),
      }
    })

    set({ budgets })
    setItem(StorageKeys.BUDGETS, budgets)
  },
}))

// Initialize by loading budgets
if (typeof window !== "undefined") {
  setTimeout(() => {
    useBudgetStore.getState().loadBudgets()
  }, 100)
}
