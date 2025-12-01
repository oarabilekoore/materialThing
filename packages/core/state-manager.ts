export type Accessor<T> = () => T;
export type Setter<T> = (value: T | ((prev: T) => T)) => void;

// A global stack to keep track of the currently running effect.
let currentEffect: (() => void) | null = null;

/**
 * Creates a reactive signal.
 * @param initialValue The initial value of the signal.
 * @returns A tuple [accessor, setter].
 */
export function createSignal<T>(initialValue: T): [Accessor<T>, Setter<T>] {
  let value = initialValue;
  const subscribers = new Set<() => void>();

  // 1. The Getter (Accessor)
  const read: Accessor<T> = () => {
    if (currentEffect) {
      subscribers.add(currentEffect);
    }
    return value;
  };

  // 2. The Setter
  const write: Setter<T> = (newValue) => {
    if (typeof newValue === "function") {
      // Support function updates: setCount(n => n + 1)
      value = (newValue as (prev: T) => T)(value);
    } else {
      value = newValue;
    }

    // Notify subscribers
    // We iterate over a copy to ensure safe execution
    [...subscribers].forEach((fn) => fn());
  };

  return [read, write];
}

/**
 * Creates a reactive effect that runs immediately and re-runs whenever
 * any signal read within it changes.
 * @param fn The effect function.
 */
export function useEffect(fn: () => void) {
  const executeEffect = () => {
    const prevEffect = currentEffect;
    currentEffect = executeEffect;
    try {
      fn();
    } finally {
      currentEffect = prevEffect;
    }
  };

  executeEffect();
}

/**
 * Creates a read-only signal that derives its value from other signals.
 * @param fn The computation function.
 * @returns An accessor for the computed value.
 */
export function useComputed<T>(fn: () => T): Accessor<T> {
  // We use a signal to store the computed value internally
  const [read, write] = createSignal<T>(fn());

  // Use an effect to update the signal whenever dependencies change
  useEffect(() => {
    write(fn());
  });

  return read;
}
