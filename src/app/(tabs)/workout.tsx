import useTimer from "@/app/hooks/workoutTimer";
import CustomHandle from "@/components/workout-page/customHandle";
import { colors, globalStyles } from "@/styles/global";
import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { useMemo, useRef, useState } from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity } from "react-native";
import { supabase } from "../../../lib/supabase";
import { useAuth } from "../hooks/useAuth";

export default function () {
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
                    <Text>Yo</Text>
                </BottomSheetScrollView>
            </BottomSheet>
        </>
    );
}

const styles = StyleSheet.create({
    contentContainer: {
        flex: 1,
        backgroundColor: colors.background,
        margin: 15,
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
});