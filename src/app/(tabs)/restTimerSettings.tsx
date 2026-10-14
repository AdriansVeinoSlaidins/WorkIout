import { useTheme, useThemedStyles } from '@/context/themeContext'
import { ThemeColors } from '@/styles/global'
import { StyleSheet, Text, View } from 'react-native'

export default function restTimerSettings() {
  const {colors} = useTheme()
  const styles = useThemedStyles(createStyles)
  return (
    <View style={styles.container}>
      <Text>restTimerSettings</Text>
    </View>
  )
}

const createStyles = (colors: ThemeColors) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.surface,
    

  }
})