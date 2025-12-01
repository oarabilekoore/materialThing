import h from "../core/html-elements";
import { css } from "../core/css-manager";
import { useEffect, type Accessor } from "../core/state-manager";
import type { CSSObject } from "../core/css-manager";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      [elemName: string]: {
        style?: CSSObject | string | Accessor<CSSObject | string>;
        className?: string | Accessor<string>;
        class?: string | Accessor<string>;
        children?: any;
        [key: string]: any;
      };
    }
    interface ElementAttributesProperty {
      props: {};
    }

    interface ElementChildrenAttribute {
      children: {};
    }
  }
}

// Helper: Detect if a value is a Signal Accessor (function)
function isSignal(value: any): value is Accessor<any> {
  return typeof value === "function";
}

// Helper: Apply a single attribute value to an element
function applyAttribute(el: HTMLElement, k: string, v: any) {
  if (v == null) return;

  // 1. Style Handling
  if (k === "style") {
    if (typeof v === "object" && v !== null) {
      const className = css(v as CSSObject);
      el.classList.add(className);
    } else if (typeof v === "string") {
      el.setAttribute("style", v);
    }
  }
  // 2. Class Handling
  // We set className directly to ensure updates from signals overwrite old values correctly
  else if (k === "class" || k === "className") {
    if (typeof v === "string") {
      el.className = v;
    } else if (Array.isArray(v)) {
      el.className = v.filter(Boolean).join(" ");
    }
  }
  // 3. htmlFor
  else if (k === "htmlFor") {
    el.setAttribute("for", String(v));
  }
  // 4. Standard Attributes
  else {
    try {
      if (k in el) {
        (el as any)[k] = v;
      } else {
        el.setAttribute(k, String(v));
      }
    } catch {
      el.setAttribute(k, String(v));
    }
  }
}

function setProps(el: HTMLElement, props: any) {
  if (!props) return;

  for (const [k, v] of Object.entries(props)) {
    // --- 1. CHILDREN ---
    if (k === "children") {
      const children = Array.isArray(v) ? v : [v];
      children.forEach((child) => {
        if (child == null || typeof child === "boolean") return;

        if (isSignal(child)) {
          // REACTIVE CHILD: Create a TextNode that updates automatically
          const textNode = document.createTextNode("");
          useEffect(() => {
            const val = child();
            textNode.data = val != null ? String(val) : "";
          });
          el.appendChild(textNode);
        } else if (typeof child === "string" || typeof child === "number") {
          // STATIC CHILD
          el.appendChild(document.createTextNode(String(child)));
        } else if (child instanceof Node) {
          // NODE CHILD
          el.appendChild(child);
        }
      });
    }
    // --- 2. EVENTS (e.g. onClick) ---
    else if (k.startsWith("on") && typeof v === "function") {
      const eventName = k.slice(2).toLowerCase();
      //@ts-ignore
      el.addEventListener(eventName, v);
    }
    // --- 3. REACTIVE ATTRIBUTES (Signals) ---
    else if (isSignal(v)) {
      useEffect(() => {
        applyAttribute(el, k, v());
      });
    }
    // --- 4. STATIC ATTRIBUTES ---
    else {
      applyAttribute(el, k, v);
    }
  }
}

export function jsx(type: any, props: any, key?: string) {
  // Handle fragments
  if (type === Fragment) {
    return Fragment(props || {});
  }

  // Intrinsic HTML elements
  if (typeof type === "string") {
    const factory = (h as any)[capitalize(type)];
    let el: HTMLElement;

    if (!factory) {
      // If no factory exists for this tag, create a standard DOM element
      el = document.createElement(type);
    } else {
      // Use the custom factory from html-elements.ts
      el = factory();
    }

    setProps(el, props);
    return el;
  }

  // Components (functions)
  if (typeof type === "function") {
    return type(props || {});
  }

  throw new Error(`Invalid JSX element type: ${typeof type}`);
}

export const jsxs = jsx;

export function Fragment(props: { children?: any }) {
  const frag = document.createDocumentFragment();
  if (props.children) {
    const children = Array.isArray(props.children)
      ? props.children
      : [props.children];
    children.forEach((child) => {
      if (child == null || typeof child === "boolean") return;

      if (isSignal(child)) {
        // Reactive Fragment Child
        const textNode = document.createTextNode("");
        useEffect(() => {
          const val = child();
          textNode.data = val != null ? String(val) : "";
        });
        frag.appendChild(textNode);
      } else if (typeof child === "string" || typeof child === "number") {
        frag.appendChild(document.createTextNode(String(child)));
      } else if (child instanceof Node) {
        frag.appendChild(child);
      }
    });
  }
  return frag;
}

function capitalize(tag: string): string {
  return tag.charAt(0).toUpperCase() + tag.slice(1);
}
