import { useEffect, type Accessor } from "./state-manager";

// Helper type to check for signals
type TextOrSignal = string | number | Accessor<any>;

// Helper to check if value is a Signal Accessor
function isSignal(value: any): value is Accessor<any> {
  return typeof value === "function";
}

function parseArguments(args: any[]): {
  parent?: HTMLElement;
  text?: TextOrSignal;
  children?: Array<any>;
  props?: Record<string, any>;
} {
  let parent: HTMLElement | undefined;
  let text: TextOrSignal | undefined;
  let children: Array<any> | undefined;
  let props: Record<string, any> = {};

  for (const arg of args) {
    if (arg instanceof HTMLElement) {
      parent = arg;
    } else if (
      typeof arg === "string" ||
      typeof arg === "number" ||
      isSignal(arg)
    ) {
      // Treat strings, numbers, and functions (signals) as text content
      text = arg;
    } else if (Array.isArray(arg)) {
      children = arg;
    } else if (typeof arg === "object" && arg !== null) {
      props = arg;
    }
  }
  return { parent, text, children, props };
}

export function genericElement<T extends HTMLElement>(tag: string) {
  return (...args: any[]): T => {
    const { parent, text, children, props } = parseArguments(args);
    // @ts-ignore
    return createElement<T>({ tag, text, children, parent, props });
  };
}

function createElement<T extends HTMLElement>(data: {
  tag: string;
  parent?: HTMLElement;
  text?: TextOrSignal;
  children?: any[];
  props?: Record<string, any>;
}): T {
  const { tag, parent, text, children, props } = data;
  const element = document.createElement(tag) as T;

  // 1. Handle Props & Events
  if (props) {
    Object.entries(props).forEach(([key, value]) => {
      if (key.startsWith("on") && typeof value === "function") {
        const eventName = key.toLowerCase().substring(2);
        element.addEventListener(eventName, value as any);
      } else if (key === "className" || key === "class") {
        // Handle class signal
        if (isSignal(value)) {
          useEffect(() => element.setAttribute("class", String(value())));
        } else {
          element.setAttribute("class", String(value));
        }
      } else {
        // Handle attribute signal
        if (isSignal(value)) {
          useEffect(() => element.setAttribute(key, String(value())));
        } else {
          element.setAttribute(key, String(value));
        }
      }
    });
  }

  // 2. Handle Text (Static or Signal)
  if (text !== undefined) {
    if (isSignal(text)) {
      // AUTOMATIC BINDING: The Engine now supports Function Signals
      useEffect(() => {
        const val = text();
        element.textContent = val != null ? String(val) : "";
      });
    } else {
      element.textContent = String(text);
    }
  }

  // 3. Handle Children
  if (children && children.length > 0) {
    for (const child of children) {
      if (child instanceof Node) {
        element.appendChild(child);
      } else if (typeof child === "string" || typeof child === "number") {
        element.appendChild(document.createTextNode(String(child)));
      } else if (isSignal(child)) {
        // AUTOMATIC BINDING: Handle signals passed as children
        const textNode = document.createTextNode("");
        useEffect(() => {
          const val = child();
          textNode.textContent = val != null ? String(val) : "";
        });
        element.appendChild(textNode);
      }
    }
  }

  if (parent) {
    parent.appendChild(element);
  }

  return element;
}
