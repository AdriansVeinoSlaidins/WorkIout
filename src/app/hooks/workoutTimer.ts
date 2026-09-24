import { useEffect, useState } from "react";

export default function useTimer(running: boolean) {
    const [seconds, setSeconds] = useState(0);

    useEffect(() => {
        if (!running) {
            return;
        }

        const timer = setInterval(() => {
            setSeconds((oldSeconds) => oldSeconds + 1);
        }, 1000);

        return () => {
            clearInterval(timer);
        };
    }, [running]);

    const reset = () => {
        setSeconds(0);
    };

    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    const time =
        `${String(hours).padStart(2, "0")}:` +
        `${String(minutes).padStart(2, "0")}:` +
        `${String(secs).padStart(2, "0")}`;

    return { time, reset };
}