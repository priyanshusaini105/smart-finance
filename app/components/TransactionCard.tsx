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
import tw from "@/utils/tw"

interface TransactionCardProps {
  transaction: Transaction
  onPress?: () => void
  showDate?: boolean
}

export function TransactionCard({ transaction, onPress, showDate = true }: TransactionCardProps) {
  const isIncome = transaction.type === "income"

  return (
    <Pressable
      onPress={onPress}
      style={tw`flex-row items-center bg-white p-4 rounded-xl mb-2 border border-gray-100`}
    >
      <CategoryIcon category={transaction.category} size={44} />

      <View style={tw`flex-1 ml-3`}>
        <Text style={tw`font-semibold text-gray-900`} numberOfLines={1}>
          {transaction.description}
        </Text>
        {showDate && (
          <Text style={tw`text-sm text-gray-500 mt-0.5`}>
            {formatRelativeDate(transaction.date)}
          </Text>
        )}
        {transaction.aiCategorized && (
          <Text style={tw`text-xs text-primary-500 mt-0.5`}>✨ AI Categorized</Text>
        )}
      </View>

      <View style={tw`items-end ml-2`}>
        <Text
          style={[
            tw`font-bold text-lg`,
            { color: isIncome ? "#16A34A" : "#111827" }, // success-600 : gray-900
          ]}
        >
          {isIncome ? "+" : "-"}
          {formatCurrency(Math.abs(transaction.amount))}
        </Text>
      </View>
    </Pressable>
  )
}
