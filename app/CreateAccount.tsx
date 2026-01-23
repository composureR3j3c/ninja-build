import GoogleIcon from "@/components/GoogleIcon";
import { login } from '@/lib/appwrite';
import { useGlobalContext } from "@/lib/global-provider";
import { Redirect } from "expo-router";
import { useState } from "react";
import { Alert, Pressable, Text, View } from "react-native";



export default function SignupScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [showError, setShowError] = useState(false);

  const { refetch, loading, isLogged } = useGlobalContext();

  if (!loading && isLogged) return <Redirect href="/" />;


  const handleGoogleContinue = async () => {
    console.log("Google continue pressed"+agreed);
    if (!agreed) {
      setShowError(true);
      return;
    }
    const result = await login();
        if (result) {
        // console.log("Login successful");
            <Redirect href="/" />
            refetch();
        } else {
            Alert.alert("Error", "Failed to login");
        }
  };


  return (
    <View className="flex-1 bg-[#F6F7F4] justify-center px-6">
      <View className="bg-white rounded-3xl p-8 shadow-sm">

        <Text className="text-3xl font-semibold text-gray-900 mb-2">
          Create account
        </Text>
        <Text className="text-gray-500 mb-8">
          Start your journey with calm
        </Text>


        {/* Privacy checkbox */}
        <Pressable
          onPress={() => {
            setAgreed(!agreed);
            setShowError(false);
          }}
          className="flex-row items-center mb-3"
        >
          <View
            className={`w-5 h-5 rounded-md border mr-3 items-center justify-center
              ${agreed && "border-black bg-brand"}
            `}
          >
            
            {agreed && <View className="w-2.5 h-2.5 bg-gray-900 rounded-sm" />}
          </View>

          <Text className="text-gray-600 flex-1 text-sm">
            I agree to the Privacy Policy and Terms
          </Text>
        </Pressable>

        {/* Error message */}
        {showError && (
          <Text className="text-sm text-red-500 mb-4">
            Please agree to the privacy policy to continue
          </Text>
        )}

        {/* Create account button */}
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
      ${agreed ? "text-gray-900" : "text-gray-500"}
    `}
          >
            Continue with Google
          </Text>
        </Pressable>


      </View>
    </View>
  );
}
