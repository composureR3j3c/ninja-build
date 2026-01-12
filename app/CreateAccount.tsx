import { View, Text, TextInput, Pressable } from "react-native";
import { useState } from "react"; import { AntDesign } from "@expo/vector-icons";



export default function SignupScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [showError, setShowError] = useState(false);

  const handleCreateAccount = () => {
    if (!agreed) {
      setShowError(true);
      return;
    }

    // proceed with signup
    console.log("Creating account...");
  };

  function handleGoogleContinue(): void {
    throw new Error("Function not implemented.");
  }

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
            `}
          >
            {/* {agreed && <View className="w-2.5 h-2.5 bg-gray-900 rounded-sm" />} */}
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
             border border-[#FFD54F]-700
  `}
        >
          <AntDesign name="google" size={25} color="#FFD54F" style={{ marginRight: 12 }} />

          <Text
            className={`font-medium text-base
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
