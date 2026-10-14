import SettingsButtons from '@/components/settings-page/SettingsButtons'
import { useThemedStyles } from '@/context/themeContext'
import { ThemeColors } from '@/styles/global'
import { router } from 'expo-router'
import { ScrollView, StyleSheet } from 'react-native'

export default function index() {
  const styles = useThemedStyles(createStyles)
  return (
    <ScrollView style={styles.container}>
        <SettingsButtons buttonName='Themes' onPress={() => {router.push("/settings/themes")}} iconName='color-palette-outline'></SettingsButtons>
        <SettingsButtons buttonName='Units' onPress={() => {router.push("/settings/units")}} iconName='construct-outline'></SettingsButtons>
        <SettingsButtons buttonName='Languages' onPress={() => {router.push("/settings/languages")}} iconName='language-outline'></SettingsButtons>
        <SettingsButtons buttonName='Preferences' onPress={() => {router.push("/settings/preferences")}} iconName='accessibility-outline'></SettingsButtons>
    </ScrollView>
  )
}


const createStyles = (colors: ThemeColors) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingTop: 20,

  }

})
 