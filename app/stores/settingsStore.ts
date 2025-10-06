/**
 * Settings Store
 *
 * Manages app settings and user preferences
 */

import { create } from "zustand"
import { AppSettings, UserProfile } from "@/types"
import { getItem, setItem, StorageKeys } from "../services/storage/mmkvStorage"

const DEFAULT_SETTINGS: AppSettings = {
  theme: "system",
  currency: "USD",
  notifications: {
    budgetAlerts: true,
    goalMilestones: true,
    portfolioUpdates: true,
    dailyReminders: false,
    quietHoursEnabled: false,
  },
  ai: {
    enabled: true,
    autoCategorize: true,
    insightsEnabled: true,
    predictionsEnabled: true,
  },
  biometricEnabled: false,
  analyticsEnabled: false,
  version: "1.0.0",
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
}

const DEFAULT_PROFILE: UserProfile = {
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
}

interface SettingsState {
  settings: AppSettings
  profile: UserProfile
  isLoading: boolean

  // Actions
  loadSettings: () => void
  updateSettings: (updates: Partial<AppSettings>) => void
  updateProfile: (updates: Partial<UserProfile>) => void
  resetSettings: () => void
  toggleTheme: () => void
  setCurrency: (currency: AppSettings["currency"]) => void
  toggleNotification: (key: keyof AppSettings["notifications"], value: boolean) => void
  toggleAISetting: (key: keyof AppSettings["ai"], value: boolean) => void
}

export const useSettingsStore = create<SettingsState>((set, get) => ({
  settings: DEFAULT_SETTINGS,
  profile: DEFAULT_PROFILE,
  isLoading: false,

  /**
   * Load settings from storage
   */
  loadSettings: () => {
    set({ isLoading: true })
    const storedSettings = getItem<AppSettings>(StorageKeys.SETTINGS)
    const storedProfile = getItem<UserProfile>(StorageKeys.USER_PROFILE)

    set({
      settings: storedSettings || DEFAULT_SETTINGS,
      profile: storedProfile || DEFAULT_PROFILE,
      isLoading: false,
    })
  },

  /**
   * Update settings
   */
  updateSettings: (updates: Partial<AppSettings>) => {
    const settings = {
      ...get().settings,
      ...updates,
      updatedAt: new Date().toISOString(),
    }

    set({ settings })
    setItem(StorageKeys.SETTINGS, settings)
  },

  /**
   * Update user profile
   */
  updateProfile: (updates: Partial<UserProfile>) => {
    const profile = {
      ...get().profile,
      ...updates,
      updatedAt: new Date().toISOString(),
    }

    set({ profile })
    setItem(StorageKeys.USER_PROFILE, profile)
  },

  /**
   * Reset settings to default
   */
  resetSettings: () => {
    const settings = {
      ...DEFAULT_SETTINGS,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    set({ settings })
    setItem(StorageKeys.SETTINGS, settings)
  },

  /**
   * Toggle theme
   */
  toggleTheme: () => {
    const currentTheme = get().settings.theme
    const newTheme = currentTheme === "dark" ? "light" : "dark"

    get().updateSettings({ theme: newTheme })
  },

  /**
   * Set currency
   */
  setCurrency: (currency: AppSettings["currency"]) => {
    get().updateSettings({ currency })
  },

  /**
   * Toggle notification setting
   */
  toggleNotification: (key: keyof AppSettings["notifications"], value: boolean) => {
    const notifications = {
      ...get().settings.notifications,
      [key]: value,
    }

    get().updateSettings({ notifications })
  },

  /**
   * Toggle AI setting
   */
  toggleAISetting: (key: keyof AppSettings["ai"], value: boolean) => {
    const ai = {
      ...get().settings.ai,
      [key]: value,
    }

    get().updateSettings({ ai })
  },
}))

// Initialize by loading settings
if (typeof window !== "undefined") {
  setTimeout(() => {
    useSettingsStore.getState().loadSettings()
  }, 100)
}
