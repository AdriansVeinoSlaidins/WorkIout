import { colors } from "@/styles/global";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

export type WorkoutSet = {
    weight: string;
    reps: string;
};

export type WorkoutExercise = {
    id: string;
    name: string;
    sets: WorkoutSet[];
    currentWeight: string;
    currentReps: string;
};

type ExerciseCardProps = {
    exercise: WorkoutExercise;
    onWeightChange: (exerciseId: string, weight: string) => void;
    onRepsChange: (exerciseId: string, reps: string) => void;
    onFinishSet: (exerciseId: string) => void;
};

export default function ExerciseCard({
    exercise,
    onWeightChange,
    onRepsChange,
    onFinishSet,
}: ExerciseCardProps) {
    return (
        <View style={styles.exerciseCard}>
            <Text style={styles.exerciseName}>
                {exercise.name}
            </Text>

            {exercise.sets.map((set, index) => (
                <View key={index} style={styles.finishedSet}>
                    <Text style={styles.setNumber}>
                        Set {index + 1}
                    </Text>

                    <Text style={styles.setValue}>
                        {set.weight} kg
                    </Text>

                    <Text style={styles.setValue}>
                        {set.reps} reps
                    </Text>

                    <Ionicons
                        name="checkmark-circle"
                        size={22}
                        color={colors.success}
                    />
                </View>
            ))}

            <View style={styles.inputRow}>
                <TextInput
                    style={styles.input}
                    placeholder="Weight"
                    placeholderTextColor={colors.textMuted}
                    keyboardType="numeric"
                    value={exercise.currentWeight}
                    onChangeText={(value) =>
                        onWeightChange(exercise.id, value)
                    }
                />

                <Text style={styles.unit}>kg</Text>

                <TextInput
                    style={styles.input}
                    placeholder="Reps"
                    placeholderTextColor={colors.textMuted}
                    keyboardType="numeric"
                    value={exercise.currentReps}
                    onChangeText={(value) =>
                        onRepsChange(exercise.id, value)
                    }
                />

                <Text style={styles.unit}>reps</Text>
            </View>

            <TouchableOpacity
                style={styles.finishSetButton}
                onPress={() => onFinishSet(exercise.id)}
            >
                <Ionicons
                    name="checkmark"
                    size={20}
                    color="white"
                />

                <Text style={styles.finishSetText}>
                    Finish set
                </Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    exerciseCard: {
        backgroundColor: colors.background,
        borderRadius: 12,
        padding: 15,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: colors.outline,
    },

    exerciseName: {
        color: colors.text,
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 12,
    },

    inputRow: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 10,
    },

    input: {
        flex: 1,
        backgroundColor: colors.surfaceLight,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: colors.outline,
        color: colors.text,
        paddingHorizontal: 12,
        paddingVertical: 10,
        fontSize: 15,
    },

    unit: {
        color: colors.textSecondary,
        marginHorizontal: 6,
    },

    finishSetButton: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: colors.primary,
        borderRadius: 8,
        padding: 11,
        marginTop: 12,
    },

    finishSetText: {
        color: "white",
        fontSize: 15,
        fontWeight: "bold",
        marginLeft: 6,
    },

    finishedSet: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: colors.surfaceLight,
        borderRadius: 8,
        padding: 9,
        marginBottom: 6,
    },

    setNumber: {
        color: colors.text,
        fontWeight: "bold",
        width: 55,
    },

    setValue: {
        color: colors.textSecondary,
        marginRight: 15,
    },
});