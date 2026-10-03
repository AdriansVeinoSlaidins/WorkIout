import { useAuth } from "@/hooks/useAuth";
import { colors } from "@/styles/global";
import { useCallback, useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { supabase } from "../../lib/supabase";

type SetRow = {
    exercise_id: string;
    name: string;
    position: number;
    set_number: number;
    reps: number | null;
    weight: number | null;
};

type Workout = {
    id: string;
    duration: number;
    completed_at: string;
    workout_exercises: SetRow[];
};

type GroupedExercise = {
    key: string;
    name: string;
    sets: SetRow[];
};

// Turns the flat set rows into one entry per exercise, in workout order
const groupExercises = (rows: SetRow[]): GroupedExercise[] => {
    const sorted = [...rows].sort(
        (a, b) => a.position - b.position || a.set_number - b.set_number
    );

    const groups: GroupedExercise[] = [];
    for (const row of sorted) {
        const key = `${row.position}-${row.exercise_id}`;
        const existing = groups.find((g) => g.key === key);
        if (existing) {
            existing.sets.push(row);
        } else {
            groups.push({ key, name: row.name, sets: [row] });
        }
    }
    return groups;
};

export default function WorkoutHistory() {
    const [workouts, setWorkouts] = useState<Workout[]>([]);
    const { session } = useAuth();
    const userId = session?.user.id;

    const getWorkouts = useCallback(async () => {
        if (!userId) return;

        const { data, error } = await supabase
            .from("workouts")
            .select(`
                id,
                duration,
                completed_at,
                workout_exercises (
                    exercise_id,
                    name,
                    position,
                    set_number,
                    reps,
                    weight
                )
            `)
            .eq("user_id", userId)
            .order("completed_at", { ascending: false });

        if (error) {
            console.error("Failed to fetch workouts", error.message);
            return;
        }

        setWorkouts((data ?? []) as Workout[]);
    }, [userId]);

    // Load once and refresh when either table changes
    useEffect(() => {
        if (!userId) return;

        getWorkouts();

        const channel = supabase
            .channel(`workouts-changes-${userId}`)
            .on(
                "postgres_changes",
                { event: "*", schema: "public", table: "workouts" },
                () => getWorkouts()
            )
            .on(
                "postgres_changes",
                { event: "*", schema: "public", table: "workout_exercises" },
                () => getWorkouts()
            )
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, [userId, getWorkouts]);

    // Early return goes AFTER all hooks
    if (!session) return null;

    const formatDuration = (totalSeconds: number) => {
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;

        return (
            `${String(hours).padStart(2, "0")}:` +
            `${String(minutes).padStart(2, "0")}:` +
            `${String(seconds).padStart(2, "0")}`
        );
    };

    const formatDate = (isoString: string) => {
        const date = new Date(isoString);
        const datePart = date.toLocaleDateString(undefined, {
            month: "short",
            day: "numeric",
        });
        const timePart = date.toLocaleTimeString(undefined, {
            hour: "2-digit",
            minute: "2-digit",
        });
        return `${datePart}, ${timePart}`;
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Last workouts</Text>

            {workouts.map((workout, index) => {
                const exercises = groupExercises(workout.workout_exercises ?? []);

                return (
                    <View key={workout.id} style={styles.lastWorkoutContainer}>
                        <View style={styles.workoutCard}>
                            <View>
                                <Text style={styles.workoutTitle}>
                                    Workout #{workouts.length - index}
                                </Text>

                                <Text style={styles.date}>
                                    {formatDate(workout.completed_at)}
                                </Text>
                            </View>
                            <Text style={styles.duration}>
                                {formatDuration(workout.duration)}
                            </Text>
                        </View>

                        {exercises.length > 0 && (
                            <View style={styles.exerciseList}>
                                {exercises.map((exercise) => (
                                    <View key={exercise.key} style={styles.exerciseBlock}>
                                        <Text style={styles.exerciseName}>
                                            {exercise.name}
                                        </Text>
                                        {exercise.sets.map((set) => (
                                            <Text
                                                key={set.set_number}
                                                style={styles.setText}
                                            >
                                                Set {set.set_number}:{" "}
                                                {set.weight ?? 0} kg × {set.reps ?? 0}
                                            </Text>
                                        ))}
                                    </View>
                                ))}
                            </View>
                        )}
                    </View>
                );
            })}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        margin: 15,
        
    },
    lastWorkoutContainer: {
        backgroundColor: colors.surface,
        borderWidth: 1,
        borderColor: colors.surfaceLight,
        elevation: 4,
        borderRadius: 12,
        padding: 20,
        marginBottom: 10,
    },

    title: {
        color: colors.text,
        fontSize: 22,
        fontWeight: "bold",
        marginBottom: 15,
    },

    workoutCard: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },

    workoutTitle: {
        color: colors.primary,
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 8,
    },

    date: {
        color: colors.primary,
        fontSize: 12,
        marginBottom: 4,
    },

    duration: {
        backgroundColor: colors.background,
        borderWidth: 9,
        borderColor: colors.background,
        borderRadius: 5,
        color: colors.text,
        fontSize: 24,
        fontWeight: "bold",
    },

    exerciseList: {
        marginTop: 12,
        paddingTop: 12,
        borderTopWidth: 1,
        borderTopColor: colors.surfaceLight,
        gap: 10,
    },
    exerciseBlock: {
        gap: 2,
    },
    exerciseName: {
        color: colors.text,
        fontSize: 15,
        fontWeight: "800",
    },
    setText: {
        color: colors.textMuted,
        fontSize: 13,
    },
});