/**
 * Central export for all TypeScript types
 */

export * from "./transaction"
export * from "./budget"
export * from "./goal"
export * from "./portfolio"
export * from "./settings"

/**
 * Chart Data Types
 */
export interface ChartDataPoint {
  x: string | number
  y: number
  label?: string
}

export interface PieChartData {
  label: string
  value: number
  color: string
  percentage: number
}

/**
 * Insight Type
 */
export interface AIInsight {
  id: string
  type: "spending" | "saving" | "budget" | "goal" | "portfolio"
  title: string
  message: string
  severity: "info" | "warning" | "success"
  actionable: boolean
  action?: {
    label: string
    route?: string
  }
  createdAt: string
}

/**
 * Time Period for Analytics
 */
export type TimePeriod = "daily" | "weekly" | "monthly" | "yearly" | "custom"

/**
 * Analytics Filter
 */
export interface AnalyticsFilter {
  period: TimePeriod
  startDate?: string
  endDate?: string
}
