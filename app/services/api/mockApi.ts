/**
 * Mock API Service
 *
 * This service provides mock implementations of external APIs
 * for development and testing without requiring actual API keys.
 *
 * Toggle between mock and real APIs using the MOCK_API constant.
 */

import { TransactionCategory } from "@/types/transaction"

// Configuration
export const MOCK_API = true // Set to false to use real APIs

/**
 * Mock OpenAI Response for Transaction Categorization
 */
export const mockCategorizeTransaction = async (
  description: string,
): Promise<{ category: TransactionCategory; confidence: number }> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 300))

  const descriptionLower = description.toLowerCase()

  // Rule-based categorization logic
  if (
    descriptionLower.includes("grocery") ||
    descriptionLower.includes("supermarket") ||
    descriptionLower.includes("walmart") ||
    descriptionLower.includes("target")
  ) {
    return { category: "groceries", confidence: 0.92 }
  }

  if (
    descriptionLower.includes("restaurant") ||
    descriptionLower.includes("cafe") ||
    descriptionLower.includes("starbucks") ||
    descriptionLower.includes("mcdonald") ||
    descriptionLower.includes("pizza") ||
    descriptionLower.includes("food")
  ) {
    return { category: "dining", confidence: 0.88 }
  }

  if (
    descriptionLower.includes("uber") ||
    descriptionLower.includes("lyft") ||
    descriptionLower.includes("taxi") ||
    descriptionLower.includes("gas") ||
    descriptionLower.includes("parking") ||
    descriptionLower.includes("metro")
  ) {
    return { category: "transport", confidence: 0.9 }
  }

  if (
    descriptionLower.includes("amazon") ||
    descriptionLower.includes("shop") ||
    descriptionLower.includes("store") ||
    descriptionLower.includes("mall")
  ) {
    return { category: "shopping", confidence: 0.85 }
  }

  if (
    descriptionLower.includes("netflix") ||
    descriptionLower.includes("spotify") ||
    descriptionLower.includes("electric") ||
    descriptionLower.includes("water") ||
    descriptionLower.includes("internet") ||
    descriptionLower.includes("phone")
  ) {
    return { category: "bills", confidence: 0.93 }
  }

  if (
    descriptionLower.includes("movie") ||
    descriptionLower.includes("concert") ||
    descriptionLower.includes("game") ||
    descriptionLower.includes("entertainment")
  ) {
    return { category: "entertainment", confidence: 0.87 }
  }

  if (
    descriptionLower.includes("doctor") ||
    descriptionLower.includes("pharmacy") ||
    descriptionLower.includes("hospital") ||
    descriptionLower.includes("clinic") ||
    descriptionLower.includes("gym") ||
    descriptionLower.includes("fitness")
  ) {
    return { category: "health", confidence: 0.89 }
  }

  if (
    descriptionLower.includes("school") ||
    descriptionLower.includes("university") ||
    descriptionLower.includes("course") ||
    descriptionLower.includes("book")
  ) {
    return { category: "education", confidence: 0.91 }
  }

  if (
    descriptionLower.includes("flight") ||
    descriptionLower.includes("hotel") ||
    descriptionLower.includes("airbnb") ||
    descriptionLower.includes("travel")
  ) {
    return { category: "travel", confidence: 0.94 }
  }

  if (
    descriptionLower.includes("salary") ||
    descriptionLower.includes("paycheck") ||
    descriptionLower.includes("income") ||
    descriptionLower.includes("deposit")
  ) {
    return { category: "income", confidence: 0.95 }
  }

  if (
    descriptionLower.includes("stock") ||
    descriptionLower.includes("crypto") ||
    descriptionLower.includes("investment") ||
    descriptionLower.includes("dividend")
  ) {
    return { category: "investment", confidence: 0.9 }
  }

  // Default to "other" with lower confidence
  return { category: "other", confidence: 0.6 }
}

/**
 * Mock Spending Insights Generation
 */
export const mockGenerateInsights = async (data: {
  currentMonthSpending: number
  lastMonthSpending: number
  budget: number
  categoryBreakdown: Record<string, number>
}): Promise<string[]> => {
  await new Promise((resolve) => setTimeout(resolve, 400))

  const insights: string[] = []
  const { currentMonthSpending, lastMonthSpending, budget, categoryBreakdown } = data

  // Spending comparison
  const percentageChange = ((currentMonthSpending - lastMonthSpending) / lastMonthSpending) * 100
  if (Math.abs(percentageChange) > 10) {
    const direction = percentageChange > 0 ? "increased" : "decreased"
    insights.push(
      `Your spending has ${direction} by ${Math.abs(percentageChange).toFixed(1)}% compared to last month.`,
    )
  }

  // Budget status
  const budgetUsage = (currentMonthSpending / budget) * 100
  if (budgetUsage > 80 && budgetUsage < 100) {
    insights.push(
      `You're approaching your budget limit. ${(100 - budgetUsage).toFixed(0)}% remaining.`,
    )
  } else if (budgetUsage >= 100) {
    insights.push(`You've exceeded your budget by $${(currentMonthSpending - budget).toFixed(2)}.`)
  } else if (budgetUsage < 50) {
    insights.push(
      `Great job! You're well under budget with ${(100 - budgetUsage).toFixed(0)}% remaining.`,
    )
  }

  // Top spending category
  const topCategory = Object.entries(categoryBreakdown).sort((a, b) => b[1] - a[1])[0]
  if (topCategory) {
    const categoryPercentage = (topCategory[1] / currentMonthSpending) * 100
    insights.push(
      `${topCategory[0]} is your top expense at ${categoryPercentage.toFixed(0)}% of total spending.`,
    )
  }

  return insights
}

/**
 * Mock Budget Prediction
 */
export const mockPredictBudget = async (data: {
  spentSoFar: number
  daysElapsed: number
  totalDays: number
  budget: number
}): Promise<{
  projectedSpend: number
  willExceed: boolean
  excessAmount: number
  confidence: number
}> => {
  await new Promise((resolve) => setTimeout(resolve, 350))

  const { spentSoFar, daysElapsed, totalDays, budget } = data
  const dailyAverage = spentSoFar / daysElapsed
  const projectedSpend = dailyAverage * totalDays

  return {
    projectedSpend: Math.round(projectedSpend * 100) / 100,
    willExceed: projectedSpend > budget,
    excessAmount: Math.max(0, projectedSpend - budget),
    confidence: 0.82,
  }
}

/**
 * Mock Cryptocurrency Prices
 */
export const mockGetCryptoPrices = async (
  symbols: string[],
): Promise<Record<string, { price: number; change24h: number }>> => {
  await new Promise((resolve) => setTimeout(resolve, 500))

  const mockPrices: Record<string, { price: number; change24h: number }> = {
    bitcoin: { price: 43250.5, change24h: 2.3 },
    ethereum: { price: 2280.75, change24h: -1.5 },
    cardano: { price: 0.52, change24h: 3.8 },
    solana: { price: 98.32, change24h: 5.2 },
    polkadot: { price: 7.15, change24h: -0.8 },
    dogecoin: { price: 0.085, change24h: 1.2 },
  }

  const result: Record<string, { price: number; change24h: number }> = {}
  symbols.forEach((symbol) => {
    const lowerSymbol = symbol.toLowerCase()
    if (mockPrices[lowerSymbol]) {
      result[symbol] = mockPrices[lowerSymbol]
    }
  })

  return result
}

/**
 * Mock Stock Prices
 */
export const mockGetStockPrice = async (
  symbol: string,
): Promise<{ price: number; change: number; changePercent: number }> => {
  await new Promise((resolve) => setTimeout(resolve, 400))

  const mockStocks: Record<string, { price: number; change: number; changePercent: number }> = {
    AAPL: { price: 178.52, change: 1.23, changePercent: 0.69 },
    GOOGL: { price: 142.85, change: -0.75, changePercent: -0.52 },
    MSFT: { price: 405.63, change: 2.45, changePercent: 0.61 },
    TSLA: { price: 242.18, change: -3.21, changePercent: -1.31 },
    AMZN: { price: 178.23, change: 0.95, changePercent: 0.54 },
  }

  const upperSymbol = symbol.toUpperCase()
  return mockStocks[upperSymbol] || { price: 100, change: 0, changePercent: 0 }
}

/**
 * Mock Historical Crypto Data (7 days)
 */
export const mockGetCryptoHistory = async (
  symbol: string,
  days: number = 7,
): Promise<{ timestamp: number; price: number }[]> => {
  await new Promise((resolve) => setTimeout(resolve, 600))

  const now = Date.now()
  const dayInMs = 24 * 60 * 60 * 1000
  const data: { timestamp: number; price: number }[] = []

  // Generate mock historical data with some randomness
  let basePrice = 43000 // Bitcoin base price
  if (symbol.toLowerCase().includes("eth")) basePrice = 2280

  for (let i = days - 1; i >= 0; i--) {
    const timestamp = now - i * dayInMs
    const randomChange = (Math.random() - 0.5) * basePrice * 0.05 // +/- 5%
    const price = basePrice + randomChange
    data.push({ timestamp, price: Math.round(price * 100) / 100 })
  }

  return data
}

/**
 * Mock Portfolio Insights
 */
export const mockGeneratePortfolioInsights = async (data: {
  totalValue: number
  totalGainLoss: number
  topPerformer: string
}): Promise<string[]> => {
  await new Promise((resolve) => setTimeout(resolve, 300))

  const insights: string[] = []
  const { totalValue, totalGainLoss, topPerformer } = data

  const gainLossPercent = (totalGainLoss / (totalValue - totalGainLoss)) * 100

  if (gainLossPercent > 0) {
    insights.push(
      `Your portfolio is up ${gainLossPercent.toFixed(2)}% with gains of $${totalGainLoss.toFixed(2)}.`,
    )
  } else if (gainLossPercent < 0) {
    insights.push(
      `Your portfolio is down ${Math.abs(gainLossPercent).toFixed(2)}% with losses of $${Math.abs(totalGainLoss).toFixed(2)}.`,
    )
  }

  if (topPerformer) {
    insights.push(`${topPerformer} is your best performing asset.`)
  }

  insights.push("Consider diversifying across multiple asset classes for better risk management.")

  return insights
}

export default {
  mockCategorizeTransaction,
  mockGenerateInsights,
  mockPredictBudget,
  mockGetCryptoPrices,
  mockGetStockPrice,
  mockGetCryptoHistory,
  mockGeneratePortfolioInsights,
}
