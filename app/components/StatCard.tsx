/**
 * StatCard Component
 *
 * Displays a statistic with optional trend indicator
 */

import { View } from "react-native"
import { Text } from "./Text"
import { Icon } from "./Icon"

interface StatCardProps {
  title: string
  value: string
  subtitle?: string
  trend?: "up" | "down" | "neutral"
  trendValue?: string
  variant?: "default" | "success" | "warning" | "danger"
}

const VARIANT_STYLES = {
  default: {
    bg: "bg-gray-50",
    title: "text-gray-600",
    value: "text-gray-900",
  },
  success: {
    bg: "bg-success-50",
    title: "text-success-600",
    value: "text-success-700",
  },
  warning: {
    bg: "bg-warning-50",
    title: "text-warning-600",
    value: "text-warning-700",
  },
  danger: {
    bg: "bg-danger-50",
    title: "text-danger-600",
    value: "text-danger-700",
  },
}

export function StatCard({
  title,
  value,
  subtitle,
  trend,
  trendValue,
  variant = "default",
}: StatCardProps) {
  const styles = VARIANT_STYLES[variant]

  return (
    <View className={`p-4 rounded-xl ${styles.bg}`}>
      <Text className={`text-sm font-medium ${styles.title}`}>{title}</Text>
      <Text className={`text-2xl font-bold mt-1 ${styles.value}`}>{value}</Text>

      {(subtitle || trend) && (
        <View className="flex-row items-center mt-1">
          {trend && (
            <View className="flex-row items-center mr-2">
              <Icon
                icon={trend === "up" ? "caretRight" : "caretLeft"}
                size={12}
                className={
                  trend === "up"
                    ? "text-success-600"
                    : trend === "down"
                      ? "text-danger-600"
                      : "text-gray-600"
                }
              />
              {trendValue && (
                <Text
                  className={`text-xs ml-1 ${
                    trend === "up"
                      ? "text-success-600"
                      : trend === "down"
                        ? "text-danger-600"
                        : "text-gray-600"
                  }`}
                >
                  {trendValue}
                </Text>
              )}
            </View>
          )}
          {subtitle && <Text className="text-xs text-gray-500">{subtitle}</Text>}
        </View>
      )}
    </View>
  )
}
