import { Pressable, Text, View } from "react-native";
import { useLanguage } from "@/src/context/LanguageProvider";

export default function LanguageToggleButton() {
  const { lang, setLang } = useLanguage();

  const toggleLanguage = () => {
    setLang(lang === "en" ? "am" : "en");
  };

  return (
    <Pressable
      onPress={toggleLanguage}
      className="flex-row items-center bg-white px-4 py-2 rounded-full shadow-sm"
    >
      <Text className="text-lg mr-2">
        {lang === "en" ? "🇪🇹" : "🇬🇧"}
      </Text>
      <Text className="font-medium text-gray-800">
        {lang === "en" ? "አማርኛ" : "English"}
      </Text>
    </Pressable>
  );
}
