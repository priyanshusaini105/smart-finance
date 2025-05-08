/**
 * Tailwind React Native ClassNames (twrnc) configuration
 *
 * This file sets up twrnc with our custom color palette and utilities
 */

import tw from "twrnc"

// Configure custom colors to match our design system
tw.color = {
  ...tw.color,
  // Primary colors - Financial blue/indigo
  "primary-50": "#EFF6FF",
  "primary-100": "#DBEAFE",
  "primary-200": "#BFDBFE",
  "primary-300": "#93C5FD",
  "primary-400": "#60A5FA",
  "primary-500": "#3B82F6",
  "primary-600": "#2563EB",
  "primary-700": "#1D4ED8",
  "primary-800": "#1E40AF",
  "primary-900": "#1E3A8A",

  // Success colors - Green
  "success-50": "#F0FDF4",
  "success-100": "#DCFCE7",
  "success-200": "#BBF7D0",
  "success-300": "#86EFAC",
  "success-400": "#4ADE80",
  "success-500": "#22C55E",
  "success-600": "#16A34A",
  "success-700": "#15803D",
  "success-800": "#166534",
  "success-900": "#14532D",

  // Warning colors - Amber
  "warning-50": "#FFFBEB",
  "warning-100": "#FEF3C7",
  "warning-200": "#FDE68A",
  "warning-300": "#FCD34D",
  "warning-400": "#FBBF24",
  "warning-500": "#F59E0B",
  "warning-600": "#D97706",
  "warning-700": "#B45309",
  "warning-800": "#92400E",
  "warning-900": "#78350F",

  // Danger colors - Red
  "danger-50": "#FEF2F2",
  "danger-100": "#FEE2E2",
  "danger-200": "#FECACA",
  "danger-300": "#FCA5A5",
  "danger-400": "#F87171",
  "danger-500": "#EF4444",
  "danger-600": "#DC2626",
  "danger-700": "#B91C1C",
  "danger-800": "#991B1B",
  "danger-900": "#7F1D1D",
}

export default tw
