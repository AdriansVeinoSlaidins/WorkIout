import { useTheme, useThemedStyles } from "@/context/themeContext";
import { ThemeColors } from "@/styles/global";
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
    restTime,
    restRunning,
    onRestTimePress,
    onFinish,
}: {
    bottomSheetRef: RefObject<BottomSheet | null>;
    sheetIndex: number;
    time: string;
    restTime: string;
    restRunning: boolean;
    onRestTimePress: () => void;
    onFinish: () => void;
}) {
    const { animatedIndex } = useBottomSheet(); // continuous, live drag value

    const { colors } = useTheme();
    const styles = useThemedStyles(createStyles);

    const expanded = sheetIndex === 1;

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

                {/* Left: up/down arrow */}
                <View style={styles.leftGroup}>
                    <TouchableOpacity style={styles.button} onPress={toggleSheet}>
                        <Animated.View style={[styles.iconLayer, upStyle]}>
                            <Ionicons name="chevron-up" size={35} color={colors.text} />
                        </Animated.View>

                        <Animated.View style={[styles.iconLayer, downStyle]}>
                            <Ionicons name="chevron-down" size={35} color={colors.text} />
                        </Animated.View>
                    </TouchableOpacity>
                </View>

                {/* Center: timer */}
                <Text style={styles.timer}>{restRunning ? restTime : time}</Text>

                {/* Right side */}
                <View style={styles.rightGroup}>

                    {/* Hourglass button */} 
                    <View style={styles.hourglassSlot}>
                        <Animated.View
                            style={downStyle}
                            pointerEvents={expanded ? "auto" : "none"}
                        >
                            <TouchableOpacity style={styles.button} onPress={onRestTimePress}>
                                <Ionicons name="hourglass-outline" size={30} color={colors.text} />
                            </TouchableOpacity>
                        </Animated.View>
                    </View>

                    {/* Finish workout button */}
                    <Animated.View
                        style={downStyle}
                        pointerEvents={expanded ? "auto" : "none"}
                    >
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
                                        },
                                    ]
                                );
                            }}
                        >
                            <Ionicons name="arrow-forward-circle-sharp" size={35} color={colors.text} />
                        </TouchableOpacity>
                    </Animated.View>

                </View>

            </View>
        </View>
    );
}

const createStyles = (colors: ThemeColors) =>
    StyleSheet.create({
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
            paddingHorizontal: 20,
            marginTop: 8,
        },
        leftGroup: {
            flex: 1,
            flexDirection: "row",
            justifyContent: "flex-start",
        },
        rightGroup: {
            flex: 1,
            flexDirection: "row",
            alignItems: "center",
        },
        hourglassSlot: {
            flex: 1,               
            alignItems: "center",   
            justifyContent: "center",
        },
        button: {
            width: 40,
            height: 40,
            justifyContent: "center",
            alignItems: "center",
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
            fontWeight: "bold",
            fontVariant: ["tabular-nums"],
        },
    });