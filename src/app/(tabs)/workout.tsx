import Button from "@/components/Button";
import { colors, globalStyles } from "@/styles/global";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { useMemo, useRef } from "react";
import { ScrollView, StyleSheet, Text } from "react-native";




export default function () {
    const SnapPoints = useMemo(() => ["25%", "50%", "75%"], []);
    const BottomSheetRef = useRef<BottomSheet>(null);


    const OpenSheet = () => BottomSheetRef.current?.expand();

    return (  
        <>
            <ScrollView style={globalStyles.scrollviewcontainer}>
                <Button 
                    labeltext="Start Workout"
                    color={colors.primary}
                    OnPress={OpenSheet}
                />
            </ScrollView>

            <BottomSheet
                ref={BottomSheetRef}
                snapPoints={SnapPoints}
                enablePanDownToClose
                index={-1}
            >
                <BottomSheetView>
                    <Text>yo</Text>
                </BottomSheetView>
            </BottomSheet>
        </>
    )
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center'
	},
	contentContainer: {
		flex: 1,
		alignItems: 'center'
	},
	containerHeadline: {
		fontSize: 24,
		fontWeight: '600',
		padding: 20
	}
});