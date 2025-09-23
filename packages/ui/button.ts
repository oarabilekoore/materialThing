// packages/ui/button.ts
import h from "../core/html-elements";
import css, { keyframes } from "../core/css-manager";
import type { materialThingElement } from "./+ui-manager";

interface ButtonProperties extends materialThingElement {
  variant?: "filled" | "tonal" | "text" | "elevated" | "outlined";
  size?: "xsm" | "sm" | "md" | "lg" | "xl";
  shape?: "pill" | "square";
  icon?: string;
  iconPosition?: "left" | "right";
  classList?: string[];
  disabled?: boolean;
  onClick?: (event: MouseEvent) => void;
}

const rippleAnimation = keyframes({
  to: {
    transform: "scale(4)",
    opacity: "0",
  },
});

const rippleClass = css({
  position: "absolute",
  borderRadius: "50%",
  transform: "scale(0)",
  opacity: "0.3",
  backgroundColor: "currentColor",
  animation: `${rippleAnimation} 600ms var(--motion-easing-standard, ease-out)`,
  pointerEvents: "none",
  zIndex: "2",
});

const iconWrapperClass = css({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "1.25em",
  width: "1em",
  height: "1em",
  lineHeight: "1",
  flexShrink: "0",
});

const baseButtonClass = css({
  position: "relative",
  overflow: "hidden",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  border: "none",
  cursor: "pointer",
  userSelect: "none",
  verticalAlign: "middle",
  lineHeight: "1",
  textDecoration: "none",
  fontFamily: "inherit",
  transition: `background-color 150ms var(--motion-easing-standard, ease-out),
               box-shadow 200ms var(--motion-easing-standard, ease-out),
               border-radius 150ms var(--motion-easing-standard, ease-out)`,

  "&::before": {
    content: "''",
    position: "absolute",
    inset: "0",
    backgroundColor: "currentColor",
    opacity: "0",
    transition: "opacity 150ms var(--motion-easing-standard, ease-out)",
    pointerEvents: "none",
    zIndex: "1",
  },

  "&:hover:not(:disabled)::before": {
    opacity: "var(--state-opacity-hover, 0.08)",
  },
  "&:focus-visible:not(:disabled)::before": {
    opacity: "var(--state-opacity-focus, 0.12)",
  },
  "&:active:not(:disabled)::before": {
    opacity: "var(--state-opacity-pressed, 0.12)",
  },
});

const sizeStyles = {
  xsm: css({
    height: "var(--button-height-xsm, 32px)",
    padding: "0 var(--button-padding-xsm, 12px)",
    fontSize: "var(--button-font-size-xsm, 12px)",
    borderRadius: "var(--button-radius-xsm, 8px)",
    gap: "6px",
  }),
  sm: css({
    height: "var(--button-height-sm, 40px)",
    padding: "0 var(--button-padding-sm, 16px)",
    fontSize: "var(--button-font-size-sm, 14px)",
    borderRadius: "var(--button-radius-sm, 8px)",
    gap: "8px",
  }),
  md: css({
    height: "var(--button-height-md, 48px)",
    padding: "0 var(--button-padding-md, 20px)",
    fontSize: "var(--button-font-size-md, 16px)",
    borderRadius: "var(--button-radius-md, 12px)",
    gap: "8px",
  }),
  lg: css({
    height: "var(--button-height-lg, 56px)",
    padding: "0 var(--button-padding-lg, 24px)",
    fontSize: "var(--button-font-size-lg, 18px)",
    borderRadius: "var(--button-radius-lg, 16px)",
    gap: "10px",
  }),
  xl: css({
    height: "var(--button-height-xl, 72px)",
    padding: "0 var(--button-padding-xl, 32px)",
    fontSize: "var(--button-font-size-xl, 20px)",
    borderRadius: "var(--button-radius-xl, 16px)",
    gap: "12px",
  }),
};

const variantStyles = {
  filled: css({
    backgroundColor: "var(--md-sys-color-primary, #6750a4)",
    color: "var(--md-sys-color-on-primary, #ffffff)",
    fontWeight: "var(--button-text-weight-lg, 600)",
    "&:hover:not(:disabled)": {
      boxShadow: "var(--md-sys-elevation-level-1, 0 1px 3px rgba(0,0,0,0.12))",
    },
  }),
  tonal: css({
    backgroundColor: "var(--md-sys-color-secondary-container, #e8def8)",
    color: "var(--md-sys-color-on-secondary-container, #1d192b)",
    fontWeight: "var(--button-text-weight-lg, 600)",
    "&:hover:not(:disabled)": {
      boxShadow: "var(--md-sys-elevation-level-1, 0 1px 3px rgba(0,0,0,0.12))",
    },
  }),
  text: css({
    backgroundColor: "transparent",
    color: "var(--md-sys-color-primary, #6750a4)",
    fontWeight: "var(--button-text-weight-md, 500)",
    padding: "0 12px",
  }),
  elevated: css({
    backgroundColor: "var(--md-sys-color-surface-container-low, #f7f2fa)",
    color: "var(--md-sys-color-primary, #6750a4)",
    fontWeight: "var(--button-text-weight-md, 500)",
    boxShadow: "var(--md-sys-elevation-level-1, 0 1px 3px rgba(0,0,0,0.12))",
    "&:hover:not(:disabled)": {
      boxShadow: "var(--md-sys-elevation-level-2, 0 2px 6px rgba(0,0,0,0.15))",
    },
    "&:active:not(:disabled)": {
      boxShadow: "var(--md-sys-elevation-level-1, 0 1px 3px rgba(0,0,0,0.12))",
    },
  }),
  outlined: css({
    backgroundColor: "transparent",
    color: "var(--md-sys-color-primary, #6750a4)",
    fontWeight: "var(--button-text-weight-md, 500)",
    border: "1px solid var(--md-sys-color-outline, #79747e)",
    "&:focus-visible:not(:disabled)": {
      borderColor: "var(--md-sys-color-primary, #6750a4)",
    },
  }),
};

const disabledClass = css({
  backgroundColor: "var(--md-sys-color-on-surface, #1c1b1f)",
  color: "var(--md-sys-color-on-surface, #1c1b1f)",
  opacity: "0.12",
  pointerEvents: "none",
  boxShadow: "none",
  "& *": {
    color: "inherit",
  },
});

// ========================================================================
//                         COMPONENT LOGIC
// ========================================================================

function createRipple(event: MouseEvent, button: HTMLButtonElement) {
  const ripple = document.createElement("span");
  const rect = button.getBoundingClientRect();
  const size = Math.max(rect.width, rect.height);

  ripple.style.width = ripple.style.height = `${size}px`;
  ripple.style.left = `${event.clientX - rect.left - size / 2}px`;
  ripple.style.top = `${event.clientY - rect.top - size / 2}px`;

  ripple.classList.add(rippleClass);
  button.appendChild(ripple);

  ripple.addEventListener("animationend", () => {
    ripple.remove();
  });
}

export default function Button(props: ButtonProperties): HTMLButtonElement {
  const {
    parent,
    text,
    variant = "filled",
    size = "md",
    shape = "pill",
    icon,
    iconPosition = "left",
    classList = [],
    disabled = false,
    onClick,
  } = props;

  const button = h.Button(parent, "") as HTMLButtonElement;

  button.classList.add(
    baseButtonClass,
    sizeStyles[size],
    variantStyles[variant],
    ...classList,
  );

  if (shape === "pill") {
    button.style.borderRadius = "9999px";
  }

  if (icon) {
    const iconEl = h.Span(undefined, icon);
    iconEl.classList.add(iconWrapperClass, "material-symbols-outlined");

    if (!text) {
      button.style.padding = "0";
      const iconOnlySize = `var(--button-height-${size}, 48px)`;
      button.style.width = iconOnlySize;
      button.style.aspectRatio = "1";
    }

    const textEl = text ? h.Span(undefined, text) : null;

    if (iconPosition === "left") {
      button.appendChild(iconEl);
      if (textEl) button.appendChild(textEl);
    } else {
      if (textEl) button.appendChild(textEl);
      button.appendChild(iconEl);
    }
  } else {
    button.textContent = text ?? "";
  }

  if (disabled) {
    button.disabled = true;
    if (variant === "outlined") {
      button.style.borderColor = "var(--md-sys-color-on-surface, #1c1b1f)";
    }
    button.classList.add(disabledClass);
  } else {
    button.addEventListener("mousedown", (e) => createRipple(e, button));
    if (onClick) {
      button.addEventListener("click", onClick);
    }
  }

  return button;
}
