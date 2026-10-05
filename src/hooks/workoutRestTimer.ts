import { useCallback, useEffect, useState } from "react";
import { Vibration } from "react-native";

export default function useRestTimer(duration = 30) {
    const [endsAt, setEndsAt] = useState<number | null>(null);
    const [now, setNow] = useState(Date.now());

    useEffect(() => {
        if (endsAt === null) return;
        const id = setInterval(() => {
            const t = Date.now();
            if (t >= endsAt) {
                setEndsAt(null);
                Vibration.vibrate([0, 400, 200, 400]); // rest finished
            } else {
                setNow(t);
            }
        }, 250);
        return () => clearInterval(id);
    }, [endsAt]);

    const start = useCallback(() => {
        const t = Date.now();
        setNow(t);
        setEndsAt(t + duration * 1000);
    }, [duration]);

    const stop = useCallback(() => setEndsAt(null), []);

    const seconds = endsAt === null ? 0 : Math.max(0, Math.ceil((endsAt - now) / 1000));
    const mm = String(Math.floor(seconds / 60)).padStart(2, "0");
    const ss = String(seconds % 60).padStart(2, "0");

    return { time: `${mm}:${ss}`, seconds, running: endsAt !== null, start, stop };
}