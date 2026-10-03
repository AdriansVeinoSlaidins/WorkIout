import ExerciseCard from '@/components/workout-page/exerciseCard';
import { useWorkout } from '@/context/workoutContext';
import { exerciseImages } from '@/data/exerciseImages';
import exercises from "@/data/exercises.json";
import { colors, globalStyles } from '@/styles/global';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';

export default function WorkoutList() {
  const { addExercise } = useWorkout();

  return (
    <View style={styles.container}>
      <View style={styles.workoutListHeader}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.push("/(tabs)/workout")}
        >
          <Ionicons name="arrow-back" size={35} color="white" />
        </TouchableOpacity>

        <Text style={[globalStyles.title, styles.headerTitle]}>Exercises</Text>
      </View>

      <FlatList
        data={exercises}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <ExerciseCard
            name={item.name}
            exerciseType={item.type}
            target={item.target.join(", ")}
            image={exerciseImages[item.id]}
            onPress={() => {
              addExercise({
                id: item.id,
                name: item.name,
                type: item.type,
                target: item.target.join(", "),
              });
              router.push("/(tabs)/workout");
            }}
          />
        )}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 5,
    paddingHorizontal: 10,
    backgroundColor: colors.background,
  },
  workoutListHeader: {
    backgroundColor: colors.surface,
    padding: 10,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: colors.surfaceLight,
    elevation: 4,
  },
  backButton: {
    zIndex: 10,
  },
  headerTitle: {
    position: "absolute",
    left: 0,
    right: 0,
    textAlign: "center",
  },
});