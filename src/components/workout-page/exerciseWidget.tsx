import { colors } from '@/styles/global'
import { StyleSheet, Text, View } from 'react-native'

export default function ExerciseWidget() {
  return (
    <View style={styles.container}>
      <Text>exerciseWidget</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
      backgroundColor: colors.background,
      margin: 10,
      borderRadius: 10,
      padding: 10
    }
})