
import { useThemedStyles } from "@/context/themeContext";
import { createGlobalStyles } from "@/styles/global";
import { Pressable, ScrollView, Text } from "react-native";

export default function profile() {
    const globalStyles = useThemedStyles(createGlobalStyles)

    const cehckUser = async () => {
        
    }

    return (
        <ScrollView style={globalStyles.scrollviewcontainer}>

            <Text>Yo</Text>


            <Pressable onPress={cehckUser}>
                <Text>Check what user loged in</Text>
            </Pressable>

        </ScrollView>
    );
}