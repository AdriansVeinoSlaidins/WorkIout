
import WorkoutHistory from "@/components/home-page/WorkoutHistory";
import { useTheme, useThemedStyles } from "@/context/themeContext";
import { ThemeColors } from "@/styles/global";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function WorkoutDayScreen() {
    const { date } = useLocalSearchParams<{ date: string }>();
    const router = useRouter();
    const insets = useSafeAreaInsets();

    const { colors } = useTheme();
    const styles = useThemedStyles(createStyles);

    const formattedDate = date
        ? new Date(`${date}T12:00:00`).toLocaleDateString(undefined, {
              month: "long",
              day: "numeric",
              year: "numeric",
          })
        : "Workout";

    return (
        <View style={styles.container}>
            <View
                style={[
                    styles.header,
                    { paddingTop: insets.top },
                ]}
            >
                <TouchableOpacity
                    onPress={() => router.back()}
                    style={styles.backButton}
                    hitSlop={10}
                >
                    <Ionicons
                        name="arrow-back"
                        size={24}
                        color={colors.text}
                    />
                </TouchableOpacity>

                <Text style={styles.headerTitle}>
                    {formattedDate}
                </Text>

                <View style={styles.headerSpacer} />
            </View>
            <ScrollView>
                {/* Workout history */}
                <WorkoutHistory date={date} />
            </ScrollView>
        </View>
    );
}

const createStyles = (colors: ThemeColors) =>
    StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: colors.background,
        },

        header: {
            flexDirection: "row",
            alignItems: "center",
            paddingHorizontal: 20,
            paddingBottom: 15,
            backgroundColor: colors.header,
        },

        backButton: {
            width: 40,
            height: 40,
            justifyContent: "center",
        },

        headerTitle: {
            flex: 1,
            textAlign: "center",
            color: colors.text,
            fontSize: 18,
            fontWeight: "800",
        },

        headerSpacer: {
            width: 40,
        },
    });