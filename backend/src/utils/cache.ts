import { Pokemon } from '../types/pokemon';

type CacheEntry<T> = {
  value: T;
  expires: number;
};

const createCache = <T>(defaultTtlMs: number = 1000 * 60 * 5) => {
  const map = new Map<string, CacheEntry<T>>();

  return {
    get(key: string): T | undefined {
      const entry = map.get(key);
      if (!entry) return undefined;

      if (Date.now() > entry.expires) {
        map.delete(key);
        return undefined;
      }

      return entry.value;
    },

    set(key: string, value: T, ttl = defaultTtlMs) {
      const expires = Date.now() + ttl;
      map.set(key, { value, expires });
    },

    clear() {
      map.clear();
    },

    getAll(): T[] {
      const now = Date.now();
      return Array.from(map.values())
        .filter((e) => e.expires > now)
        .map((e) => e.value);
    },
  };
};

const TTL = 1000 * 60 * 5; // time to live 5 minutes

/**
 * IMPORTANT!
 * This cache is stored in-memory and only exists during the current Node.js process.
 * All cached data will be lost when the server restarts, redeploys, or scales to new instances.
 */
export const cacheManager = {
  list: createCache<Pokemon[]>(TTL),
  details: createCache<Pokemon>(TTL),
};
