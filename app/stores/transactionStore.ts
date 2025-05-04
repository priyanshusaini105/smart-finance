/**
 * Transaction Store
 *
 * Manages all transaction-related state and operations
 * Uses Zustand for state management and MMKV for persistence
 */

import { create } from "zustand"
import { Transaction, TransactionInput, TransactionFilter, TransactionStats } from "@/types"
import { getItem, setItem, StorageKeys } from "../services/storage/mmkvStorage"
import { startOfMonth, endOfMonth, isWithinInterval, parseISO } from "date-fns"

interface TransactionState {
  transactions: Transaction[]
  isLoading: boolean
  error: string | null

  // Actions
  loadTransactions: () => void
  addTransaction: (input: TransactionInput) => Transaction
  updateTransaction: (id: string, updates: Partial<Transaction>) => void
  deleteTransaction: (id: string) => void
  getTransaction: (id: string) => Transaction | undefined
  filterTransactions: (filter: TransactionFilter) => Transaction[]
  getTransactionStats: (startDate?: string, endDate?: string) => TransactionStats
  clearTransactions: () => void
}

export const useTransactionStore = create<TransactionState>((set, get) => ({
  transactions: [],
  isLoading: false,
  error: null,

  /**
   * Load transactions from storage
   */
  loadTransactions: () => {
    set({ isLoading: true })
    try {
      const stored = getItem<Transaction[]>(StorageKeys.TRANSACTIONS)
      set({ transactions: stored || [], isLoading: false })
    } catch (error) {
      set({ error: "Failed to load transactions", isLoading: false })
    }
  },

  /**
   * Add a new transaction
   */
  addTransaction: (input: TransactionInput) => {
    const newTransaction: Transaction = {
      id: `txn_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      amount: input.amount,
      type: input.type,
      category: input.category || "other",
      description: input.description,
      date: input.date || new Date().toISOString(),
      notes: input.notes,
      aiCategorized: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    const transactions = [...get().transactions, newTransaction]
    set({ transactions })
    setItem(StorageKeys.TRANSACTIONS, transactions)

    return newTransaction
  },

  /**
   * Update an existing transaction
   */
  updateTransaction: (id: string, updates: Partial<Transaction>) => {
    const transactions = get().transactions.map((txn) =>
      txn.id === id
        ? {
            ...txn,
            ...updates,
            updatedAt: new Date().toISOString(),
          }
        : txn,
    )

    set({ transactions })
    setItem(StorageKeys.TRANSACTIONS, transactions)
  },

  /**
   * Delete a transaction
   */
  deleteTransaction: (id: string) => {
    const transactions = get().transactions.filter((txn) => txn.id !== id)
    set({ transactions })
    setItem(StorageKeys.TRANSACTIONS, transactions)
  },

  /**
   * Get a single transaction by ID
   */
  getTransaction: (id: string) => {
    return get().transactions.find((txn) => txn.id === id)
  },

  /**
   * Filter transactions based on criteria
   */
  filterTransactions: (filter: TransactionFilter) => {
    let filtered = [...get().transactions]

    // Filter by date range
    if (filter.startDate && filter.endDate) {
      const start = parseISO(filter.startDate)
      const end = parseISO(filter.endDate)
      filtered = filtered.filter((txn) => isWithinInterval(parseISO(txn.date), { start, end }))
    }

    // Filter by category
    if (filter.category) {
      filtered = filtered.filter((txn) => txn.category === filter.category)
    }

    // Filter by type
    if (filter.type) {
      filtered = filtered.filter((txn) => txn.type === filter.type)
    }

    // Filter by amount range
    if (filter.minAmount !== undefined) {
      filtered = filtered.filter((txn) => txn.amount >= filter.minAmount!)
    }
    if (filter.maxAmount !== undefined) {
      filtered = filtered.filter((txn) => txn.amount <= filter.maxAmount!)
    }

    // Filter by search term
    if (filter.searchTerm) {
      const term = filter.searchTerm.toLowerCase()
      filtered = filtered.filter(
        (txn) =>
          txn.description.toLowerCase().includes(term) ||
          txn.notes?.toLowerCase().includes(term) ||
          txn.category.toLowerCase().includes(term),
      )
    }

    // Sort by date (newest first)
    return filtered.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  },

  /**
   * Get transaction statistics
   */
  getTransactionStats: (startDate?: string, endDate?: string) => {
    let transactions = get().transactions

    // Filter by date range if provided, otherwise use current month
    if (startDate && endDate) {
      const start = parseISO(startDate)
      const end = parseISO(endDate)
      transactions = transactions.filter((txn) =>
        isWithinInterval(parseISO(txn.date), { start, end }),
      )
    } else {
      const now = new Date()
      const start = startOfMonth(now)
      const end = endOfMonth(now)
      transactions = transactions.filter((txn) =>
        isWithinInterval(parseISO(txn.date), { start, end }),
      )
    }

    // Calculate totals
    const totalExpenses = transactions
      .filter((txn) => txn.type === "expense")
      .reduce((sum, txn) => sum + txn.amount, 0)

    const totalIncome = transactions
      .filter((txn) => txn.type === "income")
      .reduce((sum, txn) => sum + txn.amount, 0)

    const netBalance = totalIncome - totalExpenses

    const transactionCount = transactions.length

    const expenseTransactions = transactions.filter((txn) => txn.type === "expense")
    const averageExpense =
      expenseTransactions.length > 0 ? totalExpenses / expenseTransactions.length : 0

    // Category breakdown (expenses only)
    const categoryBreakdown = expenseTransactions.reduce(
      (acc, txn) => {
        acc[txn.category] = (acc[txn.category] || 0) + txn.amount
        return acc
      },
      {} as Record<string, number>,
    )

    return {
      totalExpenses,
      totalIncome,
      netBalance,
      transactionCount,
      averageExpense,
      categoryBreakdown,
    }
  },

  /**
   * Clear all transactions (for testing/reset)
   */
  clearTransactions: () => {
    set({ transactions: [] })
    setItem(StorageKeys.TRANSACTIONS, [])
  },
}))

// Initialize by loading transactions on app start
if (typeof window !== "undefined") {
  setTimeout(() => {
    useTransactionStore.getState().loadTransactions()
  }, 100)
}
