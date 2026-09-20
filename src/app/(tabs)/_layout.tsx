import { colors } from "@/styles/global";
import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons"


export default function TabLayout() {
    return(
        <Tabs
        screenOptions={{
            headerShown: false,
            tabBarStyle: {
                backgroundColor: colors.background,
                borderTopColor: colors.surface,
            },
            tabBarActiveTintColor: colors.primary,
            tabBarInactiveTintColor: colors.textSecondary,
        }}
        >
      <Tabs.Screen
        name='index'
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name='home' size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name='workout'
        options={{
          title: 'Workout',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name='add-circle' size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name='profile'
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name='person' size={size} color={color} />
          ),
        }}
      />
        </Tabs>
    )
}