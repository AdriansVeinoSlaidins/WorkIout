import CustomHandle from "@/components/workout-page/customHandle";
import ExerciseCard from "@/components/workout-page/exerciseCard";
import ExerciseSets from "@/components/workout-page/exerciseSets";
import { useWorkout } from "@/context/workoutContext";
import { exerciseImages } from "@/data/exerciseImages";
import useRestTimer from "@/hooks/workoutRestTimer";
import useTimer from "@/hooks/workoutTimer";
import { colors, globalStyles } from "@/styles/global";
import { Ionicons } from "@expo/vector-icons";
import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { router, useLocalSearchParams } from "expo-router";
import { useMemo, useRef, useState } from "react";
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

    //Rest timer
    const rest = useRestTimer(10);

    // Selected exercises
    const {
        selectedExercises,
        removeExercise,
        clearExercises,
        addSet,
        removeSet,
        updateSet,
        toggleSetDone,
    } = useWorkout();

    

    // Get pressed workout
    const { name, exerciseType, bodyPart, target } = useLocalSearchParams<{
        name?: string,
        exerciseType?: string,
        bodyPart?: string,
        target?: string
    }>()
    

    // Database
    const { session } = useAuth();


    // Get pressed workout
    const finishWorkout = async () => {
        if (!session) return;

        // 1. Save the workout itself
        const { data: workout, error } = await supabase
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

        // 2. Save the selected exercises, linked to that workout
        if (selectedExercises.length > 0) {
            const rows = selectedExercises.flatMap((exercise, exerciseIndex) =>
                exercise.sets.map((set, setIndex) => ({
                    workout_id: workout.id,
                    exercise_id: exercise.id,
                    name: exercise.name,
                    type: exercise.type,
                    target: exercise.target,
                    position: exerciseIndex,
                    set_number: setIndex + 1,
                    reps: set.reps ? parseInt(set.reps, 10) : null,
                    weight: set.weight ? parseFloat(set.weight) : null,
                }))
            );

            const { error: exercisesError } = await supabase
                .from("workout_exercises")
                .insert(rows);

            if (exercisesError) {
                console.error("Failed to save exercises:", exercisesError.message);
                return;
            }
        }

        console.log("Saved workout:", workout);

        // 3. Reset the UI
        setRunning(false);
        reset();
        setStarted(false);
        clearExercises();
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
                        restTime={rest.running ? rest.time : "Rest"}
                        restRunning={rest.running}
                        onFinish={finishWorkout}
                    />
                )}
            >
                <BottomSheetScrollView
                    contentContainerStyle={styles.contentContainer}
                    showsVerticalScrollIndicator={false}
                >
                    {/* Header */}

                    <View style={styles.sheetContentHeader}>
                        <Text style={[ globalStyles.title,{ marginLeft: 10, fontSize: 22, },]}>
                            Workout
                        </Text>

                        <TouchableOpacity
                            style={styles.addWorkoutButton}
                            onPress={() => {
                                router.push("/workoutList");
                            }}
                        >
                            <Ionicons name="add" size={35} color="black"/>
                        </TouchableOpacity>
                    </View>
                    
                    {/* selected exercises */}

                    {selectedExercises.length === 0? (
                        <View style={styles.emptyContainer}>
                            <Text style={styles.emptyText}>No exercises yet</Text>
                            <Text style={styles.emptySubText}>
                                Tap + to add your first exercise
                            </Text>
                        </View>
                    ):(
                        selectedExercises.map((exercise) => (
                            <View key={exercise.id}>
                                <ExerciseCard
                                    name={exercise.name}
                                    exerciseType={exercise.type}
                                    target={exercise.target}
                                    image={exerciseImages[exercise.id]}
                                    onRemove={() => removeExercise(exercise.id)}
                                />
                                <ExerciseSets
                                    sets={exercise.sets}
                                    onAdd={() => addSet(exercise.id)}
                                    onRemove={(setId) => removeSet(exercise.id, setId)}
                                    onChange={(setId, field, value) =>
                                        updateSet(exercise.id, setId, field, value)
                                    }
                                    onToggleDone={(setId) => {
                                        const set = exercise.sets.find((s) => s.id === setId);
                                        toggleSetDone(exercise.id, setId);
                                        if (set && !set.done) rest.start();
                                    }}
                                />
                            </View> 
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
        marginHorizontal: 2,
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
        borderWidth: 1,
        borderColor: colors.surfaceLight,
        elevation: 4,
    },

    addWorkoutButton: {
        backgroundColor: colors.primary,
        padding: 10,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: colors.surface ,
        elevation: 4,
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
    exerciseRow: {
        flexDirection: "row",
        alignItems: "center",
        gap: 12,
    },

    exerciseInfo: {
        flex: 1,
    },

    exerciseName: {
        color: colors.text,
        fontSize: 18,
        fontWeight: "800",
    },

    exerciseTarget: {
        color: colors.textMuted,
        fontSize: 13,
        marginTop: 2,
    },
    exercireCard: {
        flexDirection: "column",
        backgroundColor: colors.background,
        borderRadius: 12,
        padding: 12,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: colors.surfaceLight,
    }
});