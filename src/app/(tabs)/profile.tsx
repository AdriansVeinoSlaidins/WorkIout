
import ActivityCalendar from "@/components/workout-page/ActivityCalendar";
import { useTheme, useThemedStyles } from "@/context/themeContext";
import { createGlobalStyles, ThemeColors } from "@/styles/global";
import { useState } from "react";
import { ScrollView, StyleSheet, Text } from "react-native";

export default function profile() {
    const {colors} = useTheme()
    const globalStyles = useThemedStyles(createGlobalStyles)
    const styles = useThemedStyles(createStyles)

    // WorkoutHistory
    const [selected, setSelected] = useState<string | null>(null);

    return (
        <ScrollView style={globalStyles.scrollviewcontainer}>
            <Text style={globalStyles.title}>Workout history</Text>
            <ActivityCalendar
                selectedKey={selected}
                onDayPress={(key) => setSelected((prev) => (prev === key ? null : key))}
            />  

        </ScrollView>
    );
}

const createStyles = (colors: ThemeColors) => StyleSheet.create({

})

