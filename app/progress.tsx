import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { View, Text, ScrollView } from "react-native";



export default function Progress() {
    const [xp, setXp] = useState(0);
    const [completed, setCompleted] = useState<string[]>([]);
    const LEVEL_XP = 100;
    const progress = xp % LEVEL_XP;
    const progressPercent = (progress / LEVEL_XP) * 100;
    const activitiesCompleted = Math.floor(xp / 10);

    const fetchXP = async () => {
        try {
            const storedXP = await AsyncStorage.getItem("completedActivities");
            console.log("Stored XP raw value:", storedXP);
            setCompleted(storedXP ? JSON.parse(storedXP) : []);
            const parsed: string[] = storedXP ? JSON.parse(storedXP) : [];
            setXp(parsed.length * 10); // Assuming each activity gives 10 XP
            console.log("Calculated XP:", parsed.length * 10);
        } catch (e) {
            console.error("Failed to load XP:", e);
        }
    };



    useEffect(() => {
        // Load XP from AsyncStorage when the component mounts
        fetchXP();
    }, []);
    return (


        <ScrollView className="flex-1 bg-background px-4 pt-10">

            {/* Hero Illustration */}
            <View className="bg-brand-light mt-2 rounded-3xl p-6 shadow-sm mb-6 items-center">
                <Text className="text-4xl mb-3">🧘‍♂️</Text>
                <Text className="text-xl font-rubik-semibold text-gray-900">
                    Your Inner Journey
                </Text>
                <Text className="text-gray-500 text-center mt-2">
                    Calm mind. Focused life. Consistent growth.
                </Text>
            </View>

            {/* XP Orb */}
            <View className="self-center mb-6 bg-primary px-6 py-3 rounded-full shadow-md">
                <Text className="text-white font-semibold text-base ">
                    ✨ {xp} XP
                </Text>
            </View>

            {/* Progress Card */}
            <View className="bg-white rounded-3xl p-6 shadow-sm mb-6">
                <View className="flex-row items-center mb-4">
                    <Text className="text-3xl mr-3">🌱</Text>
                    <View>
                        <Text className="text-lg font-semibold text-gray-900">
                            Growth Level
                        </Text>
                        <Text className="text-gray-500 text-sm">
                            Building momentum
                        </Text>
                    </View>
                </View>

                <View className="h-4 bg-gray-200 rounded-full overflow-hidden">
                    <View
                        className="h-4 bg-black rounded-full"
                        style={{ width: `${progressPercent}%` }}
                    />
                </View>

                <Text className="text-sm text-gray-600 mt-3">
                    {progress} / {LEVEL_XP} XP to next level
                </Text>
            </View>

            {/* Illustration Stats */}
            <View className="flex-row justify-between mb-6">

                <View className="flex-1 bg-white rounded-2xl p-5 mr-3 shadow-sm items-center">
                    <Text className="text-4xl mb-2">🔥</Text>
                    <Text className="text-lg font-semibold text-gray-900">
                        {activitiesCompleted}
                    </Text>
                    <Text className="text-gray-500 text-sm">
                        Activities
                    </Text>
                </View>

                <View className="flex-1 bg-white rounded-2xl p-5 ml-3 shadow-sm items-center">
                    <Text className="text-4xl mb-2">🏔️</Text>
                    <Text className="text-lg font-semibold text-gray-900">
                        Level {Math.floor(xp / LEVEL_XP) + 1}
                    </Text>
                    <Text className="text-gray-500 text-sm">
                        Journey
                    </Text>
                </View>

            </View>

            {/* Recent Activity Scene */}
            <View className="bg-white rounded-3xl p-6 shadow-sm mb-6">
                <View className="flex-row items-center mb-4">
                    <Text className="text-3xl mr-3">🌄</Text>
                    <Text className="text-lg font-rubik-semibold text-gray-900">
                        Recent Steps
                    </Text>
                </View>

                {completed.length === 0 ? (
                    <Text className="text-gray-500 italic">
                        Your journey starts with the first calm breath 🌬️
                    </Text>
                ) : (
                    completed.map((activity, index) => (
                        <View key={index} className="flex-row items-center mb-3">
                            <Text className="text-xl mr-3">✨</Text>
                            <Text className="text-gray-700">{activity}</Text>
                        </View>
                    ))
                )}
            </View>

            {/* Motivation Illustration */}
            <View className="bg-white rounded-3xl p-6 shadow-sm items-center mb-8">
                <Text className="text-5xl mb-3">🎯</Text>
                <Text className="text-center text-gray-700 font-medium">
                    Small habits. Big change.
                </Text>
                <Text className="text-center text-gray-500 mt-1 text-sm">
                    Consistency shapes identity.
                </Text>
            </View>

        </ScrollView>


    );
}