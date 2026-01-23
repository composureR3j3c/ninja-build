import { View, Text, Pressable } from "react-native";
import { router } from "expo-router";

export default function ActivityScreen() {
  return (
    <View className="flex-1 bg-[#F6F7F4] justify-between px-6 py-12">
        {/* Top */}
        <View />
        {/* Center content */}
        <View className="items-center">
          {/* Logo / App name */}
          <Text className="text-4xl font-semibold text-gray-900 mb-4">
            Activity
          </Text>
        </View>
      </View>
  )
}