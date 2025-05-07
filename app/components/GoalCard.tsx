/**
 * GoalCard Component
 *
 * Displays financial goal with progress tracking
 */

import { View, Pressable } from "react-native"
import { Text } from "./Text"
import { ProgressBar } from "./ProgressBar"
import { Goal } from "@/types"
import { formatCurrency } from "@/utils/currency"
import { formatDate } from "@/utils/formatDate"
import { Icon } from "./Icon"

interface GoalCardProps {
  goal: Goal
  onPress?: () => void
}

export function GoalCard({ goal, onPress }: GoalCardProps) {
  const progress = (goal.currentAmount / goal.targetAmount) * 100
  const remaining = goal.targetAmount - goal.currentAmount
  const isCompleted = goal.status === "completed"

  return (
    <Pressable
      onPress={onPress}
      className="bg-white p-4 rounded-xl border border-gray-100 mb-3 active:bg-gray-50"
    >
      {/* Header */}
      <View className="flex-row items-start justify-between mb-3">
        <View className="flex-1">
          <Text className="font-bold text-lg text-gray-900">{goal.name}</Text>
          {goal.description && (
            <Text className="text-sm text-gray-500 mt-1">{goal.description}</Text>
          )}
        </View>
        {isCompleted && (
          <View className="bg-success-100 px-2 py-1 rounded-full ml-2">
            <Icon icon="check" size={16} className="text-success-600" />
          </View>
        )}
      </View>

      {/* Progress */}
      <View className="mb-3">
        <View className="flex-row justify-between mb-1">
          <Text className="text-sm text-gray-600">
            {formatCurrency(goal.currentAmount)} of {formatCurrency(goal.targetAmount)}
          </Text>
          <Text className="text-sm font-semibold text-primary-600">{progress.toFixed(0)}%</Text>
        </View>
        <ProgressBar progress={progress} color={isCompleted ? "success" : "primary"} />
      </View>

      {/* Details */}
      <View className="flex-row justify-between">
        <View>
          <Text className="text-xs text-gray-500">Remaining</Text>
          <Text className="font-semibold text-gray-900">{formatCurrency(remaining)}</Text>
        </View>
        {goal.deadline && (
          <View className="items-end">
            <Text className="text-xs text-gray-500">Target Date</Text>
            <Text className="font-semibold text-gray-900">
              {formatDate(goal.deadline, "MMM dd, yyyy")}
            </Text>
          </View>
        )}
      </View>
    </Pressable>
  )
}
