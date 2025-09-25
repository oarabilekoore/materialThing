import h from "../core/html-elements";
import css from "../core/css-manager";
import type { CSSObject } from "../core/css-manager";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      [elemName: string]: {
        style?: CSSObject | string;
        className?: string;
        class?: string;
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

function setProps(el: HTMLElement, props: any) {
  if (!props) return;

  for (const [k, v] of Object.entries(props)) {
    if (k === "children") {
      const children = Array.isArray(v) ? v : [v];
      children.forEach((child) => {
        if (child == null || child === false || child === true) return;
        if (typeof child === "string" || typeof child === "number") {
          el.appendChild(document.createTextNode(String(child)));
        } else if (child instanceof Node) {
          el.appendChild(child);
        }
      });
    }
    // Enhanced style handling - supports both objects and strings
    else if (k === "style") {
      if (typeof v === "object" && v !== null) {
        const className = css(v as CSSObject);
        el.classList.add(className);
      } else if (typeof v === "string") {
        el.setAttribute("style", v);
      }
    }
    // `class` or `className` prop
    else if (k === "class" || k === "className") {
      if (typeof v === "string") {
        v.split(/\s+/)
          .filter(Boolean)
          .forEach((cls) => el.classList.add(cls));
      } else if (Array.isArray(v)) {
        v.filter(Boolean).forEach((cls) => el.classList.add(cls));
      }
    } else if (k.startsWith("on") && typeof v === "function") {
      const eventName = k.slice(2).toLowerCase();
      el.addEventListener(eventName, v);
    } else if (k === "htmlFor") {
      el.setAttribute("for", String(v));
    }
    // Fallback → assign property/attribute
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
}

export function jsx(type: any, props: any, key?: string) {
  // Handle fragments
  if (type === Fragment) {
    return Fragment(props || {});
  }

  // Intrinsic HTML elements
  if (typeof type === "string") {
    const factory = (h as any)[capitalize(type)];
    if (!factory) {
      console.warn(`Unknown element type: ${type}, creating generic element`);
      const el = document.createElement(type);
      setProps(el, props);
      return el;
    }

    const el = factory();
    setProps(el, props);
    return el;
  }

  // Components (functions/classes)
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
      if (child == null || child === false || child === true) return;
      if (typeof child === "string" || typeof child === "number") {
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
