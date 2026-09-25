import { colors } from "@/styles/global";
import { Stack } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function RootLayout() {
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

