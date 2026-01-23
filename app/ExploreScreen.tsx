import { View, Text, Pressable } from "react-native";
import { router } from "expo-router";

export default function ExploreScreen() {
  return (
    <View className="flex-1 bg-[#F6F7F4] justify-between px-6 py-12">
        {/* Top */}
        <View />
        {/* Center content */}
        <View className="items-center">
          {/* Logo / App name */}
          <Text className="text-4xl font-semibold text-gray-900 mb-4">
            Explore
          </Text>
          </View>
        {/* Actions */}
        <View className="space-y-4">
            <Pressable
            //   onPress={() => router.push("/ExploreCategories")}  
              className="bg-primary-soft rounded-full py-4 items-center mb-2"
            >
              <Text className="text-gray-900 font-semibold text-base">
                Explore Categories
              </Text>
            </Pressable>
        </View>
    </View>
  )
}