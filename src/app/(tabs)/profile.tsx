
import ActivityCalendar from "@/components/workout-page/ActivityCalendar";
import { useThemedStyles } from "@/context/themeContext";
import { createGlobalStyles } from "@/styles/global";
import { useState } from "react";
import { ScrollView } from "react-native";

export default function profile() {
    const globalStyles = useThemedStyles(createGlobalStyles)

    // WorkoutHistory
    const [selected, setSelected] = useState<string | null>(null);

    return (
        <ScrollView style={globalStyles.scrollviewcontainer}>
            <ActivityCalendar
                selectedKey={selected}
                onDayPress={(key) => setSelected((prev) => (prev === key ? null : key))}
            />  

        </ScrollView>
    );
}