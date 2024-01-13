import { useState } from 'react';

/**
 * Custom hook for persisting and retrieving state to/from localStorage.
 * It initializes state with a value from localStorage or a default value,
 * and updates localStorage whenever the state changes.
 *
 * @param key - The localStorage key to be used.
 * @param initialValue - The initial value to be used if no item is found in localStorage.
 * @param validValues - Optional array of valid values. If provided, the hook will validate the retrieved value from localStorage against this array.
 * @returns A stateful value, and a function to update it.
 *
 * @example
 * const [theme, setTheme] = useLocalStorage('theme', 'light', ['light', 'dark']);
 * // 'theme' will be initialized with either the value from localStorage, 'light' if not present in localStorage, or 'light' if the value in localStorage is not 'light' or 'dark'.
 */
function useLocalStorage<T>(
  key: string,
  initialValue: T,
  validValues?: T[]
): [T, (value: T | ((val: T) => T)) => void] {
  // State to store the value
  // We pass a function to useState, so the logic is only executed once
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      // Get from local storage by key
      const item = window.localStorage.getItem(key);
      if (item) {
        // Parse stored JSON or return initialValue
        const parsedItem = JSON.parse(item);
        // Check if the parsed item is among the valid values, if provided
        if (validValues && !validValues.includes(parsedItem)) {
          return initialValue;
        }
        return parsedItem;
      }
      return initialValue;
    } catch (error) {
      console.error('Failed to retrieve item from localStorage:', error);
      return initialValue;
    }
  });

  // Return a wrapped version of useState's setter function that persists the new value to localStorage
  const setValue = (value: T | ((val: T) => T)) => {
    try {
      // Allow value to be a function so we have the same API as useState
      // Check if the value is a function and call it with the current stored value
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;

      // Update the state with the new value
      setStoredValue(valueToStore);

      // Save the new value to localStorage
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      // Log any errors during the process
      console.error('Failed to set item in localStorage:', error);
    }
  };

  // Return the stored value and the setter function
  return [storedValue, setValue];
}

export default useLocalStorage;
