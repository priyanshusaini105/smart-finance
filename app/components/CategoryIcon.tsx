/**
 * CategoryIcon Component
 *
 * Displays category-specific icons for transactions and budgets
 */

import { View } from "react-native"
import { Icon, IconTypes } from "./Icon"
import { TransactionCategory } from "@/types"

interface CategoryIconProps {
  category: TransactionCategory
  size?: number
  backgroundColor?: string
  iconColor?: string
}

// Map categories to icon names and colors
const CATEGORY_CONFIG: Record<
  TransactionCategory,
  {
    icon: IconTypes
    bgColor: string
    iconColor: string
  }
> = {
  groceries: {
    icon: "check",
    bgColor: "bg-green-100",
    iconColor: "text-green-600",
  },
  dining: {
    icon: "menu",
    bgColor: "bg-orange-100",
    iconColor: "text-orange-600",
  },
  transport: {
    icon: "caretRight",
    bgColor: "bg-blue-100",
    iconColor: "text-blue-600",
  },
  shopping: {
    icon: "check",
    bgColor: "bg-purple-100",
    iconColor: "text-purple-600",
  },
  bills: {
    icon: "bell",
    bgColor: "bg-red-100",
    iconColor: "text-red-600",
  },
  entertainment: {
    icon: "view",
    bgColor: "bg-pink-100",
    iconColor: "text-pink-600",
  },
  health: {
    icon: "ladybug",
    bgColor: "bg-teal-100",
    iconColor: "text-teal-600",
  },
  education: {
    icon: "ladybug",
    bgColor: "bg-indigo-100",
    iconColor: "text-indigo-600",
  },
  travel: {
    icon: "caretRight",
    bgColor: "bg-cyan-100",
    iconColor: "text-cyan-600",
  },
  income: {
    icon: "check",
    bgColor: "bg-emerald-100",
    iconColor: "text-emerald-600",
  },
  investment: {
    icon: "settings",
    bgColor: "bg-violet-100",
    iconColor: "text-violet-600",
  },
  other: {
    icon: "more",
    bgColor: "bg-gray-100",
    iconColor: "text-gray-600",
  },
}

export function CategoryIcon({
  category,
  size = 40,
  backgroundColor,
  iconColor,
}: CategoryIconProps) {
  const config = CATEGORY_CONFIG[category] || CATEGORY_CONFIG.other

  return (
    <View
      className={`items-center justify-center rounded-full ${backgroundColor || config.bgColor}`}
      style={{ width: size, height: size }}
    >
      <Icon icon={config.icon} size={size * 0.5} className={iconColor || config.iconColor} />
    </View>
  )
}
