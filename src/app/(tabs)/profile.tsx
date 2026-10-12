import { globalStyles } from "@/styles/global";
import { Pressable, ScrollView, Text } from "react-native";

export default function profile() {


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