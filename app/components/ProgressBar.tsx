/**
 * ProgressBar Component
 *
 * Visual progress indicator with color variants
 */

import { View } from "react-native"

interface ProgressBarProps {
  progress: number // 0-100
  color?: "primary" | "success" | "warning" | "danger"
  height?: number
  showPercentage?: boolean
}

const COLOR_CLASSES = {
  primary: "bg-primary-500",
  success: "bg-success-500",
  warning: "bg-warning-500",
  danger: "bg-danger-500",
}

export function ProgressBar({ progress, color = "primary", height = 8 }: ProgressBarProps) {
  const clampedProgress = Math.min(Math.max(progress, 0), 100)

  return (
    <View className="w-full bg-gray-200 rounded-full overflow-hidden" style={{ height }}>
      <View
        className={`h-full rounded-full ${COLOR_CLASSES[color]}`}
        style={{ width: `${clampedProgress}%` }}
      />
    </View>
  )
}
