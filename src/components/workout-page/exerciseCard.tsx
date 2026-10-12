import { colors } from '@/styles/global'
import { Ionicons } from '@expo/vector-icons'
import {
  Image,
  ImageSourcePropType,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'

export default function ExerciseCard({
  name,
  exerciseType,
  target,
  image,
  onPress,
  onRemove,
}: {
  name: string
  exerciseType: string
  target: string
  image: ImageSourcePropType
  onPress?: () => void
  onRemove?: () => void
}) {
  return (
    <TouchableOpacity style={styles.container} activeOpacity={0.8} onPress={onPress}>
      <Image source={image} style={styles.workoutImage} resizeMode="cover" />

      <View style={styles.infoContainer}>
        <View style={styles.cardHeader}>
          <View style={styles.typeBadge}>
            <Text style={styles.typeText} numberOfLines={1}>
              {exerciseType}
            </Text>
          </View>

          <Text
            style={styles.workoutName}
            numberOfLines={1}
            adjustsFontSizeToFit
            minimumFontScale={0.7}
          >
            {name}
          </Text>
        </View>

        <View style={styles.targetRow}>
          <View style={styles.targetDot} />
          <Text style={styles.targetText} numberOfLines={1}>
            {target}
          </Text>
        </View>
      </View>

      {onRemove && (
        <TouchableOpacity
          style={styles.removeButton}
          onPress={onRemove}
          hitSlop={10}
        >
          <Ionicons name="trash-outline" size={22} color={colors.text} />
        </TouchableOpacity>
      )}
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    borderRadius: 16,
    padding: 8,
    height: 106,
    flexDirection: 'row',
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.surfaceLight,
    elevation: 4,
  },
  workoutImage: {
    width: 90,
    height: 90,
    borderRadius: 12,
    backgroundColor: 'white',
  },
  infoContainer: {
    flex: 1,
    marginLeft: 12,
    marginRight: 4,
    justifyContent: 'center',
    gap: 10,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  typeBadge: {
    backgroundColor: colors.primaryDark,
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  typeText: {
    color: colors.text,
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.8,
    textTransform: 'uppercase',
  },
  workoutName: {
    flex: 1,
    color: colors.text,
    fontSize: 20,
    fontWeight: '800',
    letterSpacing: 0.2,
  },
  targetRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  targetDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.primaryDark,
  },
  targetText: {
    flex: 1,
    color: colors.text,
    opacity: 0.7,
    fontSize: 14,
    fontWeight: '600',
  },
  removeButton: {
    justifyContent: 'center',
    paddingHorizontal: 6,
  },
})