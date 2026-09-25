import { colors } from "@/styles/global";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { supabase } from "../../lib/supabase";

type Workout = {
    duration: number;
    completed_at: string;
};

export default function WorkoutHistory() {
    const [workouts, setWorkouts] = useState<Workout[]>([]);

   

    //to get the data
    const getWorkouts = async () => {
        const { data, error } = await supabase
            .from("workouts")
            .select("duration, completed_at")
            .order("completed_at", { ascending: false });

        if (error) {
            console.error("Failed to fetch workout duration", error.message);
            return;
        }

        setWorkouts(data);
    };


    //To refresh the list
    useEffect(() => {
        getWorkouts();

        const channel = supabase
            .channel("workouts-changes")
            .on(
                "postgres_changes",
                { event: "*", schema: "public", table: "workouts" },
                () => getWorkouts()
            )
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, []);

    useEffect(() => { getWorkouts() }, []);


    
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

            {workouts.map((workout, index) => (
                <View style={styles.workoutCard} key={index}>
                    <View style={styles.infoContainer}>
                        <Text style={styles.workoutTitle}>
                        Workout #{index + 1}
                        </Text>

                        <Text style={styles.date}>
                            {formatDate(workout.completed_at)}
                        </Text>
                    </View>

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

    infoContainer: {

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
        backgroundColor: colors.surface,
        borderRadius: 12,
        padding: 20,
        marginBottom: 10,
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
});