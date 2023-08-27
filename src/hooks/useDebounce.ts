import { useState, useEffect } from "react";

// TypeScript types
type DebouncedValue<T> = T | undefined;

// Custom hook
const useDebounce = <T>(value: T, delay: number): DebouncedValue<T> => {
  const [debouncedValue, setDebouncedValue] =
    useState<DebouncedValue<T>>(value);

  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(timerId);
    };
  }, [value, delay]);

  return debouncedValue;
};
export default useDebounce;
