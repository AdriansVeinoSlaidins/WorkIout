import { colors } from "@/styles/global";
import { Ionicons } from "@expo/vector-icons";
import BottomSheet, { useBottomSheet } from "@gorhom/bottom-sheet";
import { RefObject } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Animated, {
    Extrapolation,
    interpolate,
    useAnimatedStyle,
} from "react-native-reanimated";

export default function CustomHandle({
    bottomSheetRef,
    sheetIndex,
}: {
    bottomSheetRef: RefObject<BottomSheet | null>;
    sheetIndex: number;
}) {
    const { animatedIndex } = useBottomSheet(); // continuous, live drag value

    const toggleSheet = () => {
        if (sheetIndex === 1) {
            bottomSheetRef.current?.snapToIndex(0);
        } else {
            bottomSheetRef.current?.snapToIndex(1);
        }
    };

    const upStyle = useAnimatedStyle(() => ({
        opacity: interpolate(animatedIndex.value, [0, 1], [1, 0], Extrapolation.CLAMP),
    }));

    const downStyle = useAnimatedStyle(() => ({
        opacity: interpolate(animatedIndex.value, [0, 1], [0, 1], Extrapolation.CLAMP),
    }));

    return (
        <View style={styles.handleContainer}>
            <View style={styles.handle} />

            <View style={styles.controls}>
                <TouchableOpacity style={styles.button} onPress={toggleSheet}>

                    <Animated.View style={[styles.iconLayer, upStyle]}>
                        <Ionicons name="chevron-up" size={35} color={colors.text} />
                    </Animated.View>

                    <Animated.View style={[styles.iconLayer, downStyle]}>
                        <Ionicons name="chevron-down" size={35} color={colors.text} />
                    </Animated.View>

                </TouchableOpacity>


                <Animated.View style={downStyle}>
                    <Text style={styles.timer}>00:00:00</Text>
                </Animated.View>
                    
                <Animated.View style={downStyle}>
                    <TouchableOpacity style={styles.button}>
                        <Ionicons name="arrow-forward-circle-sharp" size={35} color={colors.text} />
                    </TouchableOpacity>
                </Animated.View>
                
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    handleContainer: { height: 75, alignItems: "center" },
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
        alignItems: "center" 
    },
    iconLayer: {
        position: "absolute",
        width: "100%",
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
    },
    timer: { 
        color: colors.text,
        fontSize: 20,
        fontWeight: "bold"
    },
});