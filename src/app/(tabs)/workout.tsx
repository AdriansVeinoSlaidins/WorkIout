import Button from "@/components/Button";
import { colors, globalStyles } from "@/styles/global";
import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { useMemo, useRef } from "react";
import { ScrollView, StyleSheet, Text } from "react-native";




export default function () {
    const SnapPoints = useMemo(() => ["4%","100%"], []);
    const BottomSheetRef = useRef<BottomSheet>(null);

    function  buttonPress() {
        console.log("Heelo mate")
    }

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
                enablePanDownToClose={false}
                index={1}
                enableHandlePanningGesture={true} 
                backgroundStyle={styles.handleBackground}
                handleIndicatorStyle={styles.handle}
            >
                <BottomSheetScrollView contentContainerStyle={styles.contentContainer}>
                    <Text>yo</Text>
                    <Button labeltext="Start Workout" color={colors.primary} OnPress={buttonPress}/>
                    <Button labeltext="Start Workout" color={colors.primary} OnPress={buttonPress}/>
                    <Button labeltext="Start Workout" color={colors.primary} OnPress={buttonPress}/>
                    <Button labeltext="Start Workout" color={colors.primary} OnPress={buttonPress}/>
                    <Button labeltext="Start Workout" color={colors.primary} OnPress={buttonPress}/>
                    <Button labeltext="Start Workout" color={colors.primary} OnPress={buttonPress}/>
                    <Button labeltext="Start Workout" color={colors.primary} OnPress={buttonPress}/>
                    <Button labeltext="Start Workout" color={colors.primary} OnPress={buttonPress}/>
                    <Button labeltext="Start Workout" color={colors.primary} OnPress={buttonPress}/>
                    <Button labeltext="Start Workout" color={colors.primary} OnPress={buttonPress}/>
                    <Button labeltext="Start Workout" color={colors.primary} OnPress={buttonPress}/>
                    <Button labeltext="Start Workout" color={colors.primary} OnPress={buttonPress}/>
                    <Button labeltext="Start Workout" color={colors.primary} OnPress={buttonPress}/>
                    <Button labeltext="Start Workout" color={colors.primary} OnPress={buttonPress}/>

                </BottomSheetScrollView>
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
		backgroundColor: colors.surface ,
        margin: 15,
	},
    handleBackground: {
        backgroundColor: colors.surface,
        borderColor: colors.outline,
        borderWidth: 2,
    },
    handle: {
        backgroundColor: "white",
        width: 50,
        marginBottom: 50,
    }
});