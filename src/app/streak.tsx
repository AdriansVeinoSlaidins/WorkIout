import { useTheme, useThemedStyles } from "@/context/themeContext";
import { createGlobalStyles, ThemeColors } from "@/styles/global";
import { ScrollView, StyleSheet, Text } from "react-native";

export default function Index() {
  const {colors} = useTheme()
  const globalStyles = useThemedStyles(createGlobalStyles)
  const styles = useThemedStyles(createStyles)



  
  return (
      <ScrollView style={globalStyles.scrollviewcontainer}>
        <Text>Streak</Text>
      </ScrollView>
  );
}

const createStyles = (colors: ThemeColors) => StyleSheet.create({

})


