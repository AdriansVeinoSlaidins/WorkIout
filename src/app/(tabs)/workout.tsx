import Button from "@/components/Button";
import { colors, globalStyles } from "@/styles/global";
import { ScrollView } from "react-native";


export default function () {
    const handleButtonPress = () => {
        console.log("Hello world! from here");
    }

    return (
        <ScrollView style={globalStyles.scrollviewcontainer}>
            <Button 
                labeltext="Start Wrokout"
                color={colors.primary}
                OnPress={handleButtonPress}
                />
        </ScrollView>
    )
}