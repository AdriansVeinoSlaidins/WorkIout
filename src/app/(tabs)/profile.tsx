import { globalStyles } from "@/styles/global";
import { ScrollView, Text, TouchableOpacity } from "react-native";
import { supabase } from "../../../lib/supabase";

export default function () {

    
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


    const getWorkouts = async () => {
        const { data, error } = await supabase
            .from("finished_workouts")
            .select("*");

        if (error) {
            console.log("Read error:", error);
            return;
        }

        data?.forEach((workout) => {
            const totalSeconds = workout.duration;

            const hours = Math.floor(totalSeconds / 3600);
            const minutes = Math.floor((totalSeconds % 3600) / 60);
            const seconds = totalSeconds % 60;

            const time =
                `${String(hours).padStart(2, "0")}:` +
                `${String(minutes).padStart(2, "0")}:` +
                `${String(seconds).padStart(2, "0")}`;

            console.log(time);
        });
};

    return (
        <ScrollView style={globalStyles.scrollviewcontainer}>
            <Text>Yo</Text>
            <TouchableOpacity onPress={getWorkouts}>
                <Text>Test Supabase</Text>
            </TouchableOpacity>

        </ScrollView>
    )
}