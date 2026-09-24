import { colors } from "@/styles/global";
import { Ionicons } from "@expo/vector-icons";
import BottomSheet, { useBottomSheet } from "@gorhom/bottom-sheet";
import { RefObject } from "react";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Animated, {
    Extrapolation,
    interpolate,
    useAnimatedStyle,
} from "react-native-reanimated";

export default function CustomHandle({
    bottomSheetRef,
    sheetIndex,
    time,
    onFinish,
}: {
    bottomSheetRef: RefObject<BottomSheet | null>;
    sheetIndex: number;
    time: string;
    onFinish: () => void;
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

                {/* up/down arrow */}

                <TouchableOpacity style={styles.button} onPress={toggleSheet}>

                    <Animated.View style={[styles.iconLayer, upStyle]}>
                        <Ionicons name="chevron-up" size={35} color={colors.text} />
                    </Animated.View>

                    <Animated.View style={[styles.iconLayer, downStyle]}>
                        <Ionicons name="chevron-down" size={35} color={colors.text} />
                    </Animated.View>

                </TouchableOpacity>

                {/* Timer */}

                <Text style={styles.timer}>{time}</Text>
                
                {/* Finish workout button */}

                <Animated.View style={downStyle}>
                    <TouchableOpacity 
                    style={styles.button}
                    onPress={() => {
                        Alert.alert(
                            "Finish workout?",
                            `Workout time: ${time}`,
                            [
                                {
                                    text: "No",
                                    style: "cancel",
                                },
                                {
                                    text: "Yes",
                                    onPress: onFinish,
                                }
                            ]
                        )
                    }}
                    >
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