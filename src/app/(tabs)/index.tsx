import PrograssWidget from "@/components/ProgressWidgets";
import { ScrollView } from "react-native";
import { globalStyles } from "../../styles/global";

export default function Index() {
  return (
      <ScrollView style={globalStyles.scrollviewcontainer}>
        <PrograssWidget/>
      </ScrollView>
  );
}


