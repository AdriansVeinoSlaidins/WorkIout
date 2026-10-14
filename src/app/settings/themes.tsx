import { useTheme, useThemedStyles } from "@/context/themeContext"
import { ThemeColors, ThemeName, themes } from "@/styles/global"
import { Ionicons } from "@expo/vector-icons"
import { StyleSheet, Text, TouchableOpacity, View } from "react-native"

export default function Themes() {
  const { themeName, setTheme, colors } = useTheme()
  const styles = useThemedStyles(createStyles)

  return (
    <View style={styles.container}>
      {(Object.keys(themes) as ThemeName[]).map((name) => (
        <TouchableOpacity key={name} style={styles.option} onPress={() => setTheme(name)}>
          <View style={[styles.swatch, { backgroundColor: themes[name].primary }]} />
          <Text style={styles.label}>{name}</Text>
          {themeName === name && (
            <Ionicons name="checkmark-circle" size={22} color={colors.primary} />
          )}
        </TouchableOpacity>
      ))}
    </View>
  )
}

const createStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    container: { flex: 1, backgroundColor: colors.background, padding: 20, gap: 10 },
    option: {
      flexDirection: "row",
      alignItems: "center",
      gap: 12,
      elevation: 4,
      padding: 14,
      borderRadius: 12,
      backgroundColor: colors.surface,
      borderWidth: 1,
      borderColor: colors.surfaceLight,
    },
    swatch: { width: 24, height: 24, borderRadius: 12 },
    label: { flex: 1, color: colors.text, fontSize: 16, fontWeight: "700", textTransform: "capitalize" },
  })