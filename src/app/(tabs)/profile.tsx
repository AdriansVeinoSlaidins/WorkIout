import Button from "@/components/Button";
import { colors, globalStyles } from "@/styles/global";
import { ScrollView } from "react-native";


export default function () {
    return (
        

        <ScrollView style={globalStyles.container}>
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