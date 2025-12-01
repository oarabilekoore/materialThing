// packages/ui/button.ts
import h from "../../core/html-elements";
import { useEffect } from "../../core/state-manager"; // Required for reactivity
import {
  rippleClass,
  variantStyles,
  baseButtonClass,
  disabledClass,
  iconWrapperClass,
  sizeStyles,
} from "./base-styles";

export interface ButtonProperties
  extends Partial<Omit<HTMLButtonElement, "style" | "className">> {
  children?: any;
  variant?: "filled" | "tonal" | "text" | "elevated" | "outlined";
  size?: "xsm" | "sm" | "md" | "lg" | "xl";
  shape?: "pill" | "square";
  icon?: string;
  iconPosition?: "left" | "right";
  className?: string[] | string;
  style?: string | Record<string, string | number>;
  disabled?: boolean;
  onClick?: (e: MouseEvent) => void;
}

function createRipple(event: MouseEvent, button: HTMLButtonElement) {
  const ripple = document.createElement("span");
  const rect = button.getBoundingClientRect();
  const size = Math.max(rect.width, rect.height);
  ripple.style.width = ripple.style.height = `${size}px`;
  ripple.style.left = `${event.clientX - rect.left - size / 2}px`;
  ripple.style.top = `${event.clientY - rect.top - size / 2}px`;
  ripple.classList.add(rippleClass);
  button.appendChild(ripple);
  ripple.addEventListener("animationend", () => ripple.remove());
}

function Button(props: ButtonProperties): HTMLButtonElement {
  const {
    variant = "filled",
    size = "md",
    shape = "pill",
    icon,
    iconPosition = "left",
    disabled = false,
    children,
    className,
    style,
    onClick,
    ...rest
  } = props;

  // 1. USE h.Button() as requested
  // We pass empty string for text to ensure it just creates the element
  const button = (h as any).Button() as HTMLButtonElement;

  // 2. Apply Base Styles (Your Logic)
  button.classList.add(
    baseButtonClass,
    sizeStyles[size],
    variantStyles[variant]
  );

  if (className) {
    if (Array.isArray(className)) {
      button.classList.add(...className);
    } else {
      button.classList.add(className);
    }
  }

  if (shape === "pill") {
    button.style.borderRadius = "9999px";
  } else if (shape === "square") {
    button.style.borderRadius = "4px";
  }

  // 3. Handle Content (Updated for Signals)
  const contentFragment = document.createDocumentFragment();

  const createIcon = () => {
    const iconEl = document.createElement("span");
    iconEl.textContent = icon || "";
    iconEl.classList.add(iconWrapperClass, "material-symbols-outlined");
    return iconEl;
  };

  const appendItem = (child: any) => {
    if (child == null || child === false || child === true) return;

    // --- FIX: DETECT SIGNAL & SUBSCRIBE ---
    if (typeof child === "function") {
      const textNode = document.createTextNode("");
      useEffect(() => {
        const val = child();
        textNode.textContent = val != null ? String(val) : "";
      });
      contentFragment.appendChild(textNode);
    }
    // --- END FIX ---
    else if (child instanceof Node) {
      contentFragment.appendChild(child);
    } else {
      contentFragment.appendChild(document.createTextNode(String(child)));
    }
  };

  const appendChildren = () => {
    if (!children) return;
    if (Array.isArray(children)) {
      children.forEach(appendItem);
    } else {
      appendItem(children);
    }
  };

  if (icon) {
    const iconEl = createIcon();
    if (!children) {
      button.style.padding = "0";
      const heightVal = sizeStyles[size]?.height || "40px";
      button.style.width = heightVal;
      button.style.height = heightVal;
      contentFragment.appendChild(iconEl);
    } else {
      if (iconPosition === "left") {
        contentFragment.appendChild(iconEl);
        appendChildren();
      } else {
        appendChildren();
        contentFragment.appendChild(iconEl);
      }
    }
  } else {
    appendChildren();
  }

  button.appendChild(contentFragment);

  if (disabled) {
    button.disabled = true;
    button.classList.add(disabledClass);
    if (variant === "outlined") button.classList.add("outlined");
  } else {
    button.addEventListener("mousedown", (e) => createRipple(e, button));
    if (onClick) {
      button.addEventListener("click", onClick);
    }
  }

  Object.entries(rest).forEach(([key, value]) => {
    (button as any)[key] = value;
  });

  return button;
}

const Filled = (props: ButtonProperties) =>
  Button({ ...props, variant: "filled" });
const Tonal = (props: ButtonProperties) =>
  Button({ ...props, variant: "tonal" });
const Text = (props: ButtonProperties) => Button({ ...props, variant: "text" });
const Elevated = (props: ButtonProperties) =>
  Button({ ...props, variant: "elevated" });
const Outlined = (props: ButtonProperties) =>
  Button({ ...props, variant: "outlined" });

Button.Filled = Filled;
Button.Tonal = Tonal;
Button.Text = Text;
Button.Elevated = Elevated;
Button.Outlined = Outlined;

export { Button };
