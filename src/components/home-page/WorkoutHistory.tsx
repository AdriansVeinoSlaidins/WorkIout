import { useThemedStyles } from "@/context/themeContext";
import { useAuth } from "@/hooks/useAuth";
import { dateKey } from "@/hooks/useWorkoutDays";
import { ThemeColors } from "@/styles/global";
import { useCallback, useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { supabase } from "../../../lib/supabase";

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

export default function WorkoutHistory({
    date,
}: {
    date?: string | null;
}) {
    const [workouts, setWorkouts] = useState<Workout[]>([]);
    const { session } = useAuth();
    const userId = session?.user.id;

    const styles = useThemedStyles(createStyles);

    const getWorkouts = useCallback(async () => {
        if (!userId || !date) return;

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
    }, [userId, date]);

    // Fetch workouts only when a date is specified
    useEffect(() => {
        if (!userId || !date) {
            setWorkouts([]);
            return;
        }

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
    }, [userId, date, getWorkouts]);

    // All hooks must execute before early returns
    if (!session || !date) return null;

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
        const d = new Date(isoString);

        const datePart = d.toLocaleDateString(undefined, {
            month: "short",
            day: "numeric",
        });

        const timePart = d.toLocaleTimeString(undefined, {
            hour: "2-digit",
            minute: "2-digit",
        });

        return `${datePart}, ${timePart}`;
    };

    // Number workouts using the full list
    const numbered = workouts.map((workout, index) => ({
        workout,
        number: workouts.length - index,
    }));

    // Only show workouts matching the specified date
    const visible = numbered.filter(
        ({ workout }) =>
            dateKey(new Date(workout.completed_at)) === date
    );

    // Format date title
    const [y, m, d] = date.split("-").map(Number);

    const dateTitle = new Date(y, m - 1, d).toLocaleDateString(
        undefined,
        {
            month: "long",
            day: "numeric",
        }
    );

    return (
        <View style={styles.container}>
            <Text style={styles.title}>
                Workouts on {dateTitle}
            </Text>

            {visible.length === 0 && (
                <Text style={styles.empty}>
                    No workouts on this day
                </Text>
            )}

            {visible.map(({ workout, number }) => {
                const exercises = groupExercises(
                    workout.workout_exercises ?? []
                );

                return (
                    <View
                        key={workout.id}
                        style={styles.lastWorkoutContainer}
                    >
                        <View style={styles.workoutCard}>
                            <View>
                                <Text style={styles.workoutTitle}>
                                    Workout #{number}
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
                                    <View
                                        key={exercise.key}
                                        style={styles.exerciseBlock}
                                    >
                                        <Text style={styles.exerciseName}>
                                            {exercise.name}
                                        </Text>

                                        {exercise.sets.map((set) => (
                                            <Text
                                                key={set.set_number}
                                                style={styles.setText}
                                            >
                                                Set {set.set_number}:{" "}
                                                {set.weight ?? 0} kg x{" "}
                                                {set.reps ?? 0}
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

const createStyles = (colors: ThemeColors) =>
    StyleSheet.create({
        container: {
            margin: 15,
        },

        lastWorkoutContainer: {
            backgroundColor: colors.surface,
            borderWidth: 1,
            borderColor: colors.surfaceLight,
            elevation: 4,
            borderRadius: 16,
            padding: 20,
            marginBottom: 10,
        },

        title: {
            color: colors.text,
            fontSize: 22,
            fontWeight: "bold",
            marginBottom: 15,
        },

        empty: {
            color: colors.textSecondary,
            fontSize: 14,
            marginBottom: 10,
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