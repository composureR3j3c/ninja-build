import { View, Text, TextInput, Pressable } from "react-native";
import { useState } from "react";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <View className="flex-1 bg-[#F6F7F4] justify-center px-6">
      
      {/* Card */}
      <View className="bg-white rounded-3xl p-8 shadow-sm">
        
        {/* Header */}
        <Text className="text-3xl font-semibold text-gray-900 mb-2">
          Welcome back
        </Text>
        <Text className="text-gray-500 mb-8">
          Sign in to continue
        </Text>

        {/* Email */}
        <TextInput
          placeholder="Email"
          placeholderTextColor="#9CA3AF"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          className="bg-gray-100 rounded-full px-5 py-4 mb-4 text-gray-900"
        />

        {/* Password */}
        <TextInput
          placeholder="Password"
          placeholderTextColor="#9CA3AF"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          className="bg-gray-100 rounded-full px-5 py-4 mb-6 text-gray-900"
        />

        {/* Login Button */}
        <Pressable className="bg-[#FFD54F] rounded-full py-4 items-center">
          <Text className="text-gray-900 font-semibold text-base">
            Log in
          </Text>
        </Pressable>

        {/* Footer */}
        <Pressable className="mt-6">
          <Text className="text-center text-gray-500">
            Forgot your password?
          </Text>
        </Pressable>

      </View>
    </View>
  );
}
