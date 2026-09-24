import { StyleSheet, Text, TouchableOpacity } from "react-native";



type ButtonProps = {
    labeltext: string,
    color: string,
    OnPress: () => void,
}

export default function Button({
    labeltext,
    color,
    OnPress,
}: ButtonProps) {
    return (
        <TouchableOpacity
        style={[styles.button, {backgroundColor: color}]}
        onPress={OnPress}
        >
            <Text style={styles.text}>{labeltext}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
  button: {
    marginTop: 15,
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  text: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});