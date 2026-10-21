import { useRestTime } from '@/context/restTimeContext'
import { useTheme, useThemedStyles } from '@/context/themeContext'
import { ThemeColors } from '@/styles/global'
import { useEffect, useState } from 'react'
import { StyleSheet, TextInput, View } from 'react-native'

export default function restTimerSettings() {
  const {colors} = useTheme()
  const styles = useThemedStyles(createStyles)
const { restTime, setRestTime } = useRestTime()
const [draft, setDraft] = useState(String(restTime))

// keep the box in sync if the value changes elsewhere
useEffect(() => setDraft(String(restTime)), [restTime])

const commit = () => {
  const n = parseInt(draft, 10)
  if (isNaN(n)) {
    setDraft(String(restTime)) 
  } else {
    setRestTime(n)               
  }
}

  return (
    <View style={styles.container}>
      <TextInput
        value={draft}
        onChangeText={(t) => setDraft(t.replace(/[^0-9]/g, ""))}  // digits only
        keyboardType="number-pad"
        returnKeyType="done"
        onSubmitEditing={commit}
        onBlur={commit}   // also commits when the user taps elsewhere
      />
    </View>
    
  )
}

const createStyles = (colors: ThemeColors) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.surface,
    


  }
})