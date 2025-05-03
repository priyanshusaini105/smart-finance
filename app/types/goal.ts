/**
 * Goal Status
 */
export type GoalStatus = "in-progress" | "completed" | "paused"

/**
 * Goal Priority
 */
export type GoalPriority = "low" | "medium" | "high"

/**
 * Goal Interface
 */
export interface Goal {
  id: string
  name: string
  targetAmount: number
  currentAmount: number
  deadline?: string // ISO date string
  priority: GoalPriority
  status: GoalStatus
  description?: string
  emoji?: string // Optional emoji for visual identification
  createdAt: string
  updatedAt: string
}

/**
 * Goal Creation Input
 */
export interface GoalInput {
  name: string
  targetAmount: number
  currentAmount?: number
  deadline?: string
  priority?: GoalPriority
  description?: string
  emoji?: string
}

/**
 * Goal Progress
 */
export interface GoalProgress {
  goalId: string
  percentage: number
  remaining: number
  daysRemaining?: number
  requiredMonthlySaving: number
  onTrack: boolean
  milestoneReached?: number // 25, 50, 75, 100
}

/**
 * Goal Milestone
 */
export interface GoalMilestone {
  percentage: number
  label: string
  reached: boolean
  date?: string
}
