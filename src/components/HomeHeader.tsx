import { StyleSheet, Text, View } from "react-native";
import { colors, globalStyles } from "@/styles/global";

export default function HomeHeader() {
    const currantDate = new Date().toLocaleDateString("lv-LV", {
        weekday: "long",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric"
    });

    return (
        <View style={globalStyles.header}>
            <Text style={styles.date}>{currantDate}</Text>                 
        </View>
    );
}

const styles = StyleSheet.create({
    date: {
        fontSize: 14,
        color: colors.textSecondary,
        marginTop: 4,
        marginBottom: 30
    }
})