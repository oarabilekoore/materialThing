// packages/react/index.ts
import {
  createSignal,
  useEffect as mtUseEffect,
  Accessor,
} from "@materialthing/core";

// Symbol for React elements
const REACT_ELEMENT_TYPE = Symbol.for("react.element");

// --- TYPE DEFINITIONS ---

type SetStateAction<S> = S | ((prevState: S) => S);
type Dispatch<A> = (value: A) => void;

interface RefObject<T> {
  current: T;
}

type EffectCallback = () => void | (() => void);
type DependencyList = ReadonlyArray<any>;

// --- INTERNAL HELPERS ---

/**
 * Tracks whether dependencies have changed between renders
 */
function areDepsEqual(
  prevDeps: DependencyList | undefined,
  nextDeps: DependencyList | undefined
): boolean {
  if (prevDeps === undefined || nextDeps === undefined) return false;
  if (prevDeps.length !== nextDeps.length) return false;

  for (let i = 0; i < prevDeps.length; i++) {
    if (!Object.is(prevDeps[i], nextDeps[i])) {
      return false;
    }
  }
  return true;
}

/**
 * Unwraps a value if it's a signal, otherwise returns it as-is
 */
function unwrapSignal<T>(value: T | Accessor<T>): T {
  //@ts-ignore
  return typeof value === "function" && !value.prototype
    ? (value as Accessor<T>)() //@ts-ignore
    : value;
}

// --- CORE REACT EXPORTS ---

/**
 * Component instance storage for hook state
 */
const componentStates = new WeakMap<Function, Map<number, any>>();
let currentComponent: Function | null = null;
let hookIndex = 0;

/**
 * Reset hook tracking for a new component render
 */
function resetHooks(component: Function) {
  currentComponent = component;
  hookIndex = 0;
}

/**
 * Get or create state storage for current component
 */
function getComponentState<T>(initializer: () => T): T {
  if (!currentComponent) {
    throw new Error("Hooks can only be called inside a component");
  }

  if (!componentStates.has(currentComponent)) {
    componentStates.set(currentComponent, new Map());
  }

  const states = componentStates.get(currentComponent)!;
  const currentIndex = hookIndex++;

  if (!states.has(currentIndex)) {
    states.set(currentIndex, initializer());
  }

  return states.get(currentIndex);
}

/**
 * useState - Maps to MaterialThing signals with proper state management
 * Returns a tuple of [value, setValue] that matches React's API
 */
export function useState<T>(
  initialValue: T | (() => T)
): [T, Dispatch<SetStateAction<T>>] {
  const state = getComponentState(() => {
    // Support lazy initialization
    const initial =
      typeof initialValue === "function"
        ? (initialValue as () => T)()
        : initialValue;

    const [signal, setSignal] = createSignal<T>(initial);

    // Create a setter that matches React's API
    const setState: Dispatch<SetStateAction<T>> = (action) => {
      if (typeof action === "function") {
        setSignal((action as (prev: T) => T)(signal()));
      } else {
        setSignal(action);
      }
    };

    return { signal, setState };
  });

  // Return the unwrapped value, not the signal accessor
  return [state.signal(), state.setState];
}

/**
 * useEffect - Maps to MaterialThing effects with dependency tracking
 */
export function useEffect(effect: EffectCallback, deps?: DependencyList): void {
  const state = getComponentState(() => ({
    prevDeps: undefined as DependencyList | undefined,
    cleanup: undefined as (() => void) | void,
    isFirstRun: true,
  }));

  mtUseEffect(() => {
    // Skip if deps haven't changed (except first run)
    if (
      !state.isFirstRun &&
      deps !== undefined &&
      areDepsEqual(state.prevDeps, deps)
    ) {
      return;
    }

    // Run cleanup from previous effect
    if (state.cleanup) {
      state.cleanup();
      state.cleanup = undefined;
    }

    // Run the effect
    state.cleanup = effect();
    state.prevDeps = deps;
    state.isFirstRun = false;
  });
}

/**
 * useLayoutEffect - Runs synchronously after DOM mutations
 * In MaterialThing, we alias it to useEffect since effects run immediately
 */
export function useLayoutEffect(
  effect: EffectCallback,
  deps?: DependencyList
): void {
  useEffect(effect, deps);
}

/**
 * useCallback - Returns a memoized callback
 */
export function useCallback<T extends (...args: any[]) => any>(
  callback: T,
  deps: DependencyList
): T {
  const state = getComponentState(() => ({
    memoizedCallback: callback,
    prevDeps: undefined as DependencyList | undefined,
  }));

  if (!areDepsEqual(state.prevDeps, deps)) {
    state.memoizedCallback = callback;
    state.prevDeps = deps;
  }

  return state.memoizedCallback;
}

/**
 * useMemo - Returns a memoized value
 */
export function useMemo<T>(factory: () => T, deps: DependencyList): T {
  const state = getComponentState(() => ({
    memoizedValue: factory(),
    prevDeps: undefined as DependencyList | undefined,
  }));

  if (!areDepsEqual(state.prevDeps, deps)) {
    state.memoizedValue = factory();
    state.prevDeps = deps;
  }

  return state.memoizedValue;
}

/**
 * useRef - Creates a mutable ref object
 */
export function useRef<T>(initialValue: T): RefObject<T>;
export function useRef<T>(initialValue: T | null): RefObject<T | null>;
export function useRef<T = undefined>(): RefObject<T | undefined>;
export function useRef<T>(initialValue?: T): RefObject<T | undefined> {
  return getComponentState(() => ({ current: initialValue }));
}

/**
 * forwardRef - Forwards refs to child components
 */
export function forwardRef<T, P = {}>(
  render: (props: P, ref: RefObject<T> | null) => any
) {
  return (props: P & { ref?: RefObject<T> }) => {
    const { ref, ...restProps } = props as any;
    return render(restProps as P, ref || null);
  };
}

/**
 * createContext - Creates a React context
 */
interface Context<T> {
  Provider: (props: { value: T; children: any }) => any;
  Consumer: (props: { children: (value: T) => any }) => any;
  _currentValue: T;
}

export function createContext<T>(defaultValue: T): Context<T> {
  const [currentValue, setCurrentValue] = createSignal<T>(defaultValue);

  return {
    Provider: ({ value, children }: { value: T; children: any }) => {
      mtUseEffect(() => {
        setCurrentValue(value);
      });
      return children;
    },
    Consumer: ({ children }: { children: (value: T) => any }) => {
      return children(currentValue());
    },
    _currentValue: defaultValue,
  };
}

/**
 * useContext - Accesses context value
 */
export function useContext<T>(context: Context<T>): T {
  return context._currentValue;
}

/**
 * memo - Memoizes a component
 */
export function memo<P extends object>(
  Component: (props: P) => any,
  areEqual?: (prevProps: P, nextProps: P) => boolean
) {
  return (props: P) => {
    // Basic implementation - just return the component
    // A full implementation would cache based on props
    return Component(props);
  };
}

/**
 * Children utilities
 */
export const Children = {
  map: (children: any, fn: (child: any, index: number) => any) => {
    const childArray = Array.isArray(children) ? children : [children];
    return childArray.filter((c) => c != null).map(fn);
  },

  forEach: (children: any, fn: (child: any, index: number) => void) => {
    const childArray = Array.isArray(children) ? children : [children];
    childArray.filter((c) => c != null).forEach(fn);
  },

  count: (children: any): number => {
    const childArray = Array.isArray(children) ? children : [children];
    return childArray.filter((c) => c != null).length;
  },

  only: (children: any): any => {
    const childArray = Array.isArray(children) ? children : [children];
    const filtered = childArray.filter((c) => c != null);
    if (filtered.length !== 1) {
      throw new Error(
        "Children.only expected to receive a single React element child."
      );
    }
    return filtered[0];
  },

  toArray: (children: any): any[] => {
    const childArray = Array.isArray(children) ? children : [children];
    return childArray.filter((c) => c != null);
  },
};

/**
 * isValidElement - Checks if a value is a valid React element
 */
export function isValidElement(element: any): boolean {
  return (
    typeof element === "object" &&
    element !== null &&
    element.$$typeof === REACT_ELEMENT_TYPE
  );
}

/**
 * createElement - Creates a React element (VNode)
 */
export function createElement(
  type: string | Function,
  props: Record<string, any> | null,
  ...children: any[]
): any {
  const flattenedChildren = children.flat().filter((c) => c != null);

  return {
    $$typeof: REACT_ELEMENT_TYPE,
    type,
    key: props?.key ?? null,
    ref: props?.ref ?? null,
    props: {
      ...props,
      children:
        flattenedChildren.length === 0
          ? undefined
          : flattenedChildren.length === 1
          ? flattenedChildren[0]
          : flattenedChildren,
    },
  };
}

/**
 * Fragment - React Fragment component
 */
export const Fragment = ({ children }: { children: any }) => children;

/**
 * StrictMode - No-op in MaterialThing
 */
export const StrictMode = ({ children }: { children: any }) => children;

/**
 * Suspense - Basic implementation (no actual suspending)
 */
export const Suspense = ({
  children,
  fallback,
}: {
  children: any;
  fallback?: any;
}) => children;

/**
 * createPortal - Renders children into a different part of the DOM tree
 */
export function createPortal(
  children: any,
  container: Element | DocumentFragment
): any {
  // Create a special portal VNode that the renderer will handle
  return {
    $typeof: Symbol.for("react.portal"),
    key: null,
    children,
    containerInfo: container,
    implementation: null,
  };
}

// --- DEFAULT EXPORT ---
export default {
  createElement,
  useState,
  useEffect,
  useLayoutEffect,
  useCallback,
  useMemo,
  useRef,
  forwardRef,
  createContext,
  useContext,
  memo,
  Children,
  isValidElement,
  Fragment,
  StrictMode,
  Suspense,
  createPortal,
};
