import { useAuth } from "@/hooks/useAuth";
import { useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import { supabase } from "../../lib/supabase";

export const dateKey = (d: Date) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;

export default function useWorkoutDays(year: number, month: number) {
  const { session } = useAuth();
  const userId = session?.user.id;
  const [days, setDays] = useState<Record<string, number>>({});

  useFocusEffect(
    useCallback(() => {
      if (!userId) {
        setDays({});
        return;
      }
      let cancelled = false;

      (async () => {
        const from = new Date(year, month, 1);
        const to = new Date(year, month + 1, 1);

        const { data, error } = await supabase
          .from("workouts")
          .select("completed_at")
          .eq("user_id", userId)
          .gte("completed_at", from.toISOString())
          .lt("completed_at", to.toISOString());

        if (cancelled) return;
        if (error) {
          console.error("Failed to load workout days:", error.message);
          return;
        }

        const counts: Record<string, number> = {};
        data?.forEach((row) => {
          const key = dateKey(new Date(row.completed_at));
          counts[key] = (counts[key] ?? 0) + 1;
        });
        setDays(counts);
      })();

      return () => {
        cancelled = true;
      };
    }, [userId, year, month])
  );

  return { days };
}