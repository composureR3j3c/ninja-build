import { View, Text, Pressable, ScrollView } from "react-native";
import { useEffect, useState } from "react";
// import { useGlobalContext } from "@/lib/global-provider";
import { useLocalSearchParams } from "expo-router"
import { ScaleIn } from "@/components/animated/ScaleIn";
import { AnimatedPressable } from "@/components/animated/AnimatedPressable";
import { ScaleWrapper } from "@/components/animated/ScaleWrapper";
// import { useAppwrite } from "@/lib/useAppwrite";
// import { getLatestProperties, getProperties } from "@/lib/appwrite";

type Mood = "calm" | "stressed" | "tired" | "sad" | "focused" | "anxious" | "unmotivated" | "overwhelmed" | "energetic" | "lonely" | "happy" | "creative";
const MOODS: { key: Mood; label: string; emoji: string }[] = [
  { key: "calm", label: "Calm", emoji: "😌", },
  { key: "stressed", label: "Stressed", emoji: "😣", },
  { key: "tired", label: "Tired", emoji: "😴",},
  { key: "sad", label: "Sad", emoji: "😔"},
  { key: "focused", label: "Focused", emoji: "🎯"},
  { key: "anxious", label: "Anxious", emoji: "😰", },
  { key: "unmotivated", label: "Unmotivated", emoji: "😕", },
  { key: "overwhelmed", label: "Overwhelmed", emoji: "😵‍💫", },
  { key: "energetic", label: "Energetic", emoji: "⚡", },
  { key: "lonely", label: "Lonely", emoji: "🫂", },
  { key: "happy", label: "Happy", emoji: "😊", },
  { key: "creative", label: "Creative", emoji: "🎨", },
];

const ACTIVITIES: Record<Mood, string[]> = {
  calm: ["Gratitude reflection", "Gentle breathing", "Body scan"],
  stressed: ["Breathing reset", "Letting go", "Tension release"],
  tired: ["Wake-up breathing", "Mindful stretch", "Energy reset"],
  sad: ["Self-compassion", "Emotional check-in", "Kind thoughts"],
  focused: ["Focus timer", "Clarity breathing", "Goal setting"],
anxious:[ "4-7-8 breathing", "Grounding exercise (5-4-3-2-1)", "Reassurance notes"],
unmotivated:["2-minute rule", "Tiny task list", "Motivation boost audio"],
overwhelmed:["Task dump", "Priority sorting", "Guided calm-down"],
energetic:["Quick workout", "Creative brainstorm", "Fast-paced focus sprint"],
lonely:["Reach-out reminder", "Connection reflection", "Guided reassurance"],
happy:["Positive journaling", "Share gratitude", "Celebrate wins"],
creative:["Free writing", "Idea sketching", "Music-inspired creation"],
  
};

const XP_PER_ACTIVITY = 10;

export default function HomeScreen() {
  const [selectedMood, setSelectedMood] = useState<Mood>("calm");
  const [xp, setXp] = useState(0);
  const [completed, setCompleted] = useState<string[]>([]);

  // const { user } = useGlobalContext();

  // const params = useLocalSearchParams<{ query?: string; filter?: string }>();

  // const { data: latestProperties, loading: latestPropertiesLoading } =
  //   useAppwrite({
  //     fn: getLatestProperties,
  //   });

  // const {
  //   data: properties,
  //   refetch,
  //   loading,
  // } = useAppwrite({
  //   fn: getProperties,
  //   params: {
  //     filter: params.filter!,
  //     query: params.query!,
  //     limit: 6,
  //   },
  //   skip: true,
  // });

  // useEffect(() => {
  //   refetch({
  //     filter: params.filter!,
  //     query: params.query!,
  //     limit: 6,
  //   });
  // }, [params.filter, params.query]);

  const completeActivity = (activity: string) => {
    if (completed.includes(activity)) return;

    setCompleted([...completed, activity]);
    setXp((prev) => prev + XP_PER_ACTIVITY);
  };

  return (
    <ScrollView className="flex-1 bg-background px-4 pt-12">
      
      {/* Header */}
      <View className="flex-row justify-between items-center mb-6">
        <View>
          <Text className="text-lg font-semibold text-gray-900">
            How are you feeling today?
          </Text>
          <Text className="text-gray-600">
            Choose a mood and begin
          </Text>
        </View>

        {/* XP badge */}
        <View className="bg-primary-soft px-4 py-2 rounded-full">
          <Text className="text-primary font-semibold">
            ✨ {xp} XP
          </Text>
        </View>
      </View>

      {/* Mood selector */}
      <View className="flex-row flex-wrap justify-evenly mb-8">
        {MOODS.map((mood) => {
          const active = selectedMood === mood.key;

          return (
          
            <ScaleWrapper active={active}key={mood.key}>
            <Pressable
              key={mood.key}
              onPress={() => setSelectedMood(mood.key)}
              className={`mb-4 rounded-2xl p-4 items-center
                ${active ? "bg-primary-soft" : "bg-gray-100"}
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
            </ScaleWrapper>
          );
        })}
      </View>

      {/* Activities */}
      <Text className="text-xl font-semibold text-gray-900 mb-4">
        Recommended for you
      </Text>

      {ACTIVITIES[selectedMood].map((activity) => {
        const isDone = completed.includes(activity);

        return (
          <View
            key={activity}
            className="bg-white rounded-2xl p-5 mb-4"
          >
            <View className="flex-row justify-between items-center">
              <Text className="text-gray-900 font-medium">
                {activity}
              </Text>

              <Pressable
                onPress={() => completeActivity(activity)}
                className={`rounded-full px-4 py-2 items-center justify-center w-28
                  ${isDone ? "bg-gray-200" : "bg-primary"}
                `}
              >
                <Text
                  className={`font-medium ${isDone ? "text-gray-500" : "text-white"}`}
                >
                  {isDone ? "✓" : `+${XP_PER_ACTIVITY} XP`}
                </Text>
              </Pressable>
            </View>
          </View>
        );
      })}
    </ScrollView>
  );
}
