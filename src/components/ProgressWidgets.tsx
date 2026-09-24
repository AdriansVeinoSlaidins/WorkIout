import { colors } from "@/styles/global";
import { StyleSheet, Text, View } from "react-native";

type LastWorrkoutProps = {
    label: string;
    value: number;
}


export default function ProgressWidget ({
    label,
    value,
}: LastWorrkoutProps) {
    return (
        <View style={styles.container}>
            <Text style={styles.labelText}>{label}</Text>
            <Text style={styles.maintext}>{value}</Text>
        </View>
    )
}
    
    
        
    


const styles = StyleSheet.create({
     container: {
        backgroundColor: colors.surface,
        borderRadius: 10,
        height: 100,
        padding: 10,
        marginVertical: 10,
    },

    labelText: {
        fontSize: 15,
        color: colors.textSecondary,
    },

    maintext: {
        position: "absolute",
        left: 10,
        top: 40,
        fontSize: 20,
        color: colors.text,
        fontWeight: "bold",
    },
})
