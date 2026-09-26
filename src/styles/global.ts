import { StyleSheet } from "react-native";

export const colors = {
  // Main
  background: "#111318",
  header: "#16181D",
  surface: "#1C1F26",
  surfaceLight: "#242831",

  // Borders
  outline: "#30343D",

  // Main accent
  primary: "#4FC3F7",
  primaryDark: "#2997C5",

  // Text
  text: "#FFFFFF",
  textSecondary: "#A7ABB5",
  textMuted: "#727782",

  // Status
  alert: "#FF5252",
  success: "#4CAF50",
};

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingTop: 30,
  },

  buttonMainBlue: {
    marginTop: 15,
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    backgroundColor: colors.primary,
  },

  scrollviewcontainer: {
    flex: 1,
    paddingTop: 10,
    backgroundColor: colors.background,
    paddingHorizontal: 10,
  },

  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: colors.text,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: colors.textSecondary,
    marginTop: 30,
    marginBottom: 16,
  },

  empty: {
    color: colors.textSecondary,
    fontSize: 14,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});