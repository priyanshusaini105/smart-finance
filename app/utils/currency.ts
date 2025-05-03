import { CurrencyCode } from "../types"

/**
 * Currency symbols mapping
 */
export const CURRENCY_SYMBOLS: Record<CurrencyCode, string> = {
  USD: "$",
  EUR: "€",
  GBP: "£",
  INR: "₹",
  JPY: "¥",
  AUD: "A$",
  CAD: "C$",
}

/**
 * Currency decimal places
 */
export const CURRENCY_DECIMALS: Record<CurrencyCode, number> = {
  USD: 2,
  EUR: 2,
  GBP: 2,
  INR: 2,
  JPY: 0,
  AUD: 2,
  CAD: 2,
}

/**
 * Format amount as currency
 */
export function formatCurrency(
  amount: number,
  currency: CurrencyCode = "USD",
  options?: {
    showSymbol?: boolean
    showCode?: boolean
    compact?: boolean
  },
): string {
  const { showSymbol = true, showCode = false, compact = false } = options || {}

  const decimals = CURRENCY_DECIMALS[currency]
  const symbol = CURRENCY_SYMBOLS[currency]

  // Format with compact notation for large numbers
  if (compact && Math.abs(amount) >= 1000) {
    return formatCompactCurrency(amount, currency, showSymbol)
  }

  // Format the number
  const formatted = amount.toFixed(decimals).replace(/\B(?=(\d{3})+(?!\d))/g, ",")

  // Build the result
  let result = ""
  if (showSymbol) {
    result += symbol
  }
  result += formatted
  if (showCode) {
    result += ` ${currency}`
  }

  return result
}

/**
 * Format currency in compact notation (1.2K, 3.5M)
 */
function formatCompactCurrency(
  amount: number,
  currency: CurrencyCode,
  showSymbol: boolean,
): string {
  const symbol = showSymbol ? CURRENCY_SYMBOLS[currency] : ""
  const abs = Math.abs(amount)
  const sign = amount < 0 ? "-" : ""

  if (abs >= 1_000_000_000) {
    return `${sign}${symbol}${(abs / 1_000_000_000).toFixed(1)}B`
  }
  if (abs >= 1_000_000) {
    return `${sign}${symbol}${(abs / 1_000_000).toFixed(1)}M`
  }
  if (abs >= 1_000) {
    return `${sign}${symbol}${(abs / 1_000).toFixed(1)}K`
  }

  return formatCurrency(amount, currency, { showSymbol })
}

/**
 * Parse currency string to number
 */
export function parseCurrency(value: string): number {
  // Remove currency symbols, commas, and spaces
  const cleaned = value.replace(/[^\d.-]/g, "")
  return parseFloat(cleaned) || 0
}

/**
 * Format percentage
 */
export function formatPercentage(value: number, decimals: number = 1): string {
  return `${value.toFixed(decimals)}%`
}

/**
 * Format number with sign (+ or -)
 */
export function formatNumberWithSign(value: number, decimals: number = 2): string {
  const sign = value >= 0 ? "+" : ""
  return `${sign}${value.toFixed(decimals)}`
}

/**
 * Get color for amount (green for positive, red for negative)
 */
export function getAmountColor(amount: number): string {
  return amount >= 0 ? "#22C55E" : "#EF4444"
}

/**
 * Calculate percentage change
 */
export function calculatePercentageChange(oldValue: number, newValue: number): number {
  if (oldValue === 0) return 0
  return ((newValue - oldValue) / Math.abs(oldValue)) * 100
}
