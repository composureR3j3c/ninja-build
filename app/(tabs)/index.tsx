import { useState } from "react";
import { FlatList, Pressable, ScrollView, Text, View } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage
// import { useGlobalContext } from "@/lib/global-provider";
import { ScaleWrapper } from "@/components/animated/ScaleWrapper";
import { router } from "expo-router";
import { MediationListItem } from "@/components/MeditationListItem";
import { meditations } from "@/data";
// import { useAppwrite } from "@/lib/useAppwrite";
// import { getLatestProperties, getProperties } from "@/lib/appwrite";

type Mood =
  | "calm"
  | "stressed"
  | "tired"
  | "sad"
  | "focused"
  | "anxious"
  | "unmotivated"
  | "overwhelmed"
  | "energetic"
  | "lonely"
  | "happy"
  | "creative";
const MOODS: { id: string; key: Mood; label: string; emoji: string }[] = [
  { id: "1", key: "calm", label: "Calm", emoji: "😌" },
  { id: "2", key: "stressed", label: "Stressed", emoji: "😣" },
  { id: "3", key: "tired", label: "Tired", emoji: "😴" },
  { id: "4", key: "sad", label: "Sad", emoji: "😔" },
  { id: "5", key: "focused", label: "Focused", emoji: "🎯" },
  { id: "6", key: "anxious", label: "Anxious", emoji: "😰" },
  { id: "7", key: "unmotivated", label: "Unmotivated", emoji: "😕" },
  { id: "8", key: "overwhelmed", label: "Overwhelmed", emoji: "😵‍💫" },
  { id: "9", key: "energetic", label: "Energetic", emoji: "⚡" },
  { id: "10", key: "lonely", label: "Lonely", emoji: "🫂" },
  { id: "11", key: "happy", label: "Happy", emoji: "😊" },
  { id: "12", key: "creative", label: "Creative", emoji: "🎨" },
];

const ACTIVITIES: Record<Mood, string[]> = {
  calm: ["Gratitude reflection", "Gentle breathing", "Body scan"],
  stressed: ["Breathing reset", "Letting go", "Tension release"],
  tired: ["Wake-up breathing", "Mindful stretch", "Energy reset"],
  sad: ["Self-compassion", "Emotional check-in", "Kind thoughts"],
  focused: ["Focus timer", "Clarity breathing", "Goal setting"],
  anxious: [
    "4-7-8 breathing",
    "Grounding exercise (5-4-3-2-1)",
    "Reassurance notes",
  ],
  unmotivated: ["2-minute rule", "Tiny task list", "Motivation boost audio"],
  overwhelmed: ["Task dump", "Priority sorting", "Guided calm-down"],
  energetic: [
    "Quick workout",
    "Creative brainstorm",
    "Fast-paced focus sprint",
  ],
  lonely: ["Reach-out reminder", "Connection reflection", "Guided reassurance"],
  happy: ["Positive journaling", "Share gratitude", "Celebrate wins"],
  creative: ["Free writing", "Idea sketching", "Music-inspired creation"],
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

  const completeActivity = async (activity: string) => {

    if (completed.includes(activity)) return;
    try {
      const stored = await AsyncStorage.getItem("completedActivities");
      const parsed: string[] = stored ? JSON.parse(stored) : [];
      const newCompleted = parsed.includes(activity) ? parsed : [...parsed, activity];
      setCompleted(newCompleted);
      setXp((prev) => prev + XP_PER_ACTIVITY);
    } catch (e) {
      // fallback to in-memory update if storage fails
      const newCompleted = completed.includes(activity) ? completed : [...completed, activity];
      setCompleted(newCompleted);
      setXp((prev) => prev + XP_PER_ACTIVITY);
    }
  };

  return (
    <ScrollView className="flex-1 bg-background px-4 pt-12">
      {/* Header */}
      <View className="flex-row justify-between items-center mb-6">
        <View>
          <Text className="text-lg font-semibold text-gray-900">
            How are you feeling today?
          </Text>
          <Text className="text-gray-600">Choose a mood and begin</Text>
        </View>

        {/* XP badge */}
        <View className="bg-primary-soft px-4 py-2 rounded-full">
          <Text className="text-primary font-semibold">✨ {xp} XP</Text>
        </View>
      </View>

      {/* Mood selector */}
      <View className="flex-row flex-wrap justify-evenly mb-8">
        {MOODS.map((mood) => {
          const active = selectedMood === mood.key;

          return (
            <ScaleWrapper active={active} key={mood.key}>
              <Pressable
                key={mood.key}
                onPress={() => setSelectedMood(mood.key)}
                className={`mb-4 rounded-2xl p-4 items-center
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
          <Pressable
            key={activity}
            onPress={() => {
              // mark activity complete, persist then navigate so status is retained when coming back
              const newCompleted = completed.includes(activity)
                ? completed
                : [...completed, activity];
              const newXp = completed.includes(activity)
                ? xp
                : xp + XP_PER_ACTIVITY;
              completeActivity(activity);
              (async () => {
                try {
                  await AsyncStorage.setItem(
                    "completedActivities",
                    JSON.stringify(newCompleted),
                  );
                  await AsyncStorage.setItem("xp", String(newXp));
                } catch (e) {
                  // ignore
                }
                // router.push("/ActivityScreen/" + activity.replace(/ /g, '-').toLowerCase());
                router.push(`/meditation/${MOODS.find(m => m.key === selectedMood)?.id}/`);

              })();
            }}
            className="bg-white rounded-2xl p-5 mb-4"
          >
            <View className="flex-row justify-between items-center">
              <Text className="text-gray-900 font-medium">{activity}</Text>

              <Pressable
                // onPress={() => completeActivity(activity)}
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
          </Pressable>
          
    
        );
      })}
      {/* <FlatList
      data={meditations}
      className="bg-white"
      contentContainerClassName="gap-8 p-3"
      renderItem={({ item }) => <MediationListItem meditation={item} />}
      keyExtractor={(item) => item.id.toString()}
    /> */}
    </ScrollView>
  );
}
