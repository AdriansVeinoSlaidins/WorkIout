import WorkoutHistory from "@/components/workoutHistory";
import { ScrollView, Text, TouchableOpacity } from "react-native";
import { supabase } from "../../../lib/supabase";
import { globalStyles } from "../../styles/global";

export default function Index() {

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


