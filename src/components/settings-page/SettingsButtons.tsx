import { useTheme, useThemedStyles } from '@/context/themeContext';
import { ThemeColors } from '@/styles/global';
import { Ionicons } from '@expo/vector-icons';
import { ComponentProps } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function settingsButtons({
    buttonName,
    iconName,
    onPress,
}: {
    buttonName: string,
    iconName: ComponentProps<typeof Ionicons>["name"],
    onPress: () => void,
}) {
    const {colors} = useTheme()
    const styles = useThemedStyles(createStyles)
    return (
        <TouchableOpacity style={styles.container} onPress={onPress}>
            <View style={styles.buttonInfo}>
            <Text style={styles.text}>{buttonName}</Text>
            <Ionicons name={iconName} size={30} color={colors.text}/>
        </View>
        <View>
            <Ionicons name="chevron-forward" size={30} color={colors.text}/>
        </View>

    </TouchableOpacity>
  )
}

const createStyles = (colors: ThemeColors) => StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "row",
        height: 60,
        alignItems: "center",
        justifyContent: "space-between",

        margin: 5,
        padding: 10,
        borderRadius: 12,

        borderColor: colors.surfaceLight,
        backgroundColor: colors.surface,
        elevation: 4,
        borderWidth: 1,
    },
    buttonInfo: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        gap: 12,
    },
    text: {
        fontSize: 20,
        color: colors.text,
        fontWeight: "bold",
    }


})