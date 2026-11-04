import { useTheme, useThemedStyles } from "@/context/themeContext";
import { ScrollView, StyleSheet } from "react-native";
import { createGlobalStyles, ThemeColors } from "../../styles/global";

export default function Index() {
  const {colors} = useTheme()
  const globalStyles = useThemedStyles(createGlobalStyles)
  const styles = useThemedStyles(createStyles)



  
  return (
      <ScrollView style={globalStyles.scrollviewcontainer}>
        
      </ScrollView>
  );
}

const createStyles = (colors: ThemeColors) => StyleSheet.create({

})


