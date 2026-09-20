import HomeHeader from "@/components/HomeHeader";
import MacroGrid from "@/components/MacroGrid";
import { ScrollView, View } from "react-native";
import { globalStyles } from "../../styles/global";

export default function Index() {
  return (
    <View style={globalStyles.container}>
      <HomeHeader/>
      <ScrollView style={globalStyles.scrollviewcontainer}>
        <MacroGrid/>
      </ScrollView>
    </View>
  );
}


