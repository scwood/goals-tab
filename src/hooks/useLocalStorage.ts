import { useEffect, useState, Dispatch, SetStateAction } from "react";

export function useLocalStorage<T>(config: {
  key: string;
  defaultValue: T;
}): [T, Dispatch<SetStateAction<T>>] {
  const [value, setValue] = useState<T>(
    JSON.parse(window.localStorage.getItem(config.key) ?? "null") ??
      config.defaultValue
  );

  useEffect(() => {
    window.localStorage.setItem(config.key, JSON.stringify(value));
  }, [config.key, value]);

  return [value, setValue];
}
