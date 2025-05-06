/**
 * Central export for all Zustand stores
 */

import { useTransactionStore } from "./transactionStore"
import { useBudgetStore } from "./budgetStore"
import { useGoalStore } from "./goalStore"
import { usePortfolioStore } from "./portfolioStore"
import { useSettingsStore } from "./settingsStore"
import { useAIStore } from "./aiStore"

export { useTransactionStore } from "./transactionStore"
export { useBudgetStore } from "./budgetStore"
export { useGoalStore } from "./goalStore"
export { usePortfolioStore } from "./portfolioStore"
export { useSettingsStore } from "./settingsStore"
export { useAIStore } from "./aiStore"

/**
 * Initialize all stores
 * Call this once at app startup to load persisted data
 */
export function initializeStores() {
  useTransactionStore.getState().loadTransactions()
  useBudgetStore.getState().loadBudgets()
  useGoalStore.getState().loadGoals()
  usePortfolioStore.getState().loadAssets()
  useSettingsStore.getState().loadSettings()
  // AI store doesn't need initialization
}
