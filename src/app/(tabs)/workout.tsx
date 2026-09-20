import { colors, globalStyles } from "@/styles/global";
import { Text, ScrollView } from "react-native";
import Button from "@/components/Button";


export default function () {
    const handleButtonPress = () => {
        console.log("Hello world! from here");
    }

    return (
        <ScrollView style={globalStyles.container}>
            <Text style={globalStyles.title}>Workout</Text>
            <Button 
                labeltext="Start Wrokout"
                color={colors.primary}
                OnPress={handleButtonPress}
                />
        </ScrollView>
    )
}