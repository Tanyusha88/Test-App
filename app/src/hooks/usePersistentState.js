import { useEffect, useRef, useState } from 'react';

const PREFIX = 'thank-you-me:';

function read(key, fallback) {
  try {
    const raw = window.localStorage.getItem(PREFIX + key);
    return raw === null ? fallback : JSON.parse(raw);
  } catch {
    return fallback;
  }
}

// useState backed by localStorage under a namespaced key. Reads once on
// mount, writes on every change; falls back to in-memory state if storage
// is unavailable (private browsing, disabled storage, etc).
export function usePersistentState(key, fallback) {
  const [value, setValue] = useState(() => read(key, fallback));
  const first = useRef(true);

  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    try {
      window.localStorage.setItem(PREFIX + key, JSON.stringify(value));
    } catch {
      // storage unavailable — state still works for this session
    }
  }, [key, value]);

  return [value, setValue];
}
