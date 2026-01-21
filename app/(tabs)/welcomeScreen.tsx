import { View, Text, Pressable } from "react-native";
import { router } from "expo-router";

export default function WelcomeScreen() {
  return (
    <View className="flex-1 bg-[#F6F7F4] justify-between px-6 py-12">
      
      {/* Top */}
      <View />

      {/* Center content */}
      <View className="items-center">
        {/* Logo / App name */}
        <Text className="text-4xl font-semibold text-gray-900 mb-4">
          Ninja
        </Text>

        <Text className="text-center text-gray-600 text-base leading-6 px-4">
          Your daily space for clarity, focus, and calm.
        </Text>
      </View>

      {/* Actions */}
      <View className="space-y-4">
        <Pressable
          onPress={() => router.push("/CreateAccount")}
          className="bg-primary-soft rounded-full py-4 items-center mb-2"
        >
          <Text className="text-gray-900 font-semibold text-base">
            Get started
          </Text>
        </Pressable>

        <Pressable
          onPress={() => router.replace("/login")}
          className="rounded-full py-4 items-center border border-gray-300"
        >
          <Text className="text-gray-700 font-medium text-base">
            I already have an account
          </Text>
        </Pressable>
      </View>

    </View>
  );
}
