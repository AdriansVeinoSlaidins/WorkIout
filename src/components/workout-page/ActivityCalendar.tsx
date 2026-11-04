import { useTheme, useThemedStyles } from "@/context/themeContext";
import useWorkoutDays, { dateKey } from "@/hooks/useWorkoutDays";
import { ThemeColors } from "@/styles/global";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useMemo, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];
const WEEKDAYS = ["M", "T", "W", "T", "F", "S", "S"];

export default function ActivityCalendar({
  onDayPress,
  selectedKey,
}: {
  onDayPress?: (dateKey: string) => void;
  selectedKey?: string | null;
}) {
  const { colors } = useTheme();
  const styles = useThemedStyles(createStyles);

  const today = new Date();
  const [cursor, setCursor] = useState({ year: today.getFullYear(), month: today.getMonth() });
  const { days } = useWorkoutDays(cursor.year, cursor.month);

  const isCurrentMonth =
    cursor.year === today.getFullYear() && cursor.month === today.getMonth();

  const shiftMonth = (delta: number) => {
    setCursor(({ year, month }) => {
      const d = new Date(year, month + delta, 1);
      return { year: d.getFullYear(), month: d.getMonth() };
    });
  };

  const cells = useMemo(() => {
    const offset = (new Date(cursor.year, cursor.month, 1).getDay() + 6) % 7;
    const total = new Date(cursor.year, cursor.month + 1, 0).getDate();
    const list: (number | null)[] = Array(offset).fill(null);
    for (let d = 1; d <= total; d++) list.push(d);
    while (list.length % 7 !== 0) list.push(null);
    return list;
  }, [cursor]);

  const trainedDays = Object.keys(days).length;
  
  return (
    <View style={styles.card}>
      {/* Month header */}
      <View style={styles.headerRow}>
        <TouchableOpacity onPress={() => shiftMonth(-1)} hitSlop={10}>
          <Ionicons name="chevron-back" size={24} color={colors.text} />
        </TouchableOpacity>

        <View style={styles.headerCenter}>
          <Text style={styles.month}>
            {MONTHS[cursor.month]} {cursor.year}
          </Text>
          <Text style={styles.sub}>
            {trainedDays} workout {trainedDays === 1 ? "day" : "days"}
          </Text>
        </View>

        <TouchableOpacity
          onPress={() => shiftMonth(1)}
          disabled={isCurrentMonth}
          hitSlop={10}
        >
          <Ionicons
            name="chevron-forward"
            size={24}
            color={colors.text}
            style={{ opacity: isCurrentMonth ? 0.2 : 1 }}
          />
        </TouchableOpacity>
      </View>

      {/* Weekday labels */}
      <View style={styles.grid}>
        {WEEKDAYS.map((w, i) => (
          <View key={i} style={styles.labelCell}>
            <Text style={styles.weekday}>{w}</Text>
          </View>
        ))}

        {/* Days */}
        {cells.map((day, i) => {
          if (day === null) return <View key={i} style={styles.cell} />;

          const key = dateKey(new Date(cursor.year, cursor.month, day));
          const trained = (days[key] ?? 0) > 0;
          const isToday = isCurrentMonth && day === today.getDate();
          const isSelected = selectedKey === key;

          return (
            <View key={i} style={styles.cell}>
              <TouchableOpacity
                style={[
                  styles.day,
                  trained && styles.dayTrained,
                  isToday && styles.dayToday,
                ]}
                disabled={!trained}
                activeOpacity={0.7}
                onPress={() => {
                  onDayPress?.(key);
                  router.push({
                    pathname:  "/workout-day/[date]",
                    params: {date:key}
                  })
                }}
              >
                <Text style={[styles.dayText, trained && styles.dayTextTrained]}>{day}</Text>
              </TouchableOpacity>
            </View>
          );
        })}
      </View>
    </View>
  );
}

const createStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    card: {
      backgroundColor: colors.surface,
      borderRadius: 16,
      borderWidth: 1,
      borderColor: colors.surfaceLight,
      padding: 14,
      marginTop: 10,
      elevation: 4,
    },
    headerRow: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: 12,
    },
    headerCenter: { alignItems: "center" },
    month: { color: colors.text, fontSize: 18, fontWeight: "800" },
    sub: { color: colors.textSecondary, fontSize: 12, marginTop: 2 },
    grid: { flexDirection: "row", flexWrap: "wrap" },
    labelCell: { width: "14.2857%", alignItems: "center", paddingBottom: 6 },
    weekday: { color: colors.textMuted, fontSize: 12, fontWeight: "700" },
    cell: {
      width: "14.2857%",
      aspectRatio: 1,
      padding: 3,
    },
    day: {
      flex: 1,
      borderRadius: 999,
      borderWidth: 2,
      borderColor: "transparent",
      alignItems: "center",
      justifyContent: "center",
    },
    dayTrained: { backgroundColor: colors.primary },
    dayToday: { borderColor: colors.outlineWhite },
    dayText: { color: colors.textSecondary, fontSize: 14, fontWeight: "600" },
    dayTextTrained: { color: colors.background, fontWeight: "800" },
  });