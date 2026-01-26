import { useState } from "react";
import { FlatList, Pressable, ScrollView, Text, View } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage
// import { useGlobalContext } from "@/lib/global-provider";
import { ScaleWrapper } from "@/components/animated/ScaleWrapper";
import { router } from "expo-router";
import { MediationListItem } from "@/components/MeditationListItem";
import { ACTIVITIES, meditations, MOODS } from "@/data";
import { Mood } from "@/types";
// import { useAppwrite } from "@/lib/useAppwrite";
// import { getLatestProperties, getProperties } from "@/lib/appwrite";

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
             
              <View
                
                className={`rounded-full px-4 py-2 items-center justify-center w-28
                  ${isDone ? "bg-primary-soft" : "bg-primary"}
                `}
              >
                <Text
                  className={` ${isDone ? "font-large font-bold text-gray-300" : "font-medium text-white"}`}
                >
                  {isDone ? "✔️" : `+${XP_PER_ACTIVITY} XP`}
                </Text>
              </View>
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
    <View className="h-20" />
    </ScrollView>
  );
}
