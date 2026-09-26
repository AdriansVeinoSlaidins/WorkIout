import { exerciseImages } from "@/data/exerciseImages";
import exercises from "@/data/exercises.json";
import { colors } from "@/styles/global";
import { router } from "expo-router";

import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function ExerciseWidget() {
  return (
    <FlatList
      data={exercises}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.list}
      showsVerticalScrollIndicator={false}
      
      renderItem={({ item }) => (
        <TouchableOpacity
          style={styles.card}
          activeOpacity={0.8}
          onPress={() => {
            router.push({
              pathname: "/workout",
              params: {
                exerciseId: item.id,
              },
            });
          }}


        >
          <Image
            source={
              exerciseImages[
                item.id as keyof typeof exerciseImages
              ]
            }
            style={styles.image}
          />

          <View style={styles.info}>
            <Text style={styles.name} numberOfLines={2}>
              {item.name}
            </Text>

            <View style={styles.typeBadge}>
              <Text style={styles.typeText}>
                {item.type}
              </Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.label}>Equipment</Text>
              <Text style={styles.value} numberOfLines={1}>
                {item.equipment.join(", ")}
              </Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.label}>Target</Text>
              <Text style={styles.value} numberOfLines={1}>
                {item.target.join(", ")}
              </Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.label}>Synergist</Text>
              <Text style={styles.value} numberOfLines={1}>
                {item.synergist.join(", ")}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      )}
    />
  );
}

const styles = StyleSheet.create({
  list: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    paddingBottom: 30,
  },

  card: {
    flexDirection: "row",
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: colors.outline,
    elevation: 3,
  },

  image: {
    width: 105,
    height: 105,
    borderRadius: 12,
    backgroundColor: colors.surfaceLight,
    marginRight: 13,
  },

  info: {
    flex: 1,
    justifyContent: "center",
  },

  name: {
    color: colors.text,
    fontSize: 17,
    fontWeight: "700",
    marginBottom: 6,
  },

  typeBadge: {
    alignSelf: "flex-start",
    backgroundColor: colors.surfaceLight,
    paddingHorizontal: 9,
    paddingVertical: 4,
    borderRadius: 6,
    marginBottom: 6,
  },

  typeText: {
    color: colors.primary,
    fontSize: 11,
    fontWeight: "700",
    textTransform: "uppercase",
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 3,
  },

  label: {
    width: 72,
    color: colors.textMuted,
    fontSize: 11,
    fontWeight: "600",
  },

  value: {
    flex: 1,
    color: colors.textSecondary,
    fontSize: 12,
  },
});