import { View, Text, Pressable } from "react-native";
import { useState } from "react";

const moods = [
  { label: "Very low", emoji: "😔" },
  { label: "Low", emoji: "😟" },
  { label: "Okay", emoji: "😐" },
  { label: "Good", emoji: "🙂" },
  { label: "Very good", emoji: "😄" },
];

export default function HomeScreen() {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <View className="flex-1 justify-center bg-gray-50 px-6">
      <Text className="text-2xl font-semibold text-center mb-2">
        How are you feeling today?
      </Text>

      <Text className="text-sm text-gray-600 text-center mb-8">
        Take a moment. There’s no right or wrong answer.
      </Text>

      <View className="flex-row flex-wrap justify-between">
        {moods.map((mood, index) => (
          <Pressable
            key={index}
            onPress={() => setSelected(index)}
            className={`w-[30%] mb-4 rounded-2xl border p-4 items-center
              ${
                selected === index
                  ? "border-brand bg-amber-50"
                  : "border-gray-200 bg-white"
              }`}
          >
            <Text className="text-3xl mb-1">{mood.emoji}</Text>
            <Text className="text-xs text-gray-700">{mood.label}</Text>
          </Pressable>
        ))}
      </View>

      {selected !== null && (
        <Text className="mt-6 text-center text-gray-700 text-base">
          Thanks for checking in 💛
        </Text>
      )}
    </View>
  );
}
