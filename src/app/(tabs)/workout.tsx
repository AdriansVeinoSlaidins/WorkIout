import CustomHandle from "@/components/workout-page/customHandle";
import useTimer from "@/hooks/workoutTimer";
import { colors, globalStyles } from "@/styles/global";
import { Ionicons } from "@expo/vector-icons";
import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { router } from "expo-router";
import { useMemo, useRef, useState } from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { supabase } from "../../../lib/supabase";
import { useAuth } from "../../hooks/useAuth";

export default function workout() {
    //Bottom Sheet
    const SnapPoints = useMemo(() => ["9%", "100%"], []);
    const BottomSheetRef = useRef<BottomSheet>(null);
    const [sheetIndex, setSheetIndex] = useState(1);
    const OpenSheet = () => {
        BottomSheetRef.current?.expand();
    };

    //start button
    const [started, setStarted] = useState(false);
   
    //timer
    const [running, setRunning] = useState(false);
    const {time, reset, seconds} = useTimer(running);


    //database
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
            
            console.log("Saved data")
            if (error) {
                console.error("Failed to save workout:", error.message);
                return null;
        }
        setRunning(false);
        reset();
        setStarted(false);
        BottomSheetRef.current?.close();
    };


    return (
        <>

        {/* Main page */}

            <ScrollView style={globalStyles.scrollviewcontainer}>
                <TouchableOpacity
                    style={[
                        globalStyles.buttonMainBlue,
                        started && styles.disabledButton
                    ]}
                    disabled={started}
                    onPress={() => {
                        setRunning(true);
                        OpenSheet();
                        setStarted(true);
                    }}>
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
                index={-1}
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
                        onFinish={finishWorkout}/>

                )}>

            {/* Sheets Content */}

                <BottomSheetScrollView contentContainerStyle={styles.contentContainer}>
                    <View style={styles.sheetContentHeader}>
                        <Text style={[globalStyles.title, {marginLeft: 10,}]}>Add excercise</Text>

                        <View style={styles.addWorkoutButton}>
                            
                            <TouchableOpacity onPress={() => {router.push("/workoutList")}}>
                                <Ionicons name="add" size={35} color={"black"}/>
                            </TouchableOpacity>
                        </View>
                    </View>
                
                </BottomSheetScrollView>
            </BottomSheet>
        </>
    );
}

const styles = StyleSheet.create({
    contentContainer: {
        flex: 1,
        backgroundColor: colors.surface,
        margin: 2,
        padding: 10,
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
    },
    addWorkoutButton: {
        
        backgroundColor: colors.primary,
        padding: 10,
        borderRadius: 10,
        
    },

});