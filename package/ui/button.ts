import h from "../core/html-elements.ts";
import css, { keyframes } from "../core/css-manager.ts";
import type { CSSObject } from "../core/css-manager.ts"; // Optional: for type safety in style objects
import type { materialThingElement } from "./+ui-manager.ts";

interface ButtonProperties extends materialThingElement {
  variant?: "filled" | "tonal" | "text" | "elevated" | "outlined";
  size?: "xsm" | "sm" | "md" | "lg" | "xl";
  shape?: "round" | "square";
  morphOnPress?: boolean;
  icon?: string;
  iconPosition?: "left" | "right";
  classList?: string[];
  disabled?: boolean;
}

// ========================================================================
//                         STATIC STYLES (DEFINED ONCE)
// ========================================================================

// Define the ripple animation once using our new keyframes helper.
const rippleAnimation = keyframes({
  to: {
    transform: "scale(4)",
    opacity: "0",
  },
});

// Create a reusable class for the ripple span itself.
const rippleClass = css({
  position: "absolute",
  borderRadius: "50%",
  transform: "scale(0)",
  opacity: "0.3",
  backgroundColor: "currentColor",
  animation: `${rippleAnimation} 600ms var(--motion-easing-standard)`,
  pointerEvents: "none",
  zIndex: 0,
});

// Create a reusable class for the icon wrapper.
const iconWrapperClass = css({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  width: "20px",
  height: "20px",
  lineHeight: "0",
  flexShrink: "0",
  position: "relative",
  zIndex: 2, // Keep icon above the state layer and ripple
});

const sizeStyles = {
  xsm: css({
    padding: "var(--button-padding-xsm)",
    height: "var(--button-height-xsm)",
    fontSize: "var(--button-font-size-xsm)",
    gap: "8px",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    lineHeight: "1",
    minWidth: "64px",
  }),
  sm: css({
    padding: "var(--button-padding-sm)",
    height: "var(--button-height-sm)",
    fontSize: "var(--button-font-size-sm)",
    gap: "10px",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    lineHeight: "1",
    minWidth: "64px",
  }),
  md: css({
    padding: "var(--button-padding-md)",
    height: "var(--button-height-md)",
    fontSize: "var(--button-font-size-md)",
    gap: "12px",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    lineHeight: "1",
    minWidth: "64px",
  }),
  lg: css({
    padding: "var(--button-padding-lg)",
    height: "var(--button-height-lg)",
    fontSize: "var(--button-font-size-lg)",
    gap: "14px",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    lineHeight: "1",
    minWidth: "64px",
  }),
  xl: css({
    padding: "var(--button-padding-xl)",
    height: "var(--button-height-xl)",
    fontSize: "var(--button-font-size-xl)",
    gap: "16px",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    lineHeight: "1",
    minWidth: "64px",
  }),
};

const interactiveBase = css({
  position: "relative",
  overflow: "hidden",
  transformOrigin: "center",
  // Use M3 motion tokens for smooth, spec-compliant transitions
  transition: `transform var(--motion-duration-short) var(--motion-easing-standard),
    box-shadow var(--motion-duration-standard) var(--motion-easing-standard),
    border-radius var(--motion-duration-standard) var(--motion-easing-standard)`,
  "&::before": {
    content: "''",
    position: "absolute",
    inset: "0",
    backgroundColor: "currentColor",
    opacity: "0",
    transition: "opacity 200ms var(--motion-easing-standard)",
    pointerEvents: "none",
    zIndex: 1,
  },
  "&:hover:not(:disabled)::before": { opacity: "var(--state-opacity-hover)" },
  "&:focus-visible:not(:disabled)::before": {
    opacity: "var(--state-opacity-focus)",
  },
  "&:active:not(:disabled)::before": {
    opacity: "var(--state-opacity-pressed)",
  },
});

const variantStates = {
  filled: css({
    backgroundColor: "var(--md-sys-color-primary)",
    color: "var(--md-sys-color-on-primary)",
    fontWeight: "var(--button-text-weight-lg)",
    "&:hover:not(:disabled), &:focus-visible:not(:disabled)": {
      boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
      transform: "scale(1.02)",
    },
    "&:active:not(:disabled)": { boxShadow: "0 1px 4px rgba(0,0,0,0.12)" },
  }),
  tonal: css({
    backgroundColor: "var(--md-sys-color-secondary-container)",
    color: "var(--md-sys-color-on-secondary-container)",
    fontWeight: "var(--button-text-weight-lg)",
    "&:hover:not(:disabled), &:focus-visible:not(:disabled)": {
      boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
      transform: "scale(1.02)",
    },
    "&:active:not(:disabled)": { boxShadow: "0 1px 4px rgba(0,0,0,0.12)" },
  }),
  text: css({
    backgroundColor: "transparent",
    color: "var(--md-sys-color-primary)",
    fontWeight: "var(--button-text-weight-md)",
    "&:hover:not(:disabled)": {
      backgroundColor: `rgba(var(--md-sys-color-primary-rgb), var(--state-opacity-hover))`,
      borderRadius: "8px",
      transform: "scale(1.04)",
    },
    "&:focus-visible:not(:disabled)": {
      backgroundColor: `rgba(var(--md-sys-color-primary-rgb), var(--state-opacity-focus))`,
      borderRadius: "12px",
      transform: "scale(1.04)",
    },
    "&:active:not(:disabled)": {
      backgroundColor: `rgba(var(--md-sys-color-primary-rgb), var(--state-opacity-pressed))`,
      borderRadius: "6px",
    },
  }),
  elevated: css({
    backgroundColor: "var(--md-sys-color-surface-container-low)",
    color: "var(--md-sys-color-primary)",
    fontWeight: "var(--button-text-weight-md)",
    boxShadow: "0px 1px 2px rgba(0,0,0,0.3), 0px 1px 3px 1px rgba(0,0,0,0.15)",
    "&:hover:not(:disabled), &:focus-visible:not(:disabled)": {
      boxShadow: "0 4px 12px rgba(0,0,0,0.15), 0 2px 4px rgba(0,0,0,0.12)",
      transform: "translateY(-1px) scale(1.02)",
    },
    "&:active:not(:disabled)": {
      boxShadow: "0 2px 4px rgba(0,0,0,0.12)",
      transform: "translateY(0px)",
    },
  }),
  outlined: css({
    backgroundColor: "transparent",
    color: "var(--md-sys-color-primary)",
    fontWeight: "var(--button-text-weight-md)",
    border: "1px solid var(--md-sys-color-outline)",
    "&:hover:not(:disabled), &:focus-visible:not(:disabled)": {
      backgroundColor: `rgba(var(--md-sys-color-primary-rgb), var(--state-opacity-hover))`,
      borderColor: "var(--md-sys-color-primary)",
      transform: "scale(1.02)",
    },
    "&:active:not(:disabled)": {
      backgroundColor: `rgba(var(--md-sys-color-primary-rgb), var(--state-opacity-pressed))`,
    },
  }),
};

const disabledClass = css({
  opacity: "0.38",
  pointerEvents: "none",
  transform: "none !important",
  boxShadow: "none !important",
});

// ========================================================================
//                         COMPONENT LOGIC
// ========================================================================

export default function Button(props: ButtonProperties) {
  const {
    parent,
    text,
    variant = "tonal",
    size = "sm",
    shape = "round",
    morphOnPress = true,
    icon,
    iconPosition = "left",
    classList,
    disabled = false,
  } = props;

  const button = h.Button(parent, text ?? "") as HTMLButtonElement;
  if (classList?.length) button.classList.add(...classList);

  button.classList.add(
    sizeStyles[size],
    interactiveBase,
    variantStates[variant],
  );

  const baseRadius =
    shape === "round" ? "9999px" : `var(--button-radius-${size})`;
  const morphRadius =
    shape === "round" ? `var(--button-radius-${size})` : "9999px";
  button.style.borderRadius = baseRadius;

  if (disabled) {
    button.classList.add(disabledClass);
    button.disabled = true;
  }
}
