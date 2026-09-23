import Button from "@/components/Button";
import CustomHandle from "@/components/customHandle";
import { colors, globalStyles } from "@/styles/global";
import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { useMemo, useRef, useState } from "react";
import { ScrollView, StyleSheet, Text } from "react-native";

export default function () {
    const SnapPoints = useMemo(() => ["9%", "100%"], []);
    const BottomSheetRef = useRef<BottomSheet>(null);

    const [sheetIndex, setSheetIndex] = useState(1);

    const OpenSheet = () => {
        BottomSheetRef.current?.expand();
    };

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
                enableOverDrag={false}
                index={-1}
                enableHandlePanningGesture={true}
                enableDynamicSizing={false}
                backgroundStyle={styles.handleBackground}

                onChange={(index) => {
                    setSheetIndex(index);
                    console.log(index)
                }}

                handleComponent={() => (
                    <CustomHandle
                        bottomSheetRef={BottomSheetRef}
                        sheetIndex={sheetIndex}
                    />
                )}
            >
                <BottomSheetScrollView
                    contentContainerStyle={styles.contentContainer}
                >
                    <Text>Yo</Text>
                </BottomSheetScrollView>
            </BottomSheet>
        </>
    );
}

const styles = StyleSheet.create({
    contentContainer: {
        flex: 1,
        backgroundColor: colors.background,
        margin: 15,
    },

    handleBackground: {
        backgroundColor: colors.surface,
        borderColor: colors.outline,
        borderWidth: 2,
    },
});