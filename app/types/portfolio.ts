/**
 * Asset Type
 */
export type AssetType = "crypto" | "stock" | "other"

/**
 * Portfolio Asset Interface
 */
export interface PortfolioAsset {
  id: string
  symbol: string
  name: string
  type: AssetType
  quantity: number
  purchasePrice: number
  currentPrice: number
  totalValue: number
  costBasis: number
  gainLoss: number
  gainLossPercentage: number
  lastUpdated: string
  createdAt: string
  updatedAt: string
}

/**
 * Asset Creation Input
 */
export interface AssetInput {
  symbol: string
  name: string
  type: AssetType
  quantity: number
  purchasePrice: number
}

/**
 * Portfolio Summary
 */
export interface PortfolioSummary {
  totalValue: number
  totalCostBasis: number
  totalGainLoss: number
  totalGainLossPercentage: number
  assetCount: number
  lastUpdated: string
}

/**
 * Price Data (from API)
 */
export interface PriceData {
  symbol: string
  currentPrice: number
  priceChange24h?: number
  priceChangePercentage24h?: number
  marketCap?: number
  volume24h?: number
  lastUpdated: string
}

/**
 * Historical Price Data
 */
export interface HistoricalPriceData {
  date: string
  price: number
}
