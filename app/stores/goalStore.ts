/**
 * Goal Store
 *
 * Manages financial goals state and operations
 */

import { create } from "zustand"
import { Goal, GoalInput, GoalProgress } from "@/types"
import { getItem, setItem, StorageKeys } from "../services/storage/mmkvStorage"
import { differenceInDays, parseISO } from "date-fns"

interface GoalState {
  goals: Goal[]
  isLoading: boolean

  // Actions
  loadGoals: () => void
  addGoal: (input: GoalInput) => Goal
  updateGoal: (id: string, updates: Partial<Goal>) => void
  deleteGoal: (id: string) => void
  getGoal: (id: string) => Goal | undefined
  getGoalProgress: (goalId: string) => GoalProgress | null
  addToGoal: (goalId: string, amount: number) => void
  getActiveGoals: () => Goal[]
}

export const useGoalStore = create<GoalState>((set, get) => ({
  goals: [],
  isLoading: false,

  /**
   * Load goals from storage
   */
  loadGoals: () => {
    set({ isLoading: true })
    const stored = getItem<Goal[]>(StorageKeys.GOALS)
    set({ goals: stored || [], isLoading: false })
  },

  /**
   * Add a new goal
   */
  addGoal: (input: GoalInput) => {
    const newGoal: Goal = {
      id: `goal_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      name: input.name,
      targetAmount: input.targetAmount,
      currentAmount: input.currentAmount || 0,
      deadline: input.deadline || "",
      status: "in-progress",
      priority: input.priority || "medium",
      description: input.description,
      emoji: input.emoji,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    const goals = [...get().goals, newGoal]
    set({ goals })
    setItem(StorageKeys.GOALS, goals)

    return newGoal
  },

  /**
   * Update an existing goal
   */
  updateGoal: (id: string, updates: Partial<Goal>) => {
    const goals = get().goals.map((goal) =>
      goal.id === id
        ? {
            ...goal,
            ...updates,
            updatedAt: new Date().toISOString(),
          }
        : goal,
    )

    set({ goals })
    setItem(StorageKeys.GOALS, goals)
  },

  /**
   * Delete a goal
   */
  deleteGoal: (id: string) => {
    const goals = get().goals.filter((goal) => goal.id !== id)
    set({ goals })
    setItem(StorageKeys.GOALS, goals)
  },

  /**
   * Get a single goal by ID
   */
  getGoal: (id: string) => {
    return get().goals.find((goal) => goal.id === id)
  },

  /**
   * Get goal progress
   */
  getGoalProgress: (goalId: string): GoalProgress | null => {
    const goal = get().getGoal(goalId)
    if (!goal) return null

    const percentage = (goal.currentAmount / goal.targetAmount) * 100
    const remaining = goal.targetAmount - goal.currentAmount
    const isCompleted = goal.currentAmount >= goal.targetAmount

    let daysRemaining: number | undefined
    let requiredMonthlySaving = 0
    let onTrack = true

    if (goal.deadline) {
      daysRemaining = differenceInDays(parseISO(goal.deadline), new Date())
      const monthsRemaining = daysRemaining / 30

      if (monthsRemaining > 0) {
        requiredMonthlySaving = remaining / monthsRemaining

        // Calculate if on track (simplified)
        const daysElapsed = differenceInDays(new Date(), parseISO(goal.createdAt))
        const expectedProgress =
          daysElapsed > 0 ? (daysElapsed / (daysElapsed + daysRemaining)) * 100 : 0
        onTrack = percentage >= expectedProgress * 0.8 // 80% of expected progress
      }
    }

    return {
      goalId,
      percentage,
      remaining,
      daysRemaining,
      requiredMonthlySaving,
      onTrack,
    }
  },

  /**
   * Add money to a goal
   */
  addToGoal: (goalId: string, amount: number) => {
    const goal = get().getGoal(goalId)
    if (!goal) return

    const newAmount = goal.currentAmount + amount
    const updates: Partial<Goal> = {
      currentAmount: newAmount,
    }

    // Update status if goal is completed
    if (newAmount >= goal.targetAmount) {
      updates.status = "completed"
    }

    get().updateGoal(goalId, updates)
  },

  /**
   * Get active goals (not completed or cancelled)
   */
  getActiveGoals: () => {
    return get().goals.filter((goal) => goal.status === "in-progress")
  },
}))

// Initialize by loading goals
if (typeof window !== "undefined") {
  setTimeout(() => {
    useGoalStore.getState().loadGoals()
  }, 100)
}
