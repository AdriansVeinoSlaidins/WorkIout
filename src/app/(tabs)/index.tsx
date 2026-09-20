import { ScrollView, Text } from "react-native";
import { globalStyles } from "../../styles/global";

export default function Index() {
  return (
      <ScrollView style={globalStyles.scrollviewcontainer}>
        <Text style={globalStyles.title}>YO</Text>
      </ScrollView>
  );
}


