import HomeHeader from "@/components/HomeHeader";
import { colors, globalStyles } from "@/styles/global";
import { Ionicons } from "@expo/vector-icons";
import { router, Tabs } from "expo-router";
import { useEffect } from "react";
import { View } from "react-native";
import { useAuth } from "../../hooks/useAuth";


export default function TabLayout() {
  const { session, loading } = useAuth();

  useEffect(() => {
    if (!loading && !session) {
      router.replace("/account");
    }
}, [loading, session]);

    return(
      <View style={globalStyles.container}>
        
        <HomeHeader/>

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
            tabBarIcon: ({ color, size }) => (<Ionicons name='home' size={size} color={color} />),
          }}
        />
        <Tabs.Screen
          name='workout'
          options={{
            title: 'Workout',
            tabBarIcon: ({ color, size }) => (<Ionicons name='add-circle' size={size} color={color} />),
          }}
        />
        <Tabs.Screen
          name='profile'
          options={{
            title: 'Profile',
            tabBarIcon: ({ color, size }) => (<Ionicons name='person' size={size} color={color} />),
          }}
        />
        <Tabs.Screen
          name="workoutList"
          options={{
            href: null,
          }}
        />
        </Tabs>
      </View>

    )
}