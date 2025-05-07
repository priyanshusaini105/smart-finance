/**
 * BudgetCard Component
 *
 * Displays budget information with progress bar and spending status
 */

import { View } from "react-native"
import { Text } from "./Text"
import { CategoryIcon } from "./CategoryIcon"
import { ProgressBar } from "./ProgressBar"
import { Budget, TransactionCategory } from "@/types"
import { formatCurrency } from "@/utils/currency"

interface BudgetCardProps {
  budget: Budget
  spent: number
}

export function BudgetCard({ budget, spent }: BudgetCardProps) {
  const remaining = budget.amount - spent
  const percentage = (spent / budget.amount) * 100
  const isOverBudget = spent > budget.amount

  // Status styling
  const getStatusColor = () => {
    if (isOverBudget) return "text-danger-600"
    if (budget.status === "warning") return "text-warning-600"
    return "text-success-600"
  }

  const getStatusText = () => {
    if (isOverBudget) return "Over Budget"
    if (budget.status === "warning") return "Warning"
    return "On Track"
  }

  return (
    <View className="bg-white p-4 rounded-xl border border-gray-100 mb-3">
      {/* Header */}
      <View className="flex-row items-center mb-3">
        <CategoryIcon category={budget.category as TransactionCategory} size={40} />
        <View className="flex-1 ml-3">
          <Text className="font-semibold text-gray-900 capitalize">{budget.category}</Text>
          <Text className="text-sm text-gray-500">{budget.period}</Text>
        </View>
        <Text className={`font-semibold ${getStatusColor()}`}>{getStatusText()}</Text>
      </View>

      {/* Progress Bar */}
      <ProgressBar
        progress={Math.min(percentage, 100)}
        color={isOverBudget ? "danger" : budget.status === "warning" ? "warning" : "success"}
      />

      {/* Amount Details */}
      <View className="flex-row justify-between mt-3">
        <View>
          <Text className="text-xs text-gray-500">Spent</Text>
          <Text className="font-bold text-gray-900">{formatCurrency(spent)}</Text>
        </View>
        <View className="items-end">
          <Text className="text-xs text-gray-500">{isOverBudget ? "Over" : "Remaining"}</Text>
          <Text className={`font-bold ${isOverBudget ? "text-danger-600" : "text-gray-900"}`}>
            {formatCurrency(Math.abs(remaining))}
          </Text>
        </View>
        <View className="items-end">
          <Text className="text-xs text-gray-500">Budget</Text>
          <Text className="font-bold text-gray-900">{formatCurrency(budget.amount)}</Text>
        </View>
      </View>
    </View>
  )
}
