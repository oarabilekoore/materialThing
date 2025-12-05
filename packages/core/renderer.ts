// packages/core/renderer.ts
import { Accessor, useEffect } from "./state-manager";
import { css } from "./css-manager";

// --- Types ---
type VNode = {
  $$typeof: symbol;
  type: string | Function;
  props: Record<string, any>;
  key: any;
  ref: any;
};

type Portal = {
  $$typeof: symbol;
  key: any;
  children: any;
  containerInfo: Element | DocumentFragment;
  implementation: null;
};

const REACT_ELEMENT_TYPE = Symbol.for("react.element");
const REACT_PORTAL_TYPE = Symbol.for("react.portal");

// Helper to detect signals
function isSignal(val: any): val is Accessor<any> {
  return typeof val === "function";
}

// Helper to detect portals
function isPortal(val: any): val is Portal {
  return (
    typeof val === "object" &&
    val !== null &&
    val.$$typeof === REACT_PORTAL_TYPE
  );
}

// --- Main Render API ---
export function render(vnode: any, container: HTMLElement) {
  const dom = mount(vnode);
  if (dom) {
    container.innerHTML = "";
    container.appendChild(dom);
  }
}

// --- Recursive Mount Function ---
export function mount(vnode: any): Node | null {
  // 1. Handle Primitives
  if (
    vnode === null ||
    vnode === undefined ||
    vnode === false ||
    vnode === true
  ) {
    return null;
  }

  if (typeof vnode === "string" || typeof vnode === "number") {
    return document.createTextNode(String(vnode));
  }

  // 2. Handle Portals
  if (isPortal(vnode)) {
    return mountPortal(vnode);
  }

  // 3. Handle Signals (Dynamic Component & Text Reactivity)
  if (isSignal(vnode)) {
    // We start with a placeholder. A comment is safer for layout than empty text.
    const placeholder = document.createComment("signal-placeholder");
    let currentDom: Node = placeholder;

    useEffect(() => {
      const val = vnode();
      let newDom: Node | null = null;

      // A. Signal returned a VNode (e.g., Router switching pages)
      if (typeof val === "object" && val !== null && val.$$typeof) {
        newDom = mount(val);
      }
      // B. Signal returned a Portal
      else if (isPortal(val)) {
        newDom = mountPortal(val);
      }
      // C. Signal returned a primitive (e.g., Text binding)
      else if (typeof val === "string" || typeof val === "number") {
        newDom = document.createTextNode(String(val));
      }

      // Fallback for null/false
      if (!newDom) {
        newDom = document.createComment("empty-signal");
      }

      // Swap in the DOM
      if (currentDom.parentNode) {
        currentDom.parentNode.replaceChild(newDom, currentDom);
        currentDom = newDom;
      } else {
        // Initial sync render (useEffect runs immediately)
        currentDom = newDom;
      }
    });

    return currentDom;
  }

  // 4. Handle Arrays (Fragments)
  if (Array.isArray(vnode)) {
    const frag = document.createDocumentFragment();
    vnode.forEach((child) => {
      const dom = mount(child);
      if (dom) frag.appendChild(dom);
    });
    return frag;
  }

  // 5. Handle VNodes
  if (typeof vnode === "object" && vnode.$$typeof) {
    // A. Functional Components
    if (typeof vnode.type === "function") {
      const renderedVNode = vnode.type(vnode.props);
      return mount(renderedVNode);
    }

    // B. Native HTML Elements
    if (typeof vnode.type === "string") {
      const isSvg = [
        "svg",
        "path",
        "circle",
        "polyline",
        "line",
        "rect",
        "g",
        "defs",
        "linearGradient",
        "stop",
      ].includes(vnode.type);

      const el = isSvg
        ? document.createElementNS("http://www.w3.org/2000/svg", vnode.type)
        : document.createElement(vnode.type);

      const props = vnode.props || {};

      Object.keys(props).forEach((key) => {
        if (key === "children" || key === "key") return;

        if (key === "ref") {
          const ref = props[key];
          if (typeof ref === "function") ref(el);
          else if (ref && "current" in ref) ref.current = el;
          return;
        }

        const value = props[key];

        // Event Handlers (never signals)
        if (key.startsWith("on") && typeof value === "function") {
          const eventName = key.toLowerCase().substring(2);
          el.addEventListener(eventName, value);
          return;
        }

        // CSS-in-JS Support
        if (
          key === "style" &&
          typeof value === "object" &&
          value !== null &&
          !isSignal(value)
        ) {
          const generatedClass = css(value);
          el.classList.add(generatedClass);
          return;
        }

        // Attributes (with Signal support)
        if (isSignal(value)) {
          // Create reactive binding for signal attributes
          useEffect(() => {
            applyAttribute(el, key, value());
          });
        } else {
          applyAttribute(el, key, value);
        }
      });

      const children = Array.isArray(props.children)
        ? props.children
        : props.children !== undefined
        ? [props.children]
        : [];

      children.forEach((child: any) => {
        const childDom = mount(child);
        if (childDom) el.appendChild(childDom);
      });

      return el;
    }
  }

  return null;
}

// --- Portal Mounting ---
function mountPortal(portal: Portal): Node {
  // Create a placeholder comment node to return
  // This represents the portal in the source tree
  const placeholder = document.createComment("portal");

  // Mount the children into the target container
  const children = Array.isArray(portal.children)
    ? portal.children
    : [portal.children];

  children.forEach((child: any) => {
    const childDom = mount(child);
    if (childDom && portal.containerInfo) {
      portal.containerInfo.appendChild(childDom);
    }
  });

  // Return the placeholder for the source location
  return placeholder;
}

function applyAttribute(el: Element, key: string, value: any) {
  if (key === "className" || key === "class") {
    // Replace existing classes (to play nice with style={...})
    el.setAttribute("class", String(value));
    return;
  }

  // Special handling for value attribute on form elements
  if (key === "value") {
    if ("value" in el) {
      (el as any).value = value ?? "";
    }
    el.setAttribute("value", String(value ?? ""));
    return;
  }

  if (value === true) {
    el.setAttribute(key, "");
  } else if (value === false || value === null || value === undefined) {
    el.removeAttribute(key);
  } else {
    el.setAttribute(key, String(value));
  }
}
