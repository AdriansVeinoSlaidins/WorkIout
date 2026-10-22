import WorkoutHistory from "@/components/home-page/WorkoutHistory";
import { useTheme, useThemedStyles } from "@/context/themeContext";
import { ScrollView, StyleSheet, Text, TouchableOpacity } from "react-native";
import { supabase } from "../../../lib/supabase";
import { createGlobalStyles, ThemeColors } from "../../styles/global";

export default function Index() {
  const {colors} = useTheme()
  const globalStyles = useThemedStyles(createGlobalStyles)
  const styles = useThemedStyles(createStyles)

  const deleteOldestWorkout = async() => {
    const {data: oldest, error: fetchError } = await supabase
      .from("workouts")
      .select("id")
      .order("completed_at", { ascending: true })
      .limit(1)
      .single()
      if (fetchError || !oldest) {
        console.error("Failed to find oldest workout:", fetchError?.message);
      return;
  }
  const { error: deleteError } = await supabase
        .from("workouts")
        .delete()
        .eq("id", oldest.id);

    if (deleteError) {
        console.error("Failed to delete workout:", deleteError.message);
        return;
    }
}; 

  
  return (
      <ScrollView style={globalStyles.scrollviewcontainer}>
        
        <WorkoutHistory/>

        <TouchableOpacity style={globalStyles.buttonMainBlue} onPress={deleteOldestWorkout}>
          <Text>Delete Oldest</Text>
        </TouchableOpacity>
      </ScrollView>
  );
}

const createStyles = (colors: ThemeColors) => StyleSheet.create({

})


