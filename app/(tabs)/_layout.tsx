import { Tabs } from 'expo-router';
import React from 'react';

import { HapticTab } from '@/components/haptic-tab';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Ionicons } from "@expo/vector-icons";
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tabIconDefault,
        tabBarActiveBackgroundColor: Colors[colorScheme ?? 'light'].tint,
        tabBarInactiveBackgroundColor: Colors[colorScheme ?? 'light'].tint,
        // tabBarInactiveTintColor: Colors[colorScheme ?? 'light'].tabIconDefault,
        headerShown: false,
        tabBarButton: (props) => <HapticTab {...props} />,
        tabBarStyle: {
          backgroundColor: "#DEDAD3",
          borderTopWidth: 0,
        },
      }}
      
      >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <IconSymbol size={20} name="house.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color }) => <Ionicons name="person" size={20} color={color} />,
        }}
      />
        <Tabs.Screen
        name="record"
        options={{
          title: 'Record',
          tabBarIcon: ({ color }) => <Ionicons name="mic" size={20} color={color} />,
        }}
      />
       <Tabs.Screen
        name="welcomeScreen"
        options={{
          title: 'Welcome',
          tabBarIcon: ({ color }) => <Ionicons size={20} name="game-controller" color={color} />,
        }}
      />
      
    </Tabs>
  );
}
