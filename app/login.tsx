import { View, Text, TextInput, Pressable, Alert } from "react-native";
import { useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import GoogleIcon from "@/src/components/GoogleIcon";
import { Redirect } from "expo-router";
import { useGlobalContext } from "@/lib/global-provider";
import { login } from "@/lib/appwrite";

export default function LoginScreen() {
  const { refetch, loading, isLogged } = useGlobalContext();
  
    if (!loading && isLogged) return <Redirect href="/" />;
  
  
    const handleGoogleContinue = async () => {
      const result = await login();
          if (result) {
          console.log("Login successful");
          
              <Redirect href="/" />
              refetch();
          } else {
              Alert.alert("Error", "Failed to login");
          }
    };

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
         {/* Log in button */}
        <Pressable
                  onPress={handleGoogleContinue}
                  className={`rounded-full py-2 my-3 items-center flex-row justify-center
                     justify-content-end
                     border border-brand-dark
          `}
                >
                  <GoogleIcon size={24}/>
                  {/* <AntDesign name="google" size={25} color="#E8A926" style={{ marginRight: 12 }} /> */}
        
                  <Text
                    className={`font-medium text-base ml-3
            `}
                  >
                    Continue with Google
                  </Text>
                </Pressable>
        
        


        {/* <TextInput
          placeholder="Email"
          placeholderTextColor="#9CA3AF"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          className="bg-gray-100 rounded-full px-5 py-4 mb-4 text-gray-900"
        />

        <TextInput
          placeholder="Password"
          placeholderTextColor="#9CA3AF"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          className="bg-gray-100 rounded-full px-5 py-4 mb-6 text-gray-900"
        /> */}

        {/* Login Button */}
        {/* <Pressable className="bg-[#FFD54F] rounded-full py-4 items-center">
          <Text className="text-gray-900 font-semibold text-base">
            Log in
          </Text>
        </Pressable>

        {/* Footer */}
        {/* <Pressable className="mt-6">
          <Text className="text-center text-gray-500">
            Forgot your password?
          </Text>
        </Pressable>  */}

      </View>
    </View>
  );
}
