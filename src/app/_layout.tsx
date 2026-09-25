import { colors } from "@/styles/global";
import { Stack } from "expo-router";
import { AppState } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { supabase } from "../../lib/supabase";




export default function RootLayout() {
  AppState.addEventListener("change", (state) => {
  if (state === "active") {
    supabase.auth.startAutoRefresh();
  } else {
    supabase.auth.stopAutoRefresh();
  }
});
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" />

        <Stack.Screen
          name="account"
          options={{
            title: "Log in",
            headerShown: true,
            presentation: "modal",
            headerStyle: {
              backgroundColor: colors.background
            },
            headerTintColor: "#ffffff",
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
            presentation: "modal",
            headerStyle: {
              backgroundColor: colors.background
            },
            headerTintColor: "#ffffff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        />
      </Stack>
    </GestureHandlerRootView>
  );
}

