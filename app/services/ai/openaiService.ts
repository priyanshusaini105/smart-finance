/**
 * OpenAI Service
 *
 * Handles all OpenAI API interactions for AI-powered features
 */

import axios from "axios"
import { TransactionCategory } from "@/types"
import { getSecureItem, SecureKeys } from "../storage/secureStorage"
import { getCachedCategory, setCachedCategory } from "../storage/mmkvStorage"
import {
  MOCK_API,
  mockCategorizeTransaction,
  mockGenerateInsights,
  mockPredictBudget,
} from "../api/mockApi"

const OPENAI_API_URL = "https://api.openai.com/v1/chat/completions"
const MODEL = "gpt-3.5-turbo"

/**
 * Get OpenAI API key from secure storage
 */
async function getApiKey(): Promise<string | null> {
  return await getSecureItem(SecureKeys.OPENAI_API_KEY)
}

/**
 * Make OpenAI API request
 */
async function makeOpenAIRequest(
  messages: Array<{ role: string; content: string }>,
  temperature: number = 0.3,
): Promise<string> {
  const apiKey = await getApiKey()

  if (!apiKey) {
    throw new Error("OpenAI API key not configured")
  }

  try {
    const response = await axios.post(
      OPENAI_API_URL,
      {
        model: MODEL,
        messages,
        temperature,
        max_tokens: 200,
      },
      {
        headers: {
          "Authorization": `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        timeout: 15000, // 15 second timeout
      },
    )

    return response.data.choices[0]?.message?.content || ""
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 401) {
        throw new Error("Invalid API key")
      } else if (error.response?.status === 429) {
        throw new Error("Rate limit exceeded")
      } else if (error.code === "ECONNABORTED") {
        throw new Error("Request timeout")
      }
    }
    throw new Error("Failed to connect to OpenAI")
  }
}

/**
 * Categorize transaction using AI
 */
export async function categorizeTransaction(
  description: string,
): Promise<{ category: TransactionCategory; confidence: number }> {
  // Use mock API if enabled
  if (MOCK_API) {
    return await mockCategorizeTransaction(description)
  }

  // Check cache first
  const cached = getCachedCategory(description)
  if (cached) {
    return {
      category: cached.category as TransactionCategory,
      confidence: cached.confidence,
    }
  }

  try {
    const messages = [
      {
        role: "system",
        content:
          "You are a financial assistant that categorizes transactions. Return ONLY valid JSON with no additional text.",
      },
      {
        role: "user",
        content: `Categorize this transaction: "${description}". 
        Categories: groceries, dining, transport, shopping, bills, entertainment, health, education, travel, income, investment, other. 
        Return JSON format: {"category": "category_name", "confidence": 0.95}`,
      },
    ]

    const response = await makeOpenAIRequest(messages)
    const parsed = JSON.parse(response)

    const result = {
      category: parsed.category as TransactionCategory,
      confidence: parsed.confidence,
    }

    // Cache the result
    setCachedCategory(description, result.category, result.confidence)

    return result
  } catch (error) {
    console.error("AI categorization failed:", error)
    // Fallback to mock categorization
    return await mockCategorizeTransaction(description)
  }
}

/**
 * Generate spending insights
 */
export async function generateSpendingInsights(data: {
  currentMonthSpending: number
  lastMonthSpending: number
  budget: number
  categoryBreakdown: Record<string, number>
}): Promise<string[]> {
  // Use mock API if enabled
  if (MOCK_API) {
    return await mockGenerateInsights(data)
  }

  try {
    const { currentMonthSpending, lastMonthSpending, budget, categoryBreakdown } = data
    const percentageChange = ((currentMonthSpending - lastMonthSpending) / lastMonthSpending) * 100
    const topCategory = Object.entries(categoryBreakdown).sort((a, b) => b[1] - a[1])[0]

    const messages = [
      {
        role: "system",
        content:
          "You are a financial advisor providing brief, actionable insights. Keep responses concise (max 2-3 sentences each).",
      },
      {
        role: "user",
        content: `Analyze this spending data and provide 2-3 brief insights:
        - Current month spending: $${currentMonthSpending.toFixed(2)}
        - Last month spending: $${lastMonthSpending.toFixed(2)}
        - Budget: $${budget.toFixed(2)}
        - Change: ${percentageChange.toFixed(1)}%
        - Top category: ${topCategory ? topCategory[0] : "N/A"} ($${topCategory ? topCategory[1].toFixed(2) : "0"})
        
        Return as JSON array of strings: ["insight1", "insight2"]`,
      },
    ]

    const response = await makeOpenAIRequest(messages, 0.7)
    const parsed = JSON.parse(response)

    return Array.isArray(parsed) ? parsed : [parsed]
  } catch (error) {
    console.error("Insight generation failed:", error)
    return await mockGenerateInsights(data)
  }
}

/**
 * Predict budget outcome
 */
export async function predictBudgetOutcome(data: {
  spentSoFar: number
  daysElapsed: number
  totalDays: number
  budget: number
}): Promise<{
  projectedSpend: number
  willExceed: boolean
  excessAmount: number
  confidence: number
}> {
  // Use mock API if enabled
  if (MOCK_API) {
    return await mockPredictBudget(data)
  }

  try {
    const { spentSoFar, daysElapsed, totalDays, budget } = data

    const messages = [
      {
        role: "system",
        content:
          "You are a financial analyst predicting spending patterns. Return ONLY valid JSON.",
      },
      {
        role: "user",
        content: `Predict end-of-period spending:
        - Spent so far: $${spentSoFar.toFixed(2)}
        - Days elapsed: ${daysElapsed}
        - Total days: ${totalDays}
        - Budget: $${budget.toFixed(2)}
        
        Return JSON: {"projected_spend": number, "will_exceed": boolean, "excess_amount": number, "confidence": 0.85}`,
      },
    ]

    const response = await makeOpenAIRequest(messages)
    const parsed = JSON.parse(response)

    return {
      projectedSpend: parsed.projected_spend,
      willExceed: parsed.will_exceed,
      excessAmount: parsed.excess_amount,
      confidence: parsed.confidence,
    }
  } catch (error) {
    console.error("Budget prediction failed:", error)
    return await mockPredictBudget(data)
  }
}

/**
 * Generate savings suggestions
 */
export async function generateSavingsSuggestions(data: {
  monthlyIncome: number
  monthlyExpenses: number
  categoryBreakdown: Record<string, number>
}): Promise<string[]> {
  // Use mock for now
  const { monthlyExpenses, categoryBreakdown } = data
  const topCategory = Object.entries(categoryBreakdown).sort((a, b) => b[1] - a[1])[0]

  // Simple rule-based suggestions
  const suggestions: string[] = []

  if (topCategory && topCategory[1] > monthlyExpenses * 0.3) {
    suggestions.push(
      `Consider reducing ${topCategory[0]} expenses, which account for ${((topCategory[1] / monthlyExpenses) * 100).toFixed(0)}% of your spending.`,
    )
  }

  suggestions.push("Try the 50/30/20 rule: 50% needs, 30% wants, 20% savings.")

  return suggestions
}

export default {
  categorizeTransaction,
  generateSpendingInsights,
  predictBudgetOutcome,
  generateSavingsSuggestions,
}
