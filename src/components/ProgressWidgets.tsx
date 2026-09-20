import { colors, globalStyles } from "@/styles/global";
import { StyleSheet, Text, View } from "react-native";


export default function PrograssWidget () {
    return (
        <View style={styles.container}>
            <Text style={globalStyles.title}>yo</Text>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.surface,
        borderRadius: 10,
        height: 100,
        padding: 10,
    }
})