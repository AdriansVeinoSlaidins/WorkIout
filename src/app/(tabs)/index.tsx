import { Text, View, StyleSheet, ScrollView } from "react-native";
import { globalStyles } from "../../styles/global";
import HomeHeader from "@/components/HomeHeader";
import { Link } from "expo-router";
import MacroGrid from "@/components/MacroGrid";

export default function Index() {
  return (
    <ScrollView style={globalStyles.container}>
      <Text style={globalStyles.title}>Hello! </Text>
      <HomeHeader/>
      <MacroGrid/>
    </ScrollView>
  );
}


