/**
 * Portfolio Store
 *
 * Manages portfolio assets and cryptocurrency/stock tracking
 */

import { create } from "zustand"
import { PortfolioAsset, AssetInput, PortfolioSummary } from "@/types"
import { getItem, setItem, StorageKeys } from "../services/storage/mmkvStorage"

interface PortfolioState {
  assets: PortfolioAsset[]
  isLoading: boolean
  lastUpdated: string | null

  // Actions
  loadAssets: () => void
  addAsset: (input: AssetInput) => PortfolioAsset
  updateAsset: (id: string, updates: Partial<PortfolioAsset>) => void
  deleteAsset: (id: string) => void
  getAsset: (id: string) => PortfolioAsset | undefined
  updateAssetPrice: (id: string, currentPrice: number) => void
  getPortfolioSummary: () => PortfolioSummary
  refreshPrices: () => Promise<void>
}

export const usePortfolioStore = create<PortfolioState>((set, get) => ({
  assets: [],
  isLoading: false,
  lastUpdated: null,

  /**
   * Load assets from storage
   */
  loadAssets: () => {
    set({ isLoading: true })
    const stored = getItem<PortfolioAsset[]>(StorageKeys.PORTFOLIO)
    const lastUpdated = getItem<string>("portfolio_last_updated")
    set({ assets: stored || [], lastUpdated, isLoading: false })
  },

  /**
   * Add a new asset
   */
  addAsset: (input: AssetInput) => {
    const costBasis = input.quantity * input.purchasePrice
    const totalValue = input.quantity * input.purchasePrice

    const newAsset: PortfolioAsset = {
      id: `asset_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      symbol: input.symbol.toUpperCase(),
      name: input.name,
      type: input.type,
      quantity: input.quantity,
      purchasePrice: input.purchasePrice,
      currentPrice: input.purchasePrice, // Will be updated by price refresh
      totalValue,
      costBasis,
      gainLoss: 0,
      gainLossPercentage: 0,
      lastUpdated: new Date().toISOString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    const assets = [...get().assets, newAsset]
    set({ assets })
    setItem(StorageKeys.PORTFOLIO, assets)

    return newAsset
  },

  /**
   * Update an existing asset
   */
  updateAsset: (id: string, updates: Partial<PortfolioAsset>) => {
    const assets = get().assets.map((asset) =>
      asset.id === id
        ? {
            ...asset,
            ...updates,
            updatedAt: new Date().toISOString(),
          }
        : asset,
    )

    set({ assets })
    setItem(StorageKeys.PORTFOLIO, assets)
  },

  /**
   * Delete an asset
   */
  deleteAsset: (id: string) => {
    const assets = get().assets.filter((asset) => asset.id !== id)
    set({ assets })
    setItem(StorageKeys.PORTFOLIO, assets)
  },

  /**
   * Get a single asset by ID
   */
  getAsset: (id: string) => {
    return get().assets.find((asset) => asset.id === id)
  },

  /**
   * Update asset price and recalculate gains/losses
   */
  updateAssetPrice: (id: string, currentPrice: number) => {
    const asset = get().getAsset(id)
    if (!asset) return

    const totalValue = asset.quantity * currentPrice
    const gainLoss = totalValue - asset.costBasis
    const gainLossPercentage = (gainLoss / asset.costBasis) * 100

    get().updateAsset(id, {
      currentPrice,
      totalValue,
      gainLoss,
      gainLossPercentage,
      lastUpdated: new Date().toISOString(),
    })
  },

  /**
   * Get portfolio summary
   */
  getPortfolioSummary: (): PortfolioSummary => {
    const assets = get().assets

    const totalValue = assets.reduce((sum, asset) => sum + asset.totalValue, 0)
    const totalCostBasis = assets.reduce((sum, asset) => sum + asset.costBasis, 0)
    const totalGainLoss = totalValue - totalCostBasis
    const totalGainLossPercentage = totalCostBasis > 0 ? (totalGainLoss / totalCostBasis) * 100 : 0

    return {
      totalValue,
      totalCostBasis,
      totalGainLoss,
      totalGainLossPercentage,
      assetCount: assets.length,
      lastUpdated: get().lastUpdated || new Date().toISOString(),
    }
  },

  /**
   * Refresh all asset prices from API
   * This will be implemented with actual API calls later
   */
  refreshPrices: async () => {
    set({ isLoading: true })

    // TODO: Implement actual API calls to CoinGecko, etc.
    // For now, this is a placeholder
    // const cryptoAssets = get().assets.filter(a => a.type === 'crypto')
    // const stockAssets = get().assets.filter(a => a.type === 'stock')
    // Fetch prices and update each asset

    const now = new Date().toISOString()
    set({ lastUpdated: now, isLoading: false })
    setItem("portfolio_last_updated", now)
  },
}))

// Initialize by loading assets
if (typeof window !== "undefined") {
  setTimeout(() => {
    usePortfolioStore.getState().loadAssets()
  }, 100)
}
