import { useEffect, useRef } from "react";

export const useDebounce = <T>(value: T, fn: () => void, delay: number) => {
  const timerRef = useRef<NodeJS.Timeout>();
  useEffect(() => {
    if (value) {
      timerRef.current = setTimeout(fn, delay);
    }
    return () => {
      console.log("Removing timer...");
      clearTimeout(timerRef.current);
    };
  }, [value]);
};
