/**
 * TransactionCard Component
 *
 * Displays a transaction item with category icon, description, and amount
 */

import { View, Pressable } from "react-native"
import { Text } from "./Text"
import { CategoryIcon } from "./CategoryIcon"
import { Transaction } from "@/types"
import { formatCurrency } from "@/utils/currency"
import { formatRelativeDate } from "@/utils/dateHelpers"

interface TransactionCardProps {
  transaction: Transaction
  onPress?: () => void
  showDate?: boolean
}

export function TransactionCard({ transaction, onPress, showDate = true }: TransactionCardProps) {
  const isIncome = transaction.type === "income"
  const amountColor = isIncome ? "text-success-600" : "text-gray-900"

  return (
    <Pressable
      onPress={onPress}
      className="flex-row items-center bg-white p-4 rounded-xl mb-2 border border-gray-100 active:bg-gray-50"
    >
      <CategoryIcon category={transaction.category} size={44} />

      <View className="flex-1 ml-3">
        <Text className="font-semibold text-gray-900" numberOfLines={1}>
          {transaction.description}
        </Text>
        {showDate && (
          <Text className="text-sm text-gray-500 mt-0.5">
            {formatRelativeDate(transaction.date)}
          </Text>
        )}
        {transaction.aiCategorized && (
          <Text className="text-xs text-primary-500 mt-0.5">✨ AI Categorized</Text>
        )}
      </View>

      <View className="items-end ml-2">
        <Text className={`font-bold text-lg ${amountColor}`}>
          {isIncome ? "+" : "-"}
          {formatCurrency(Math.abs(transaction.amount))}
        </Text>
      </View>
    </Pressable>
  )
}
