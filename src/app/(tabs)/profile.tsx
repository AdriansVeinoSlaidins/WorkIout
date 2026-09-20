import Button from "@/components/Button";
import { colors, globalStyles } from "@/styles/global";
import { ScrollView } from "react-native";


export default function () {
    return (
        <ScrollView style={globalStyles.scrollviewcontainer}>
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