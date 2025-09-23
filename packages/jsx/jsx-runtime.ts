import h from "../core/html-elements.ts";
import css, { CSSObject } from "../core/css-manager.ts";

function setProps(el: HTMLElement, props: any) {
  if (!props) return;

  for (const [k, v] of Object.entries(props)) {
    if (k === "children") {
      (Array.isArray(v) ? v : [v]).forEach((child) => {
        if (child == null) return;
        if (typeof child === "string" || typeof child === "number") {
          el.appendChild(document.createTextNode(String(child)));
        } else {
          el.appendChild(child);
        }
      });
    }

    // Hook into css manager
    else if (k === "style" && typeof v === "object" && v !== null) {
      const className = css(v as CSSObject);
      el.classList.add(className);
    }

    // `class` prop
    else if (k === "class") {
      el.classList.add(...(Array.isArray(v) ? v : [v]));
    }

    // Handle event listeners like `onClick`
    else if (k.startsWith("on") && typeof v === "function") {
      el.addEventListener(k.slice(2).toLowerCase(), v);
    }

    // Fallback → assign property/attribute
    else {
      try {
        (el as any)[k] = v;
      } catch {
        el.setAttribute(k, String(v));
      }
    }
  }
}

export function jsx(type: any, props: any, key?: string) {
  // Intrinsic HTML elements
  if (typeof type === "string") {
    const factory = (h as any)[capitalize(type)];
    if (!factory) {
      throw new Error(`Unknown element type: ${type}`);
    }
    const el = factory();
    setProps(el, props);
    return el;
  }

  // Components (functions/classes)
  return type(props);
}

export const jsxs = jsx;

export const Fragment = (props: { children: any[] }) => {
  const frag = document.createDocumentFragment();
  props.children.forEach((c) => {
    if (typeof c === "string") frag.appendChild(document.createTextNode(c));
    else if (c) frag.appendChild(c);
  });
  return frag;
};

// helper: turn "div" -> "Div" (so JSX `<div>` matches `h.Div()`)
function capitalize(tag: string) {
  return tag.charAt(0).toUpperCase() + tag.slice(1);
}
