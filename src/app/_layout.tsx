
import { RestTimeProvider } from "@/context/restTimeContext";
import { ThemeProvider, useTheme } from "@/context/themeContext";
import { WorkoutProvider } from "@/context/workoutContext";
import { Stack } from "expo-router";
import { useEffect } from "react";
import { AppState } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { supabase } from "../../lib/supabase";

function AuthRefreshHandler() {
  useEffect(() => {
    const handleAppStateChange = (state: string) => {
      if (state === "active") {
        supabase.auth.startAutoRefresh();
      } else {
        supabase.auth.stopAutoRefresh();
      }
    };

    const subscription = AppState.addEventListener(
      "change",
      handleAppStateChange
    );

    if (AppState.currentState === "active") {
      supabase.auth.startAutoRefresh();
    }

    return () => subscription.remove();
  }, []);

  return null;
}

function RootStack() {
  const { colors } = useTheme();

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        
        //animation: "none",
        contentStyle: {
          backgroundColor: colors.background,
        },
      }}
    >
      <Stack.Screen name="(tabs)" />

      <Stack.Screen
        name="account"
        options={{
          title: "Log in",
          headerShown: true,
          presentation: "card",
          //animation: "none",
          contentStyle: {
            backgroundColor: colors.surface,
          },
          headerStyle: {
            backgroundColor: colors.header,
          },
          headerTintColor: colors.text,
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      />

      <Stack.Screen
        name="signUp"
        options={{
          title: "Sign up",
          headerShown: true,
          presentation: "card",
          //animation: "none",
          contentStyle: {
            backgroundColor: colors.surface,
          },
          headerStyle: {
            backgroundColor: colors.header,
          },
          headerTintColor: colors.text,
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      />

      
      <Stack.Screen
        name="streak"
        options={{
          title: "Streak",
          headerShown: true,
          presentation: "card",
          contentStyle: {
            backgroundColor: colors.surface,
          },
          headerStyle: {
            backgroundColor: colors.header,
          },
          headerTintColor: colors.text,
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      />
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <GestureHandlerRootView
      style={{
        flex: 1,
        backgroundColor: "#000000",
      }}
    >
      <RestTimeProvider>
        <ThemeProvider>
          <WorkoutProvider>
            <AuthRefreshHandler />
            <RootStack />
          </WorkoutProvider>
        </ThemeProvider>
      </RestTimeProvider>
    </GestureHandlerRootView>
  );
}
