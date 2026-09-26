import CustomHandle from "@/components/workout-page/customHandle";
import ExerciseCard, {
    WorkoutExercise,
} from "@/components/workout-page/exerciseCard";
import exercises from "@/data/exercises.json";
import useTimer from "@/hooks/workoutTimer";
import { colors, globalStyles } from "@/styles/global";
import { Ionicons } from "@expo/vector-icons";
import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useMemo, useRef, useState } from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View, } from "react-native";
import { supabase } from "../../../lib/supabase";
import { useAuth } from "../../hooks/useAuth";

export default function workout() {
    // Bottom Sheet
    const SnapPoints = useMemo(() => ["9%", "100%"], []);
    const BottomSheetRef = useRef<BottomSheet>(null);
    const [sheetIndex, setSheetIndex] = useState(1);

    const OpenSheet = () => {
        BottomSheetRef.current?.expand();
    };

    // Start button
    const [started, setStarted] = useState(false);

    // Timer
    const [running, setRunning] = useState(false);
    const { time, reset, seconds } = useTimer(running);

    // Selected exercise
    const { exerciseId } = useLocalSearchParams();

    const selectedExerciseId = Array.isArray(exerciseId)
        ? exerciseId[0]
        : exerciseId;

    const exercise = exercises.find(
        (item) => item.id === selectedExerciseId
    );

    // Exercises added to workout
    const [addedExercises, setAddedExercises] = useState<WorkoutExercise[]>([]);

    useEffect(() => {
        if (!exercise) return;

        setAddedExercises((currentExercises) => {
            if (currentExercises.some((item) => item.id === exercise.id)) {
                return currentExercises;
            }

            return [
                ...currentExercises,
                {
                    ...exercise,
                    sets: [],
                    currentWeight: "",
                    currentReps: "",
                },
            ];
        });
    }, [selectedExerciseId]);

    // Change weight
    const changeWeight = (exerciseId: string, weight: string) => {
        setAddedExercises((currentExercises) =>
            currentExercises.map((exercise) =>
                exercise.id === exerciseId
                    ? { ...exercise, currentWeight: weight }
                    : exercise
            )
        );
    };

    // Change reps
    const changeReps = (exerciseId: string, reps: string) => {
        setAddedExercises((currentExercises) =>
            currentExercises.map((exercise) =>
                exercise.id === exerciseId
                    ? { ...exercise, currentReps: reps }
                    : exercise
            )
        );
    };

    // Finish set
    const finishSet = (exerciseId: string) => {
        setAddedExercises((currentExercises) =>
            currentExercises.map((exercise) => {
                if (exercise.id !== exerciseId) {
                    return exercise;
                }

                if (!exercise.currentWeight || !exercise.currentReps) {
                    return exercise;
                }

                return {
                    ...exercise,
                    sets: [
                        ...exercise.sets,
                        {
                            weight: exercise.currentWeight,
                            reps: exercise.currentReps,
                        },
                    ],
                    currentWeight: "",
                    currentReps: "",
                };
            })
        );
    };

    // Database
    const { session } = useAuth();

    const finishWorkout = async () => {
        if (!session) return;

        const { data, error } = await supabase
            .from("workouts")
            .insert({
                user_id: session.user.id,
                name: "Workout",
                duration: seconds,
                completed_at: new Date().toISOString(),
            })
            .select()
            .single();

        if (error) {
            console.error("Failed to save workout:", error.message);
            return;
        }

        console.log("Saved data:", data);

        setRunning(false);
        reset();
        setStarted(false);
        setAddedExercises([]);

        BottomSheetRef.current?.close();
    };

    return (
        <>
            {/* Main page */}

            <ScrollView style={globalStyles.scrollviewcontainer}>
                <TouchableOpacity
                    style={[
                        globalStyles.buttonMainBlue,
                        started && styles.disabledButton,
                    ]}
                    disabled={started}
                    onPress={() => {
                        setRunning(true);
                        OpenSheet();
                        setStarted(true);
                    }}
                >
                    <Text style={styles.buttonText}>
                        {started ? "Workout running" : "Start workout"}
                    </Text>
                </TouchableOpacity>
            </ScrollView>

            {/* Bottom Sheet */}

            <BottomSheet
                ref={BottomSheetRef}
                snapPoints={SnapPoints}
                enablePanDownToClose={false}
                enableOverDrag={false}
                index={1}
                enableHandlePanningGesture={true}
                enableDynamicSizing={false}
                backgroundStyle={styles.handleBackground}
                onChange={(index) => {
                    setSheetIndex(index);
                }}
                handleComponent={() => (
                    <CustomHandle
                        bottomSheetRef={BottomSheetRef}
                        sheetIndex={sheetIndex}
                        time={time}
                        onFinish={finishWorkout}
                    />
                )}
            >
                <BottomSheetScrollView
                    contentContainerStyle={styles.contentContainer}
                >
                    {/* Header */}

                    <View style={styles.sheetContentHeader}>
                        <Text
                            style={[
                                globalStyles.title,
                                {
                                    marginLeft: 10,
                                    fontSize: 22,
                                },
                            ]}
                        >
                            Workout
                        </Text>

                        <TouchableOpacity
                            style={styles.addWorkoutButton}
                            onPress={() => {
                                router.push("/workoutList");
                            }}
                        >
                            <Ionicons
                                name="add"
                                size={35}
                                color="black"
                            />
                        </TouchableOpacity>
                    </View>

                    {/* Exercises */}

                    {addedExercises.length === 0 ? (
                        <View style={styles.emptyContainer}>
                            <Text style={styles.emptyText}>
                                No exercises added
                            </Text>

                            <Text style={styles.emptySubText}>
                                Press + to add an exercise
                            </Text>
                        </View>
                    ) : (
                        addedExercises.map((exercise) => (
                            <ExerciseCard
                                key={exercise.id}
                                exercise={exercise}
                                onWeightChange={changeWeight}
                                onRepsChange={changeReps}
                                onFinishSet={finishSet}
                            />
                        ))
                    )}
                </BottomSheetScrollView>
            </BottomSheet>
        </>
    );
}

const styles = StyleSheet.create({
    contentContainer: {
        backgroundColor: colors.surface,
        padding: 10,
        paddingBottom: 40,
    },

    handleBackground: {
        backgroundColor: colors.surface,
        borderColor: colors.outline,
        borderWidth: 2,
    },

    disabledButton: {
        backgroundColor: "gray",
        opacity: 0.5,
    },

    buttonText: {
        color: "white",
        fontSize: 16,
        fontWeight: "bold",
    },

    sheetContentHeader: {
        padding: 10,
        borderRadius: 10,
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "space-between",
        backgroundColor: colors.background,
        marginBottom: 12,
    },

    addWorkoutButton: {
        backgroundColor: colors.primary,
        padding: 10,
        borderRadius: 10,
    },

    emptyContainer: {
        alignItems: "center",
        paddingTop: 40,
    },

    emptyText: {
        color: colors.text,
        fontSize: 18,
        fontWeight: "bold",
    },

    emptySubText: {
        color: colors.textMuted,
        marginTop: 6,
    },
});