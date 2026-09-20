import Button from "@/components/Button";
import { colors, globalStyles } from "@/styles/global";
import { ScrollView, Text } from "react-native";


export default function () {
    return (
        <ScrollView style={globalStyles.container}>
            <Text style={globalStyles.title}>Profile</Text>
            <Text style={globalStyles.title}>Workout</Text>
                        <Button 
                            labeltext="Test"
                            color={colors.primary}
                            OnPress={() => {
                                console.log("Test Pressed");
                            }}
                            />

        </ScrollView>
    )
}