import { colors } from "@/styles/global";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { supabase } from "../../lib/supabase";

type Workout = {
    id: number;
    duration: number;
};

export default function WorkoutHistory() {
    const [workouts, setWorkouts] = useState<Workout[]>([]);

    const getWorkouts = async () => {
        const { data, error } = await supabase
            .from("finished_workouts")
            .select("*")
            .order("id", { ascending: false });

        if (error) {
            console.log("Read error:", error);
            return;
        }

        setWorkouts(data);
    };

    useEffect(() => {getWorkouts()}, []);

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

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Last workouts</Text>

            {workouts.map((workout) => (
                <View style={styles.workoutCard} key={workout.id}>
                    <Text style={styles.workoutTitle}>
                        Workout #{workout.id}
                    </Text>

                    <Text style={styles.duration}>
                        {formatDuration(workout.duration)}
                    </Text>
                </View>
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        margin: 15,
    },

    title: {
        color: colors.text,
        fontSize: 22,
        fontWeight: "bold",
        marginBottom: 15,
    },

    workoutCard: {
        backgroundColor: colors.surface,
        borderWidth: 1,
        borderColor: colors.outline,
        borderRadius: 12,
        padding: 20,
        marginBottom: 10,
    },

    workoutTitle: {
        color: colors.textSecondary,
        fontSize: 14,
        marginBottom: 8,
    },

    duration: {
        color: colors.text,
        fontSize: 24,
        fontWeight: "bold",
    },
});