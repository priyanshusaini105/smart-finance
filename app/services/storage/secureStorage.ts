import * as SecureStore from "expo-secure-store"

/**
 * Secure Storage Keys
 */
export const SecureKeys = {
  OPENAI_API_KEY: "openai_api_key",
  BIOMETRIC_KEY: "biometric_enabled",
  USER_PIN: "user_pin",
} as const

/**
 * Secure Storage Helper Functions
 * Uses Expo SecureStore for encrypted storage of sensitive data
 */

/**
 * Set a secure value
 */
export async function setSecureItem(key: string, value: string): Promise<void> {
  try {
    await SecureStore.setItemAsync(key, value)
  } catch (error) {
    console.error(`Error setting secure item ${key}:`, error)
    throw error
  }
}

/**
 * Get a secure value
 */
export async function getSecureItem(key: string): Promise<string | null> {
  try {
    return await SecureStore.getItemAsync(key)
  } catch (error) {
    console.error(`Error getting secure item ${key}:`, error)
    return null
  }
}

/**
 * Remove a secure value
 */
export async function removeSecureItem(key: string): Promise<void> {
  try {
    await SecureStore.deleteItemAsync(key)
  } catch (error) {
    console.error(`Error removing secure item ${key}:`, error)
  }
}

/**
 * Check if a secure key exists
 */
export async function hasSecureKey(key: string): Promise<boolean> {
  try {
    const value = await SecureStore.getItemAsync(key)
    return value !== null
  } catch {
    return false
  }
}
