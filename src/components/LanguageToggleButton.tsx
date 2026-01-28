import { Pressable, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useLanguage } from "@/src/context/LanguageProvider";

export default function LanguageToggleButton() {
  const { lang, setLang } = useLanguage();

  const toggleLanguage = () => {
    setLang(lang === "en" ? "am" : "en");
  };

  return (
    <Pressable
      onPress={toggleLanguage}
      className="flex-row items-center gap-2 px-4 py-2 rounded-full bg-gray-100"
      android_ripple={{ color: "#e5e7eb", radius: 24 }}
    >
      <Ionicons
        name="language-outline"
        size={18}
        color="#374151"
      />

      <View className="flex-row items-center">
        <Text
          className={`text-sm font-medium ${
            lang === "en" ? "text-gray-900" : "text-gray-400"
          }`}
        >
          EN
        </Text>

        <Text className="mx-1 text-gray-400">/</Text>

        <Text
          className={`text-sm font-medium ${
            lang === "am" ? "text-gray-900" : "text-gray-400"
          }`}
        >
          አማ
        </Text>
      </View>
    </Pressable>
  );
}
