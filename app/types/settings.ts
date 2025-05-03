/**
 * Theme Mode
 */
export type ThemeMode = "light" | "dark" | "system"

/**
 * Currency Code
 */
export type CurrencyCode = "USD" | "EUR" | "GBP" | "INR" | "JPY" | "AUD" | "CAD"

/**
 * Notification Settings
 */
export interface NotificationSettings {
  budgetAlerts: boolean
  goalMilestones: boolean
  portfolioUpdates: boolean
  dailyReminders: boolean
  quietHoursEnabled: boolean
  quietHoursStart?: string // HH:MM format
  quietHoursEnd?: string // HH:MM format
}

/**
 * AI Settings
 */
export interface AISettings {
  enabled: boolean
  autoCategorize: boolean
  insightsEnabled: boolean
  predictionsEnabled: boolean
  apiKey?: string
}

/**
 * App Settings Interface
 */
export interface AppSettings {
  theme: ThemeMode
  currency: CurrencyCode
  notifications: NotificationSettings
  ai: AISettings
  biometricEnabled: boolean
  analyticsEnabled: boolean
  version: string
  createdAt: string
  updatedAt: string
}

/**
 * User Profile
 */
export interface UserProfile {
  name?: string
  email?: string
  avatar?: string
  monthlyIncome?: number
  financialGoals?: string[]
  createdAt: string
  updatedAt: string
}
