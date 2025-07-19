type StorageValue<T> = T | null;

export const storage = {
  get<T>(key: string): StorageValue<T> {
    if (typeof window === "undefined") {
      return null;
    }

    try {
      const item = localStorage.getItem(key);
      return item ? (JSON.parse(item) as T) : null;
    } catch (err) {
      console.warn(`storage.get: failed to parse value for key "${key}"`, err);
      return null;
    }
  },

  set<T>(key: string, value: T): void {
    if (typeof window === "undefined") {
      return;
    }

    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (err) {
      console.warn(`storage.set: failed to set value for key "${key}"`, err);
    }
  },

  remove(key: string): void {
    if (typeof window === "undefined") {
      return;
    }

    try {
      localStorage.removeItem(key);
    } catch (err) {
      console.warn(`storage.remove: failed to remove key "${key}"`, err);
    }
  },
};
