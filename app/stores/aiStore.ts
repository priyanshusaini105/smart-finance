/**
 * AI Store
 *
 * Manages AI-powered features: categorization, insights, predictions
 */

import { create } from "zustand"
import {
  categorizeTransaction,
  generateSpendingInsights,
  predictBudgetOutcome,
} from "@/services/ai/openaiService"
import { TransactionCategory } from "@/types"

interface AIState {
  // State
  isEnabled: boolean
  lastInsights: string[]
  lastUpdated: number | null
  isLoading: boolean
  error: string | null

  // Actions
  categorize: (
    description: string,
  ) => Promise<{ category: TransactionCategory; confidence: number } | null>
  generateInsights: (data: {
    currentMonthSpending: number
    lastMonthSpending: number
    budget: number
    categoryBreakdown: Record<string, number>
  }) => Promise<string[]>
  predictBudget: (data: {
    spentSoFar: number
    daysElapsed: number
    totalDays: number
    budget: number
  }) => Promise<{
    projectedSpend: number
    willExceed: boolean
    excessAmount: number
    confidence: number
  } | null>
  setEnabled: (enabled: boolean) => void
  clearError: () => void
}

export const useAIStore = create<AIState>((set, get) => ({
  // Initial state
  isEnabled: true,
  lastInsights: [],
  lastUpdated: null,
  isLoading: false,
  error: null,

  // Categorize transaction
  categorize: async (description: string) => {
    const { isEnabled } = get()

    if (!isEnabled) {
      return null
    }

    set({ isLoading: true, error: null })

    try {
      const result = await categorizeTransaction(description)
      set({ isLoading: false })
      return result
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Categorization failed"
      set({ isLoading: false, error: errorMessage })
      return null
    }
  },

  // Generate spending insights
  generateInsights: async (data) => {
    const { isEnabled } = get()

    if (!isEnabled) {
      return []
    }

    set({ isLoading: true, error: null })

    try {
      const insights = await generateSpendingInsights(data)
      set({
        lastInsights: insights,
        lastUpdated: Date.now(),
        isLoading: false,
      })
      return insights
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Insight generation failed"
      set({ isLoading: false, error: errorMessage })
      return []
    }
  },

  // Predict budget outcome
  predictBudget: async (data) => {
    const { isEnabled } = get()

    if (!isEnabled) {
      return null
    }

    set({ isLoading: true, error: null })

    try {
      const prediction = await predictBudgetOutcome(data)
      set({ isLoading: false })
      return prediction
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Budget prediction failed"
      set({ isLoading: false, error: errorMessage })
      return null
    }
  },

  // Toggle AI features
  setEnabled: (enabled: boolean) => {
    set({ isEnabled: enabled })
  },

  // Clear error
  clearError: () => {
    set({ error: null })
  },
}))
