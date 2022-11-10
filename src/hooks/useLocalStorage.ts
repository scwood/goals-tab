import { useEffect, useState, Dispatch, SetStateAction } from "react";

export function useLocalStorage<T>(
  storageKey: string,
  fallbackValue: T
): [T, Dispatch<SetStateAction<T>>] {
  const [value, setValue] = useState<T>(
    JSON.parse(window.localStorage.getItem(storageKey) ?? "null") ??
      fallbackValue
  );

  useEffect(() => {
    window.localStorage.setItem(storageKey, JSON.stringify(value));
  }, [storageKey, value]);

  return [value, setValue];
}
