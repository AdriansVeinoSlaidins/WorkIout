import { useAuth } from "@/hooks/useAuth";
import { dateKey } from "@/hooks/useWorkoutDays";
import { useCallback, useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";

export function calcStreak(days: Set<string>, today = new Date()) {
    const d = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    const trainedToday = days.has(dateKey(d));

    if (!trainedToday) d.setDate(d.getDate() - 1);

    let streak = 0;
    while (days.has(dateKey(d))) {
        streak++;
        d.setDate(d.getDate() - 1);
    }
    return { streak, trainedToday };
}

export default function useStreak() {
    const { session } = useAuth();
    const userId = session?.user.id;
    const [state, setState] = useState({ streak: 0, trainedToday: false });

    const load = useCallback(async () => {
        if (!userId) {
            setState({ streak: 0, trainedToday: false });
            return;
        }

        const { data, error } = await supabase
            .from("workouts")
            .select("completed_at")
            .eq("user_id", userId);

        if (error) {
            console.error("Failed to load streak:", error.message);
            return;
        }

        const days = new Set((data ?? []).map((w) => dateKey(new Date(w.completed_at))));
        setState(calcStreak(days));
    }, [userId]);
    useEffect(() => {
        if (!userId) return;
        load();

        const channel = supabase
            .channel(`streak-${userId}`)
            .on("postgres_changes", { event: "*", schema: "public", table: "workouts" }, () => load())
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, [userId, load]);
    return state; // { streak, trainedToday }
}