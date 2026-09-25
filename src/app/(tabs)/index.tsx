import ProgressWidget from "@/components/ProgressWidgets";
import WorkoutHistory from "@/components/workoutHistory";
import { ScrollView, Text } from "react-native";
import { globalStyles } from "../../styles/global";

export default function Index() {

  
  return (
      <ScrollView style={globalStyles.scrollviewcontainer}>
        <Text style={globalStyles.title}>Last Workouts</Text>
        <ProgressWidget label="Volume" value={10}/>
        
        <WorkoutHistory/>

      </ScrollView>
  );
}


