import { globalStyles } from "@/styles/global";
import { Text, ScrollView } from "react-native";


export default function () {
    return (
        <ScrollView style={globalStyles.container}>
            <Text style={globalStyles.title}>Profile</Text>
        </ScrollView>
    )
}