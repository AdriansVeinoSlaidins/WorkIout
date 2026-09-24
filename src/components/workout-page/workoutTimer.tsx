import { useEffect, useState } from "react";
import { Text } from "react-native";

type TimerProps = {
  running: boolean;
};

export default function Timer({ running }: TimerProps) {
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

  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  const time =
    `${String(hours).padStart(2, "0")}:` +
    `${String(minutes).padStart(2, "0")}:` +
    `${String(secs).padStart(2, "0")}`;

  return <Text>{time}</Text>;
}