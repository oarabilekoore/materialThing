// Enhanced Button Component Following Material Design 3 Guidelines
// Implements shape morph properties and interaction states

import h from "../core/html-elements.ts";
import css from "../core/css-manager.ts";

type materialThingElement = { parent?: any; text?: string };

interface ButtonProperties extends materialThingElement {
  variant?: "filled" | "tonal" | "text" | "elevated" | "outlined";
  size?: "xsm" | "sm" | "md" | "lg" | "xl";
  shape?: "round" | "square";
  icon?: string; // svg string or text label
  classList?: string[];
  disabled?: boolean;
}

const STATE_LAYER_OPACITY = {
  hover: 0.08,
  focus: 0.12,
  pressed: 0.12,
  dragged: 0.16,
};

const xsm = css({
  padding: "12px",
  height: "32px",
  fontSize: "12px",
  gap: "8px",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  lineHeight: "1",
  minWidth: "64px",
});

const sm = css({
  padding: "16px",
  height: "40px",
  fontSize: "14px",
  gap: "10px",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  lineHeight: "1",
  minWidth: "64px",
});

const md = css({
  padding: "20px",
  height: "48px",
  fontSize: "16px",
  gap: "12px",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  lineHeight: "1",
  minWidth: "64px",
});

const lg = css({
  padding: "24px",
  height: "56px",
  fontSize: "18px",
  gap: "14px",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  lineHeight: "1",
  minWidth: "64px",
});

const xl = css({
  padding: "32px",
  height: "72px",
  fontSize: "20px",
  gap: "16px",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  lineHeight: "1",
  minWidth: "64px",
});

const interactiveBase = css({
  position: "relative",
  overflow: "hidden",
  transition: "all 280ms cubic-bezier(0.4, 0.0, 0.2, 1)",
  transformOrigin: "center",
  // State layer for interactions
  "&::before": {
    content: "''",
    position: "absolute",
    top: "0",
    left: "0",
    right: "0",
    bottom: "0",
    backgroundColor: "currentColor",
    opacity: "0",
    transition: "opacity 200ms cubic-bezier(0.4, 0.0, 0.2, 1)",
    pointerEvents: "none",
    zIndex: "1",
  },
  // Hover state
  "&:hover:not(:disabled)::before": {
    opacity: String(STATE_LAYER_OPACITY.hover),
  },
  // Focus state
  "&:focus-visible:not(:disabled)::before": {
    opacity: String(STATE_LAYER_OPACITY.focus),
  },
  // Active/pressed state
  "&:active:not(:disabled)::before": {
    opacity: String(STATE_LAYER_OPACITY.pressed),
  },
  // Shape morph on hover (subtle expansion)
  "&:hover:not(:disabled)": {
    transform: "scale(1.02)",
    boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
  },
  // Shape morph on focus (more pronounced for accessibility)
  "&:focus-visible:not(:disabled)": {
    transform: "scale(1.02)",
    outline: "2px solid var(--md-sys-color-primary)",
    outlineOffset: "2px",
  },
  // Shape morph on active/press (slight compression)
  "&:active:not(:disabled)": {
    transform: "scale(0.98)",
    transition: "all 120ms cubic-bezier(0.4, 0.0, 1, 1)",
  },
});

// Text button specific states with enhanced shape morphing
const textButtonStates = css({
  // Enhanced hover effect for text buttons
  "&:hover:not(:disabled)": {
    backgroundColor: `rgba(var(--md-sys-color-primary-rgb, 104, 84, 142), ${STATE_LAYER_OPACITY.hover})`,
    borderRadius: "8px", // Shape morph to more rounded on hover
    transform: "scale(1.04)", // Slightly more pronounced for text buttons
  },
  // Focus state for text buttons
  "&:focus-visible:not(:disabled)": {
    backgroundColor: `rgba(var(--md-sys-color-primary-rgb, 104, 84, 142), ${STATE_LAYER_OPACITY.focus})`,
    borderRadius: "12px", // More rounded on focus
    transform: "scale(1.04)",
  },
  // Active state for text buttons - no scale on smaller sizes
  "&:active:not(:disabled)": {
    backgroundColor: `rgba(var(--md-sys-color-primary-rgb, 104, 84, 142), ${STATE_LAYER_OPACITY.pressed})`,
    borderRadius: "6px", // Less rounded on press
  },
});

// Elevated button enhanced shadow states
const elevatedStates = css({
  transition: "box-shadow 280ms cubic-bezier(0.4, 0.0, 0.2, 1), transform 280ms cubic-bezier(0.4, 0.0, 0.2, 1)",
  "&:hover:not(:disabled)": {
    boxShadow: "0 4px 12px rgba(0,0,0,0.15), 0 2px 4px rgba(0,0,0,0.12)",
    transform: "translateY(-1px) scale(1.02)",
  },
  "&:focus-visible:not(:disabled)": {
    boxShadow: "0 4px 12px rgba(0,0,0,0.15), 0 2px 4px rgba(0,0,0,0.12)",
    transform: "translateY(-1px) scale(1.02)",
  },
  "&:active:not(:disabled)": {
    boxShadow: "0 2px 4px rgba(0,0,0,0.12)",
    transform: "translateY(0px)",
  },
});

// Filled button states
const filledStates = css({
  "&:hover:not(:disabled)": {
    boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
    transform: "scale(1.02)",
  },
  "&:focus-visible:not(:disabled)": {
    boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
    transform: "scale(1.02)",
  },
  "&:active:not(:disabled)": {
    boxShadow: "0 1px 4px rgba(0,0,0,0.12)",
  },
});

// Outlined button states
const outlinedStates = css({
  "&:hover:not(:disabled)": {
    backgroundColor: `rgba(var(--md-sys-color-primary-rgb, 104, 84, 142), ${STATE_LAYER_OPACITY.hover})`,
    borderColor: "var(--md-sys-color-primary)",
    transform: "scale(1.02)",
  },
  "&:focus-visible:not(:disabled)": {
    backgroundColor: `rgba(var(--md-sys-color-primary-rgb, 104, 84, 142), ${STATE_LAYER_OPACITY.focus})`,
    borderColor: "var(--md-sys-color-primary)",
    transform: "scale(1.02)",
  },
  "&:active:not(:disabled)": {
    backgroundColor: `rgba(var(--md-sys-color-primary-rgb, 104, 84, 142), ${STATE_LAYER_OPACITY.pressed})`,
  },
});

// Ripple effect animation
const rippleEffect = css({
  position: "relative",
  overflow: "hidden",
  "&::after": {
    content: "''",
    position: "absolute",
    top: "50%",
    left: "50%",
    width: "0",
    height: "0",
    borderRadius: "50%",
    backgroundColor: "currentColor",
    opacity: "0.3",
    transform: "translate(-50%, -50%)",
    transition: "width 600ms cubic-bezier(0.4, 0.0, 0.2, 1), height 600ms cubic-bezier(0.4, 0.0, 0.2, 1), opacity 600ms cubic-bezier(0.4, 0.0, 0.2, 1)",
    pointerEvents: "none",
    zIndex: "0",
  },
});

// XL size specific states with press animation
const xlSizeStates = css({
  "&:active:not(:disabled)": {
    transform: "scale(0.98)",
    transition: "all 120ms cubic-bezier(0.4, 0.0, 1, 1)",
  },
});

const outlinedStyle = css({
  backgroundColor: "transparent",

  border: "1px solid var(--md-sys-color-outline, rgba(0,0,0,0.12))",
  boxSizing: "border-box", // Ensure border is included in dimensions
});

const elevatedShadow = css({
  boxShadow: "0px 1px 2px rgba(0,0,0,0.3), 0px 1px 3px 1px rgba(0,0,0,0.15)",
});

const disabledClass = css({
  opacity: "0.38",
  pointerEvents: "none",
  transform: "none !important",
  boxShadow: "none !important",
});

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------
export default function Button(props: ButtonProperties) {
  const {
    parent,
    text,
    variant = "tonal",
    size = "sm",
    shape = "round",
    icon,
    classList,
    disabled = false,
  } = props;

  const button = h.Button(parent, text ?? "") as HTMLButtonElement;

  if (classList && classList.length) button.classList.add(...classList);

  // Variant-specific colors & typography
  let background = "transparent";
  let color = "var(--md-sys-color-primary, #000)";
  let fontWeight: string | number = 500;
  const extras: string[] = [];
  const stateExtras: string[] = [];

  // Apply size classes
  switch (size) {
    case "xsm":
      button.classList.add(xsm);
      break;
    case "sm":
      button.classList.add(sm);
      break;
    case "md":
      button.classList.add(md);
      break;
    case "lg":
      button.classList.add(lg);
      break;
    case "xl":
      button.classList.add(xl);
      // Only XL buttons get the press scale animation
      extras.push(xlSizeStates);
      break;
    default:
      button.classList.add(sm);
  }

  switch (variant) {
    case "filled":
      background = "var(--md-sys-color-primary)";
      color = "var(--md-sys-color-on-primary)";
      fontWeight = 600;
      stateExtras.push(filledStates);
      break;
    case "tonal":
      background = "var(--md-sys-color-secondary-container)";
      color = "var(--md-sys-color-on-secondary-container)";
      fontWeight = 600;
      stateExtras.push(filledStates);
      break;
    case "text":
      background = "transparent";
      color = "var(--md-sys-color-primary)";
      fontWeight = 500;
      stateExtras.push(textButtonStates);
      break;
    case "elevated":
      background = "var(--md-sys-color-surface-container-low)";
      color = "var(--md-sys-color-primary)";
      fontWeight = 500;
      extras.push(elevatedShadow);
      stateExtras.push(elevatedStates);
      break;
    case "outlined":
      background = "transparent";
      color = "var(--md-sys-color-primary)";
      fontWeight = 500;
      extras.push(outlinedStyle);
      stateExtras.push(outlinedStates);
      break;
  }

  // Shape morphing radius calculation
  let radius = "8px";
  if (shape === "round") {
    radius = "9999px";
  } else {
    // Square has variant radii depending on size
    switch (size) {
      case "xsm":
      case "sm":
        radius = "8px";
        break;
      case "md":
        radius = "12px";
        break;
      case "lg":
      case "xl":
        radius = "16px";
        break;
    }
  }

  // Base styles
  const base = css({
    backgroundColor: background,
    color: color,
    borderRadius: radius,
    cursor: disabled ? "default" : "pointer",
    userSelect: "none",
    textDecoration: "none",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    fontFamily: "inherit",
    fontWeight: String(fontWeight),
    WebkitTapHighlightColor: "transparent", // Remove mobile tap highlight
  });

  if (variant != "outlined") button.classList.add(css({
    border: "none"
  }))

  button.classList.add(base, interactiveBase, rippleEffect, ...extras, ...stateExtras);

  // Disabled handling
  if (disabled) {
    button.classList.add(disabledClass);
    button.setAttribute("aria-disabled", "true");
    button.disabled = true;
  } else {
    button.removeAttribute("aria-disabled");
    button.disabled = false;
  }

  // Accessibility defaults
  if (!button.getAttribute("type")) button.setAttribute("type", "button");
  if (!button.hasAttribute("role")) button.setAttribute("role", "button");

  // Enhanced ripple effect on click
  button.addEventListener("click", (e) => {
    if (disabled) return;

    // Create ripple effect
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;

    const ripple = document.createElement("span");
    ripple.style.cssText = `
      position: absolute;
      width: ${size}px;
      height: ${size}px;
      left: ${x}px;
      top: ${y}px;
      background: currentColor;
      border-radius: 50%;
      opacity: 0.3;
      transform: scale(0);
      animation: ripple-animation 600ms cubic-bezier(0.4, 0.0, 0.2, 1);
      pointer-events: none;
      z-index: 0;
    `;

    // Add ripple animation keyframes if not already added
    if (!document.querySelector("#ripple-keyframes")) {
      const style = document.createElement("style");
      style.id = "ripple-keyframes";
      style.textContent = `
        @keyframes ripple-animation {
          to {
            transform: scale(2);
            opacity: 0;
          }
        }
      `;
      document.head.appendChild(style);
    }

    button.appendChild(ripple);

    // Remove ripple after animation
    setTimeout(() => {
      if (ripple.parentNode) {
        ripple.parentNode.removeChild(ripple);
      }
    }, 600);
  });

  // Icon handling
  if (icon) {
    const iconWrapper = document.createElement("span");
    iconWrapper.className = css({
      display: "inline-flex",
      width: "20px",
      height: "20px",
      alignItems: "center",
      justifyContent: "center",
      lineHeight: "0",
      flexShrink: "0",
      position: "relative",
      zIndex: "2", // Above ripple effect
    });

    if (typeof icon === "string" && icon.trim().startsWith("<svg")) {
      iconWrapper.innerHTML = icon;
    } else {
      iconWrapper.textContent = icon;
    }

    // Insert icon before text
    if (button.firstChild) {
      button.insertBefore(iconWrapper, button.firstChild);
    } else {
      button.appendChild(iconWrapper);
    }
  }

  // Ensure text content is above ripple
  if (button.firstChild && button.firstChild.nodeType === Node.TEXT_NODE) {
    const textWrapper = document.createElement("span");
    textWrapper.style.cssText = "position: relative; z-index: 2;";
    textWrapper.textContent = button.firstChild.textContent || "";
    button.replaceChild(textWrapper, button.firstChild);
  }

  return button;
}
