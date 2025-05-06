import { MMKV } from "react-native-mmkv"

/**
 * MMKV Storage Instance
 * Ultra-fast, encrypted local storage
 */
export const storage = new MMKV({
  id: "smartfinance-storage",
  encryptionKey: "smartfinance-encryption-key-2025",
})

/**
 * Storage Keys
 */
export const StorageKeys = {
  TRANSACTIONS: "transactions",
  BUDGETS: "budgets",
  GOALS: "goals",
  PORTFOLIO: "portfolio_assets",
  SETTINGS: "app_settings",
  USER_PROFILE: "user_profile",
  AI_CACHE: "ai_categorization_cache",
  LAST_SYNC: "last_sync_timestamp",
} as const

/**
 * Storage Helper Functions
 */

/**
 * Set a JSON value in storage
 */
export function setItem<T>(key: string, value: T): void {
  try {
    storage.set(key, JSON.stringify(value))
  } catch (error) {
    console.error(`Error setting item ${key}:`, error)
  }
}

/**
 * Get a JSON value from storage
 */
export function getItem<T>(key: string): T | null {
  try {
    const value = storage.getString(key)
    return value ? JSON.parse(value) : null
  } catch (error) {
    console.error(`Error getting item ${key}:`, error)
    return null
  }
}

/**
 * Remove an item from storage
 */
export function removeItem(key: string): void {
  try {
    storage.delete(key)
  } catch (error) {
    console.error(`Error removing item ${key}:`, error)
  }
}

/**
 * Clear all storage
 */
export function clearAll(): void {
  try {
    storage.clearAll()
  } catch (error) {
    console.error("Error clearing storage:", error)
  }
}

/**
 * Check if a key exists
 */
export function hasKey(key: string): boolean {
  return storage.contains(key)
}

/**
 * Get all keys
 */
export function getAllKeys(): string[] {
  return storage.getAllKeys()
}

/**
 * Batch operations
 */
export function setMultiple(items: Array<{ key: string; value: any }>): void {
  items.forEach(({ key, value }) => setItem(key, value))
}

export function getMultiple<T>(keys: string[]): Record<string, T | null> {
  const result: Record<string, T | null> = {}
  keys.forEach((key) => {
    result[key] = getItem<T>(key)
  })
  return result
}

/**
 * AI Categorization Cache
 */
interface CategoryCache {
  [key: string]: {
    category: string
    confidence: number
    timestamp: number
  }
}

const CACHE_EXPIRY_MS = 30 * 24 * 60 * 60 * 1000 // 30 days

/**
 * Get cached category for a transaction description
 */
export function getCachedCategory(
  description: string,
): { category: string; confidence: number } | null {
  const cache = getItem<CategoryCache>(StorageKeys.AI_CACHE) || {}
  const key = description.toLowerCase().trim()
  const cached = cache[key]

  if (cached) {
    // Check if cache has expired
    if (Date.now() - cached.timestamp < CACHE_EXPIRY_MS) {
      return {
        category: cached.category,
        confidence: cached.confidence,
      }
    }
  }

  return null
}

/**
 * Cache a category result
 */
export function setCachedCategory(description: string, category: string, confidence: number): void {
  const cache = getItem<CategoryCache>(StorageKeys.AI_CACHE) || {}
  const key = description.toLowerCase().trim()

  cache[key] = {
    category,
    confidence,
    timestamp: Date.now(),
  }

  setItem(StorageKeys.AI_CACHE, cache)
}

/**
 * Clear expired cache entries
 */
export function clearExpiredCache(): void {
  const cache = getItem<CategoryCache>(StorageKeys.AI_CACHE) || {}
  const now = Date.now()

  Object.keys(cache).forEach((key) => {
    if (now - cache[key].timestamp >= CACHE_EXPIRY_MS) {
      delete cache[key]
    }
  })

  setItem(StorageKeys.AI_CACHE, cache)
}
