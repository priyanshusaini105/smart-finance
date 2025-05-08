/**
 * CategoryIcon Component
 *
 * Displays category-specific icons for transactions and budgets
 */

import { View } from "react-native"
import { Icon, IconTypes } from "./Icon"
import { TransactionCategory } from "@/types"
import tw from "@/utils/tw"

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
    bgColor: "#DCFCE7", // success-100
    iconColor: "#16A34A", // success-600
  },
  dining: {
    icon: "menu",
    bgColor: "#FDE68A", // warning-200
    iconColor: "#D97706", // warning-600
  },
  transport: {
    icon: "caretRight",
    bgColor: "#DBEAFE", // primary-100
    iconColor: "#2563EB", // primary-600
  },
  shopping: {
    icon: "check",
    bgColor: "#E5E7EB", // gray-200
    iconColor: "#6B7280", // gray-500
  },
  bills: {
    icon: "bell",
    bgColor: "#FEE2E2", // danger-100
    iconColor: "#DC2626", // danger-600
  },
  entertainment: {
    icon: "view",
    bgColor: "#FCE7F3", // pink-100
    iconColor: "#DB2777", // pink-600
  },
  health: {
    icon: "ladybug",
    bgColor: "#F0FDFA", // teal-50
    iconColor: "#0D9488", // teal-600
  },
  education: {
    icon: "ladybug",
    bgColor: "#EEF2FF", // indigo-50
    iconColor: "#4F46E5", // indigo-600
  },
  travel: {
    icon: "caretRight",
    bgColor: "#ECFEFF", // cyan-50
    iconColor: "#0891B2", // cyan-600
  },
  income: {
    icon: "check",
    bgColor: "#DCFCE7", // success-100
    iconColor: "#16A34A", // success-600
  },
  investment: {
    icon: "settings",
    bgColor: "#EDE9FE", // violet-100
    iconColor: "#7C3AED", // violet-600
  },
  other: {
    icon: "more",
    bgColor: "#F3F4F6", // gray-100
    iconColor: "#6B7280", // gray-500
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
      style={[
        tw`items-center justify-center rounded-full`,
        {
          width: size,
          height: size,
          backgroundColor: backgroundColor || config.bgColor,
        },
      ]}
    >
      <Icon
        icon={config.icon}
        size={size * 0.5}
        style={{ tintColor: iconColor || config.iconColor }}
      />
    </View>
  )
}
