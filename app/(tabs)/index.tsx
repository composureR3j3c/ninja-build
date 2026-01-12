import { View, Text, Pressable, ScrollView } from "react-native";
import { useState } from "react";

type Mood = "calm" | "stressed" | "tired" | "sad" | "focused";

const MOODS: { key: Mood; label: string; emoji: string }[] = [
  { key: "calm", label: "Calm", emoji: "😌" },
  { key: "stressed", label: "Stressed", emoji: "😣" },
  { key: "tired", label: "Tired", emoji: "😴" },
  { key: "sad", label: "Sad", emoji: "😔" },
  { key: "focused", label: "Focused", emoji: "🎯" },
];

const ACTIVITIES: Record<Mood, string[]> = {
  calm: [
    "5-minute gratitude reflection",
    "Gentle breathing",
    "Body scan meditation",
  ],
  stressed: [
    "3-minute breathing reset",
    "Letting go exercise",
    "Tension release meditation",
  ],
  tired: [
    "Gentle wake-up breathing",
    "Mindful stretching",
    "Energy reset",
  ],
  sad: [
    "Self-compassion meditation",
    "Emotional check-in",
    "Kind thoughts practice",
  ],
  focused: [
    "Focus timer (10 min)",
    "Clarity breathing",
    "Intentional goal setting",
  ],
};

export default function HomeScreen() {
  const [selectedMood, setSelectedMood] = useState<Mood>("calm");

  return (
    <ScrollView className="flex-1 bg-[#F6F7F4] px-6 pt-12">
      
      {/* Header */}
      <Text className="text-2xl font-semibold text-gray-900 mb-2">
        How are you feeling today?
      </Text>
      <Text className="text-gray-600 mb-6">
        Choose a mood and we’ll suggest something helpful
      </Text>

      {/* Mood selector */}
      <View className="flex-row flex-wrap justify-between mb-8">
        {MOODS.map((mood) => {
          const active = selectedMood === mood.key;

          return (
            <Pressable
              key={mood.key}
              onPress={() => setSelectedMood(mood.key)}
              className={`w-[48%] mb-4 rounded-2xl p-4 items-center
                ${active ? "bg-primary-soft" : "bg-white"}
              `}
            >
              <Text className="text-3xl mb-2">{mood.emoji}</Text>
              <Text
                className={`font-medium
                  ${active ? "text-primary" : "text-gray-700"}
                `}
              >
                {mood.label}
              </Text>
            </Pressable>
          );
        })}
      </View>

      {/* Recommended activities */}
      <Text className="text-xl font-semibold text-gray-900 mb-4">
        Recommended for you
      </Text>

      {ACTIVITIES[selectedMood].map((activity, index) => (
        <Pressable
          key={index}
          className="bg-white rounded-2xl p-5 mb-4"
        >
          <Text className="text-gray-900 font-medium mb-1">
            {activity}
          </Text>
          <Text className="text-gray-500 text-sm">
            {selectedMood.charAt(0).toUpperCase() + selectedMood.slice(1)} support
          </Text>
        </Pressable>
      ))}

    </ScrollView>
  );
}
