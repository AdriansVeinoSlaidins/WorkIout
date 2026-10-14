import { ThemeProvider, useTheme } from "@/context/themeContext";
import { WorkoutProvider } from "@/context/workoutContext";
import { Stack } from "expo-router";
import { AppState } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { supabase } from "../../lib/supabase";

AppState.addEventListener("change", (state) => {
  if (state === "active") {
    supabase.auth.startAutoRefresh();
  } else {
    supabase.auth.stopAutoRefresh();
  }
});

function RootStack() {
  const { colors } = useTheme();

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" />

      <Stack.Screen
        name="account"
        options={{
          title: "Log in",
          headerShown: true,
          presentation: "modal",
          headerStyle: { backgroundColor: colors.background },
          headerTintColor: colors.text,
          headerTitleStyle: { fontWeight: "bold" },
        }}
      />
      <Stack.Screen
        name="signUp"
        options={{
          title: "Sign up",
          headerShown: true,
          presentation: "modal",
          headerStyle: { backgroundColor: colors.background },
          headerTintColor: colors.text,
          headerTitleStyle: { fontWeight: "bold" },
        }}
      />
      <Stack.Screen
        name="settings"
        options={{
          headerShown: false,
          presentation: "modal",
        }}
      />
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemeProvider>
        <WorkoutProvider>
          <RootStack />
        </WorkoutProvider>
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}