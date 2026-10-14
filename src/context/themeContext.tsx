import { ThemeColors, ThemeName, themes } from "@/styles/global"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { createContext, ReactNode, useContext, useEffect, useMemo, useState } from "react"

type ThemeContextType = {
  themeName: ThemeName
  colors: ThemeColors
  setTheme: (name: ThemeName) => void
}

const ThemeContext = createContext<ThemeContextType | null>(null)
const STORAGE_KEY = "theme"

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [themeName, setThemeName] = useState<ThemeName>("dark")

  // load the saved theme on startup
  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY).then((saved) => {
      if (saved && saved in themes) setThemeName(saved as ThemeName)
    })
  }, [])

  const setTheme = (name: ThemeName) => {
    setThemeName(name)
    AsyncStorage.setItem(STORAGE_KEY, name)
  }

  return (
    <ThemeContext.Provider value={{ themeName, colors: themes[themeName], setTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error("useTheme must be used inside <ThemeProvider>")
  return ctx
}

// builds styles from the current colors and rebuilds only when the theme changes
export function useThemedStyles<T>(factory: (c: ThemeColors) => T) {
  const { colors } = useTheme()
  return useMemo(() => factory(colors), [colors])
}