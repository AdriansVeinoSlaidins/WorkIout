import { useRestTime } from '@/context/restTimeContext'
import { useTheme, useThemedStyles } from '@/context/themeContext'
import { ThemeColors } from '@/styles/global'
import { useEffect, useState } from 'react'
import { StyleSheet, Text, TextInput, View } from 'react-native'

export default function RestTimerSettings() {
  const { colors } = useTheme()
  const styles = useThemedStyles(createStyles)
  const { restTime, setRestTime } = useRestTime()
  const [draft, setDraft] = useState(String(restTime))

  useEffect(() => {
    setDraft(String(restTime))
  }, [restTime])

  const commit = () => {
    const n = parseInt(draft, 10)
    if (isNaN(n)) {
      setDraft(String(restTime))
    } else {
      setRestTime(n)
      setDraft(String(Math.min(600, Math.max(5, n))))
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Rest time (seconds)</Text>

      <TextInput
        style={styles.input}
        value={draft}
        onChangeText={(t) => setDraft(t.replace(/[^0-9]/g, ''))}
        keyboardType="number-pad"
        returnKeyType="done"
        maxLength={3}
        selectTextOnFocus
        placeholder="30"
        placeholderTextColor={colors.textMuted}
        onSubmitEditing={commit}
        onBlur={commit}
      />
    </View>
  )
}

const createStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
      padding: 20,
      gap: 8,
    },
    label: {
      color: colors.textSecondary,
      fontSize: 14,
      fontWeight: '700',
      marginLeft: 4,
    },
    input: {
      backgroundColor: colors.surface,
      color: colors.text,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: colors.surfaceLight,
      paddingVertical: 14,
      paddingHorizontal: 16,
      fontSize: 22,
      fontWeight: '800',
      textAlign: 'center',
      fontVariant: ['tabular-nums'],
    },
  })