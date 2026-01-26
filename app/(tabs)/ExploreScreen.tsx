import { View, Text, ScrollView, Pressable } from "react-native";

const FEATURED = [
  {
    id: "daily",
    title: "Daily Calm",
    subtitle: "10 min • Meditation",
    emoji: "🌿",
  },
  {
    id: "breathing",
    title: "Breathing Reset",
    subtitle: "5 min • Breathwork",
    emoji: "🌬️",
  },
  {
    id: "sleep",
    title: "Wind Down",
    subtitle: "15 min • Sleep",
    emoji: "🌙",
  },
    {
    id: "music",
    title: "Music",
    subtitle: "15 min • Sleep",
    emoji: "🎧",
  },
];

const CATEGORIES = [
  { id: "stress", title: "Stress Relief", emoji: "😮‍💨" },
  { id: "focus", title: "Focus", emoji: "🎯" },
  { id: "sleep", title: "Sleep", emoji: "😴" },
  { id: "anxiety", title: "Anxiety", emoji: "🧠" },
];

export default function ExploreScreen() {
  return (
    <ScrollView
      className="flex-1 bg-neutral-100"
      contentContainerStyle={{ paddingBottom: 32 }}
    >
      {/* Header */}
      <View className="px-6 pt-6 mb-4">
        <Text className="text-2xl font-semibold text-neutral-900">
          Explore
        </Text>
        <Text className="text-neutral-500 mt-1">
          Find what you need right now
        </Text>
      </View>

      {/* Featured */}
      <View
        className="mb-8 mb-4 flex items-center justify-start flex-row flex-wrap"
      >
        {FEATURED.map((item) => (
          <Pressable
            key={item.id}
            className="w-33 m-2 mb-4 bg-white rounded-2xl p-4 shadow-sm "
          >
            <Text className="text-3xl mb-2">{item.emoji}</Text>
            <Text className="text-base font-medium text-neutral-900">
              {item.title}
            </Text>
            <Text className="text-sm text-neutral-500 mt-1">
              {item.subtitle}
            </Text>
          </Pressable>
        ))}
      </View>

      {/* Categories */}
      <View className="px-6">
        <Text className="text-lg font-medium text-neutral-900 mb-4">
          Browse by category
        </Text>

        <View className="flex-row flex-wrap justify-between">
          {CATEGORIES.map((cat) => (
            <Pressable
              key={cat.id}
              className="w-[48%] mb-4 bg-white rounded-xl p-4"
            >
              <Text className="text-2xl mb-2">{cat.emoji}</Text>
              <Text className="text-neutral-800 font-medium">
                {cat.title}
              </Text>
            </Pressable>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}
