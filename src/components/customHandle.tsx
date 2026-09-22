import { colors } from "@/styles/global";
import { Ionicons } from "@expo/vector-icons";
import BottomSheet from "@gorhom/bottom-sheet";
import { RefObject } from "react";
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

export default function CustomHandle({
    bottomSheetRef,
    sheetIndex,
}: {
    bottomSheetRef: RefObject<BottomSheet | null>;
    sheetIndex: number;
}) {
    const toggleSheet = () => {
        if (sheetIndex === 1) {
            bottomSheetRef.current?.snapToIndex(0);
        } else {
            bottomSheetRef.current?.snapToIndex(1);
        }
    };

    return (
        <View style={styles.handleContainer}>

            <View style={styles.handle} />

            <View style={styles.controls}>

                <TouchableOpacity
                    style={styles.button}
                    onPress={toggleSheet}
                >
                    <Ionicons
                        name={sheetIndex === 1 ? "chevron-down" : "chevron-up"}
                        size={35}
                        color={colors.text}
                    />
                </TouchableOpacity>

                <Text style={styles.timer}>
                    00:00:00
                </Text>

                <TouchableOpacity style={styles.button}>
                    <Ionicons
                        name="arrow-forward-circle-sharp"
                        size={35}
                        color={colors.text}
                    />
                </TouchableOpacity>

            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    handleContainer: {
        height: 75,
        alignItems: "center",
    },

    handle: {
        width: 50,
        height: 5,
        borderRadius: 5,
        backgroundColor: colors.textSecondary,
        marginTop: 10,
    },

    controls: {
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 20,
        marginTop: 8,
    },

    button: {
        width: 40,
        height: 40,
        justifyContent: "center",
        alignItems: "center",
    },

    timer: {
        color: colors.text,
        fontSize: 20,
        fontWeight: "bold",
    },
});