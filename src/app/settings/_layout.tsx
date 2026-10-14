import { useTheme } from "@/context/themeContext";
import { Stack } from "expo-router";

export default function SettingsLayout() {
  const {colors} = useTheme()
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.header
          
        },
        headerTintColor: "#ffffff",
        headerTitleStyle: {
          fontWeight: "bold",
        },
      }}
    >
        <Stack.Screen name="index" options={{ title: "Settings" }} /> 
        <Stack.Screen name="themes" options={{ title: "Themes" }} />
        <Stack.Screen name="units" options={{ title: "Units" }} />
        <Stack.Screen name="languages" options={{ title: "Languages" }} />
        <Stack.Screen name="preferences" options={{ title: "Preferences" }} />
    </Stack>
  );
}