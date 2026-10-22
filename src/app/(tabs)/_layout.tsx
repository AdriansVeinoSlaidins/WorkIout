import HomeHeader from "@/components/common/HomeHeader";
import { useTheme, useThemedStyles } from "@/context/themeContext";
import { createGlobalStyles } from "@/styles/global";
import { Ionicons } from "@expo/vector-icons";
import { router, Tabs } from "expo-router";
import { useEffect } from "react";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useAuth } from "../../hooks/useAuth";

export default function TabLayout() {
  const { session, loading } = useAuth();
  const { colors } = useTheme();
  const globalStyles = useThemedStyles(createGlobalStyles);
  const insets = useSafeAreaInsets();

  useEffect(() => {
    if (!loading && !session) {
      router.replace("/account");
    }
  }, [loading, session]);

  return (
    <View
      style={[globalStyles.container, { paddingTop: 0, }]}
    >
      <View style={{backgroundColor: colors.header, paddingTop: insets.top }}>
        <HomeHeader />
      </View>

      <Tabs
        backBehavior="history"
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            backgroundColor: colors.surface,
            borderTopColor: colors.surfaceLight,
          },
          tabBarActiveTintColor: colors.primary,
          tabBarInactiveTintColor: colors.textSecondary,
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "Home",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="home" size={size} color={color} />
            ),
          }}
        />

        <Tabs.Screen
          name="workout"
          options={{
            title: "Workout",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="add-circle" size={size} color={color} />
            ),
          }}
        />

        <Tabs.Screen
          name="profile"
          options={{
            title: "Profile",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="person" size={size} color={color} />
            ),
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
  );
}