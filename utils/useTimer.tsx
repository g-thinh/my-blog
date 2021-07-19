import { useEffect, useRef, useState } from "react";

export function useTimer(callback: () => void, delay: number | null) {
  const [timeLeft, setTimeLeft] = useState(delay / 1000);
  const [delayDuration, setDelayDuration] = useState(delay + 1000);

  const intervalId = useRef(null);
  const timeoutId = useRef(null);
  const savedCallback = useRef(callback);

  useEffect(() => {
    savedCallback.current = callback;
    if (!timeLeft) return;

    intervalId.current = setInterval(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);

    return () => clearInterval(intervalId.current);
  }, [timeLeft, callback]);

  useEffect(() => {
    if (delayDuration === null) {
      return;
    }

    timeoutId.current = setTimeout(
      () => savedCallback.current(),
      delayDuration
    );

    return () => clearTimeout(timeoutId.current);
  }, [delayDuration]);

  const reset = () => {
    clearInterval(intervalId.current);
    clearTimeout(timeoutId.current);
  };

  const resume = (time: number) => setDelayDuration(time * 1000);

  return { timeLeft, reset, resume };
}
