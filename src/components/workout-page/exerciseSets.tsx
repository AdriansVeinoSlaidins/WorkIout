import { ExerciseSet } from '@/context/workoutContext'
import { colors } from '@/styles/global'
import { Ionicons } from '@expo/vector-icons'
import { BottomSheetTextInput } from '@gorhom/bottom-sheet'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

export default function ExerciseSets({
  sets,
  onAdd,
  onRemove,
  onChange,
  onToggleDone
}: {
  sets: ExerciseSet[]
  onAdd: () => void
  onRemove: (setId: string) => void
  onChange: (setId: string, field: 'reps' | 'weight', value: string) => void
  onToggleDone: (setId: string) => void
}) {
  return (
    <View style={styles.container}>
      {/* Column titles */}
      <View style={styles.row}>
        <Text style={[styles.headerText, styles.setCol]}>SET</Text>
        <Text style={[styles.headerText, styles.inputCol]}>KG</Text>
        <Text style={[styles.headerText, styles.inputCol]}>REPS</Text>
        <View style={styles.deleteCol} />
      </View>

      {sets.map((set, index) => (
        <View key={set.id} style={styles.row}>
          <Text style={[styles.setNumber, styles.setCol]}>{index + 1}</Text>

          <BottomSheetTextInput
            style={[styles.input, styles.inputCol]}
            value={set.weight}
            onChangeText={(text) => onChange(set.id, 'weight', text.replace(',', '.'))}
            keyboardType="decimal-pad"
            placeholder="0"
            placeholderTextColor={colors.textMuted}
            selectTextOnFocus
          />

          <BottomSheetTextInput
            style={[styles.input, styles.inputCol]}
            value={set.reps}
            onChangeText={(text) => onChange(set.id, 'reps', text.replace(/[^0-9]/g, ''))}
            keyboardType="number-pad"
            placeholder="0"
            placeholderTextColor={colors.textMuted}
            selectTextOnFocus
          />
          <View style={styles.actionCol}>
            <TouchableOpacity
              style={styles.deleteCol}
              onPress={() => onRemove(set.id)}
              hitSlop={8}
              disabled={sets.length === 1} // always keep at least one set
            >
              <Ionicons
                name="close-circle"
                size={25}
                color={colors.text}
                style={{ opacity: sets.length === 1 ? 0.2 : 0.7 }}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => onToggleDone(set.id)} hitSlop={8}>
              <Ionicons
                name={set.done ? "checkmark-circle" : "checkmark-circle-outline"}
                size={25}
                color={set.done ? colors.success : colors.text}
              />
            </TouchableOpacity>
          </View>
          
        </View>
      ))}

      <TouchableOpacity style={styles.addButton} onPress={onAdd} activeOpacity={0.8}>
        <Ionicons name="add" size={18} color={colors.text} />
        <Text style={styles.addText}>Add set</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
    borderWidth: 1,
    borderTopWidth: 0,
    borderColor: colors.surfaceLight,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginTop: -8,
    marginBottom: 10,
    gap: 8,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  setCol: {
    width: 36,
    textAlign: 'center',
  },
  inputCol: {
    flex: 1,
    textAlign: 'center',
  },
  deleteCol: {
    width: 24,
    marginBottom: 5,
    alignItems: 'center',
  },
  actionCol: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center"
  },
  headerText: {
    color: colors.textMuted,
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.8,
  },
  setNumber: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '800',
  },
  input: {
    backgroundColor: colors.surface,
    color: colors.text,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.surfaceLight,
    paddingVertical: 8,
    fontSize: 16,
    fontWeight: '700',
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 8,
    borderRadius: 10,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.surfaceLight,
  },
  addText: {
    color: colors.text,
    fontSize: 14,
    fontWeight: '700',
  },
})