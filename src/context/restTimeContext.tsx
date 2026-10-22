import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, ReactNode, useCallback, useContext, useEffect, useState } from "react";

type RestTimeContextType = {
    restTime: number;
    setRestTime: (seconds: number) => void;
};

const RestTimeContext = createContext<RestTimeContextType | null>(null);

const STORAGE_KEY = "restTime";
const DEFAULT_REST = 30;
const MIN_REST = 5;
const MAX_REST = 600;

export function RestTimeProvider({ children }: { children: ReactNode }) {
    const [restTime, setRestTimeState] = useState(DEFAULT_REST);
    useEffect(() => {
        AsyncStorage.getItem(STORAGE_KEY).then((saved) => {
            const n = saved ? parseInt(saved, 10) : NaN;
            if (!isNaN(n)) {
                setRestTimeState(Math.min(MAX_REST, Math.max(MIN_REST, n)));
            }
        });
    }, []);

    const setRestTime = useCallback((seconds: number) => {
        const clamped = Math.min(MAX_REST, Math.max(MIN_REST, Math.round(seconds)));
        setRestTimeState(clamped);
        AsyncStorage.setItem(STORAGE_KEY, String(clamped));
    }, []);

    return (
        <RestTimeContext.Provider value={{ restTime, setRestTime }}>
            {children}
        </RestTimeContext.Provider>
    );
}

export function useRestTime() {
    const ctx = useContext(RestTimeContext);
    if (!ctx) throw new Error("useRestTime must be used inside <RestTimeProvider>");
    return ctx;
}