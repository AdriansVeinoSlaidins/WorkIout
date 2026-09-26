import ExerciseWidget from '@/components/workout-page/exerciseWidget';
import { colors, globalStyles } from '@/styles/global';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function WorkoutList() {
  return (
    <View style={styles.container}>

        <View style={styles.workoutListHeader}>
            <TouchableOpacity
            style={styles.backButton}
            onPress={() => {router.push("/(tabs)/workout")}}>
                <Ionicons name="arrow-back" size={35} color="white" />
            </TouchableOpacity>

            <Text style={[globalStyles.title, styles.headerTitle]}>Exercises</Text>
        </View>
        
        <ExerciseWidget/>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 5,
        paddingHorizontal: 10,
        backgroundColor: colors.background,
    },
    scrollviewcontainer: {
        backgroundColor: colors.surface,
        marginTop: 10,
        borderRadius: 10,

    },
    workoutListHeader: {
        backgroundColor: colors.surface,
        padding: 10,
        borderRadius: 10,
        flexDirection: "row",
        alignItems: "center",
    },

    backButton: {
        zIndex: 10,
    },

    headerTitle: {
        position: "absolute",
        left: 0,
        right: 0,
        textAlign: "center",
    },
});