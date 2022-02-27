import { useCallback, useEffect, useState } from "react";

type SetState<T> = React.Dispatch<React.SetStateAction<T>>;

const useLocalStorage = <T>(key: string, initialValue: T): [T, SetState<T>] => {
  const getValue = useCallback((): T => {
    // Prevent build error "window is undefined" but keep working, (SSR)
    if (typeof window === "undefined") {
      return initialValue;
    }

    try {
      const item = window.localStorage.getItem(key);
      return item ? (parseJSON(item) as T) : initialValue;
    } catch (error) {
      console.warn(`Error loading localStorage key "${key}":`, error);
      return initialValue;
    }
  }, [initialValue, key]);

  const [savedValue, setSavedValue] = useState<T>(getValue);

  const setValue: SetState<T> = (value: unknown) => {
    if (typeof window == "undefined") {
      console.warn(
        `Tried setting localStorage key “${key}” even though environment is not a client`
      );
    }

    try {
      // Allow function as a value in local storage.
      const newValue = value instanceof Function ? value(savedValue) : value;

      window.localStorage.setItem(key, JSON.stringify(newValue)); // Save to local storage

      setSavedValue(newValue);
    } catch (error) {
      console.log(`Error loading localStorage key "${key}":`, error);
    }
  };

  useEffect(() => {
    setSavedValue(getValue());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return [savedValue, setValue];
};

export default useLocalStorage;

function parseJSON<T>(value: string | null): T | undefined {
  try {
    return value === "undefined" ? undefined : JSON.parse(value ?? "");
  } catch (error) {
    console.error("parsing error on", { value });
    return undefined;
  }
}
