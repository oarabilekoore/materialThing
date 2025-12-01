// packages/ui/button.ts
import h from "../../core/html-elements";
import {
  rippleAnimation,
  rippleClass,
  variantStyles,
  baseButtonClass,
  disabledClass,
  iconWrapperClass,
  sizeStyles,
} from "./base-styles";

export interface ButtonProperties
  extends Partial<Omit<HTMLButtonElement, "style" | "className">> {
  children?: any; // Content of the button
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

// 3. Main Component Implementation
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

  // Use h.Button() from core or fallback
  const button = (h as any).Button
    ? (h as any).Button()
    : document.createElement("button");

  // Apply Base Styles
  button.classList.add(
    baseButtonClass,
    sizeStyles[size],
    variantStyles[variant]
  );

  // Apply className prop
  if (className) {
    if (Array.isArray(className)) {
      button.classList.add(...className);
    } else {
      button.classList.add(className);
    }
  }

  // Handle Shape (M3 Default is Pill/Stadium)
  if (shape === "pill") {
    button.style.borderRadius = "9999px";
  } else if (shape === "square") {
    button.style.borderRadius = "4px"; // Slightly rounded for square in M3
  }

  // Special handling for Outlined + Disabled to ensure border shows
  if (disabled && variant === "outlined") {
    // Logic handled in CSS class merging, but added here for clarity if needed
  }

  // Handle Content
  const contentFragment = document.createDocumentFragment();

  const createIcon = () => {
    const iconEl = document.createElement("span");
    iconEl.textContent = icon || "";
    iconEl.classList.add(iconWrapperClass, "material-symbols-outlined");
    return iconEl;
  };

  const appendChildren = () => {
    if (!children) return;
    if (Array.isArray(children)) {
      children.forEach((child) => {
        if (typeof child === "string")
          contentFragment.appendChild(document.createTextNode(child));
        else if (child instanceof Node) contentFragment.appendChild(child);
      });
    } else if (typeof children === "string") {
      contentFragment.appendChild(document.createTextNode(children));
    } else if (children instanceof Node) {
      contentFragment.appendChild(children);
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
      // Icon + Text
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
    // Explicit override for outlined disabled border style if needed by specific CSS parser
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
