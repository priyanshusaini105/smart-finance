import { format, parseISO, isToday, isYesterday, differenceInDays, startOfMonth, endOfMonth, startOfWeek, endOfWeek, addDays, subDays, subMonths } from "date-fns"

/**
 * Format date for display
 */
export function formatDate(date: string | Date, formatString: string = "MMM dd, yyyy"): string {
  const dateObj = typeof date === "string" ? parseISO(date) : date
  return format(dateObj, formatString)
}

/**
 * Format date relative (Today, Yesterday, or date)
 */
export function formatRelativeDate(date: string | Date): string {
  const dateObj = typeof date === "string" ? parseISO(date) : date
  
  if (isToday(dateObj)) {
    return "Today"
  }
  if (isYesterday(dateObj)) {
    return "Yesterday"
  }
  
  return formatDate(dateObj, "MMM dd")
}

/**
 * Format transaction time
 */
export function formatTransactionDate(date: string | Date): string {
  const dateObj = typeof date === "string" ? parseISO(date) : date
  
  if (isToday(dateObj)) {
    return `Today, ${format(dateObj, "h:mm a")}`
  }
  if (isYesterday(dateObj)) {
    return `Yesterday, ${format(dateObj, "h:mm a")}`
  }
  
  return formatDate(dateObj, "MMM dd, h:mm a")
}

/**
 * Get days until date
 */
export function getDaysUntil(targetDate: string | Date): number {
  const target = typeof targetDate === "string" ? parseISO(targetDate) : targetDate
  return differenceInDays(target, new Date())
}

/**
 * Get current month date range
 */
export function getCurrentMonthRange(): { start: Date; end: Date } {
  const now = new Date()
  return {
    start: startOfMonth(now),
    end: endOfMonth(now),
  }
}

/**
 * Get current week date range
 */
export function getCurrentWeekRange(): { start: Date; end: Date } {
  const now = new Date()
  return {
    start: startOfWeek(now, { weekStartsOn: 1 }), // Monday
    end: endOfWeek(now, { weekStartsOn: 1 }),
  }
}

/**
 * Get previous month date range
 */
export function getPreviousMonthRange(): { start: Date; end: Date } {
  const lastMonth = subMonths(new Date(), 1)
  return {
    start: startOfMonth(lastMonth),
    end: endOfMonth(lastMonth),
  }
}

/**
 * Get date range for period
 */
export function getDateRangeForPeriod(
  period: "daily" | "weekly" | "monthly",
  date: Date = new Date(),
): { start: Date; end: Date } {
  switch (period) {
    case "daily":
      return { start: date, end: date }
    case "weekly":
      return {
        start: startOfWeek(date, { weekStartsOn: 1 }),
        end: endOfWeek(date, { weekStartsOn: 1 }),
      }
    case "monthly":
      return {
        start: startOfMonth(date),
        end: endOfMonth(date),
      }
    default:
      return { start: date, end: date }
  }
}

/**
 * Get last N days
 */
export function getLastNDays(n: number): Date[] {
  const days: Date[] = []
  for (let i = n - 1; i >= 0; i--) {
    days.push(subDays(new Date(), i))
  }
  return days
}

/**
 * Get next N days
 */
export function getNextNDays(n: number): Date[] {
  const days: Date[] = []
  for (let i = 0; i < n; i++) {
    days.push(addDays(new Date(), i))
  }
  return days
}

/**
 * Convert date to ISO string
 */
export function toISOString(date: Date): string {
  return date.toISOString()
}

/**
 * Parse ISO string to Date
 */
export function fromISOString(isoString: string): Date {
  return parseISO(isoString)
}

/**
 * Format duration in days
 */
export function formatDuration(days: number): string {
  if (days === 0) return "Today"
  if (days === 1) return "1 day"
  if (days < 30) return `${days} days`
  if (days < 365) return `${Math.floor(days / 30)} months`
  return `${Math.floor(days / 365)} years`
}
