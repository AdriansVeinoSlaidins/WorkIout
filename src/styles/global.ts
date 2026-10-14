import { StyleSheet } from "react-native";

export type ThemeColors = {
  background: string;
  header: string;
  surfaceDark: string;
  surface: string;
  surfaceLight: string;
  outline: string;
  outlineWhite: string;
  primary: string;
  primaryDark: string;
  text: string;
  textSecondary: string;
  textMuted: string;
  alert: string;
  success: string;
};

export const themes = {
  dark: {
    background: "#111318",
    header: "#16181D",
    surfaceDark: "#0b0b0e",
    surface: "#1C1F26",
    surfaceLight: "#242831",
    outline: "#30343D",
    outlineWhite: "#d8d8d8",
    primary: "#4FC3F7",
    primaryDark: "#2997C5",
    text: "#FFFFFF",
    textSecondary: "#A7ABB5",
    textMuted: "#727782",
    alert: "#FF5252",
    success: "#4CAF50",
  },
  light: {
    background: "#F2F4F8",
    header: "#FFFFFF",
    surfaceDark: "#E2E5EB",
    surface: "#FFFFFF",
    surfaceLight: "#E9ECF2",
    outline: "#CBD0DA",
    outlineWhite: "#B8BDC9",
    primary: "#0288D1",
    primaryDark: "#01579B",
    text: "#111318",
    textSecondary: "#4A4F5A",
    textMuted: "#7A808C",
    alert: "#D32F2F",
    success: "#2E7D32",
  },
  ocean: {
    background: "#0A1A24",
    header: "#0D2233",
    surfaceDark: "#061219",
    surface: "#10283A",
    surfaceLight: "#1A3A50",
    outline: "#22506E",
    outlineWhite: "#D8EEF8",
    primary: "#22D3EE",
    primaryDark: "#0E9FB8",
    text: "#E6F6FF",
    textSecondary: "#9CC3D8",
    textMuted: "#6A93A8",
    alert: "#FF5252",
    success: "#4CAF50",
  },
} satisfies Record<string, ThemeColors>;

export type ThemeName = keyof typeof themes;

export const createGlobalStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
      borderWidth: 1,
      borderColor: colors.surfaceLight,
      elevation: 4,
      paddingTop: 30,
    },
    buttonMainBlue: {
      marginTop: 15,
      padding: 15,
      borderRadius: 10,
      borderWidth: 1,
      borderColor: colors.outlineWhite,
      elevation: 4,
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

