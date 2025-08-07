// Button Component Following Material Design Guide From
// https://m3.material.io/components/buttons/specs

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

// -----------------------------------------------------------------------------
// Size utility classes (M3-ish sizing)
// -----------------------------------------------------------------------------
const xsm = css({
  padding: "12px",
  height: "32px",
  fontSize: "12px",
  gap: "8px",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  lineHeight: "1",
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
});

// -----------------------------------------------------------------------------
// Extra styles
// -----------------------------------------------------------------------------
const outlinedStyle = css({
  backgroundColor: "transparent",
  outline: "1px solid var(--md-sys-color-outline, rgba(0,0,0,0.12))",
});
const elevatedShadow = css({
  boxShadow:
    "0px 1px 2px rgba(0,0,0,0.12), 0px 2px 1px rgba(0,0,0,0.06), 0px 1px 3px rgba(0,0,0,0.08)",
});

// Base interactive transitions used for shape morph and states
const interactiveBase = css({
  transition:
    "background-color 180ms linear, border-radius 180ms ease, box-shadow 180ms cubic-bezier(.2, .8, .2, 1), transform 120ms linear",
});

// Disabled style helper
const disabledClass = css({ opacity: "0.38", pointerEvents: "none" });

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
      break;
    default:
      button.classList.add(sm);
  }

  // variant-specific colors & typographic weight
  let background = "transparent";
  let color = "var(--md-sys-color-primary, #000)";
  let fontWeight: string | number = 500;
  const extras: string[] = [];

  switch (variant) {
    case "filled":
      background = "var(--md-sys-color-primary)";
      color = "var(--md-sys-color-on-primary)";
      fontWeight = 600;
      break;
    case "tonal":
      background = "var(--md-sys-color-secondary-container)";
      color = "var(--md-sys-color-on-secondary-container)";
      fontWeight = 600;
      break;
    case "text":
      background = "transparent";
      color = "var(--md-sys-color-primary)";
      fontWeight = 500;
      break;
    case "elevated":
      background = "var(--md-sys-color-surface-container-low)";
      color = "var(--md-sys-color-primary)";
      fontWeight = 500;
      extras.push(elevatedShadow);
      break;
    case "outlined":
      background = "transparent";
      color = "var(--md-sys-color-primary)";
      fontWeight = 500;
      extras.push(outlinedStyle);
      break;
  }

  let radius = "8px"; // default
  if (shape === "round") {
    radius = "9999px";
  } else {
    // square has variant radii depending on size
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

  // base class including transitions
  const base = css({
    backgroundColor: background,
    color: color,
    borderRadius: radius,
    border: "none",
    cursor: disabled ? "default" : "pointer",
    userSelect: "none",
    textDecoration: "none",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    fontFamily: "inherit",
    fontWeight: String(fontWeight),
  });

  button.classList.add(base, interactiveBase, ...extras);

  // disabled handling
  if (disabled) {
    button.classList.add(disabledClass);
    button.setAttribute("aria-disabled", "true");
    button.disabled = true;
  } else {
    button.removeAttribute("aria-disabled");
    button.disabled = false;
  }


  // accessibility defaults
  if (!button.getAttribute("type")) button.setAttribute("type", "button");
  if (!button.hasAttribute("role")) button.setAttribute("role", "button");

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
    });
    if (typeof icon === "string" && icon.trim().startsWith("<svg")) {
      iconWrapper.innerHTML = icon;
    } else {
      iconWrapper.textContent = icon;
    }

    // ensure the text stays after icon
    if (button.firstChild) {
      button.insertBefore(iconWrapper, button.firstChild);
    } else {
      button.appendChild(iconWrapper);
    }
  }

  return button;
}
