import { useTheme, useThemedStyles } from "@/context/themeContext";
import useStreak from "@/hooks/useStreak";
import { createGlobalStyles, ThemeColors } from "@/styles/global";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";

export default function Streak() {
  const {colors} = useTheme()
  const globalStyles = useThemedStyles(createGlobalStyles)
  const styles = useThemedStyles(createStyles)
  const {streak, trainedToday} = useStreak()
  
  


  return (
    <View style={styles.container}>
      <Text style={styles.text}>{streak > 0 ? `Your streak is ${streak}` : "No streak yet"}</Text>
      <View style={styles.flameContainer}>
        <Ionicons
          name="flame"
          size={200}
          color={trainedToday ? colors.primary : colors.text}
          style={{ opacity: trainedToday ? 1 : 0.5 }}
        />
        <Text style={styles.streakText}>{streak}</Text>
      </View>
    </View>
  );
}

const createStyles = (colors: ThemeColors) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: "center",
    justifyContent: "center",
  },
  streakText: {
    fontSize: 50,
    fontWeight: "bold",
    color: colors.text,
  },
  text: {
    fontSize: 30,
    fontWeight: "bold",
    color: colors.text,
    marginBottom: 20,
  },
  flameContainer: {
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderRadius: 50,
    borderColor: colors.surfaceLight,
    backgroundColor: colors.surface,
    elevation: 4,
    padding: 60
  }
})


