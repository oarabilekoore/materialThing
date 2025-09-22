import h from "../core/html-elements.ts";
import css, { keyframes } from "../core/css-manager.ts";
import type { materialThingElement } from "./+ui-manager.ts";

interface ButtonProperties extends materialThingElement {
  variant?: "filled" | "tonal" | "text" | "elevated" | "outlined";
  size?: "xsm" | "sm" | "md" | "lg" | "xl";
  shape?: "pill" | "square";
  icon?: string;
  iconPosition?: "left" | "right";
  classList?: string[];
  disabled?: boolean;
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
  animation: `${rippleAnimation} 600ms var(--motion-easing-standard)`,
  pointerEvents: "none",
  zIndex: 2,
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
  transition: `background-color 150ms var(--motion-easing-standard),
               box-shadow 200ms var(--motion-easing-standard),
               border-radius 150ms var(--motion-easing-standard)`,
  "&::before": {
    content: "''",
    position: "absolute",
    inset: "0",
    backgroundColor: "currentColor",
    opacity: "0",
    transition: "opacity 150ms var(--motion-easing-standard)",
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

const sizeStyles = {
  xsm: css({
    height: "var(--button-height-xsm)",
    padding: "0 var(--button-padding-xsm)",
    fontSize: "var(--button-font-size-xsm)",
    borderRadius: "var(--button-radius-xsm)",
    gap: "6px",
  }),
  sm: css({
    height: "var(--button-height-sm)",
    padding: "0 var(--button-padding-sm)",
    fontSize: "var(--button-font-size-sm)",
    borderRadius: "var(--button-radius-sm)",
    gap: "8px",
  }),
  md: css({
    height: "var(--button-height-md)",
    padding: "0 var(--button-padding-md)",
    fontSize: "var(--button-font-size-md)",
    borderRadius: "var(--button-radius-md)",
    gap: "8px",
  }),
  lg: css({
    height: "var(--button-height-lg)",
    padding: "0 var(--button-padding-lg)",
    fontSize: "var(--button-font-size-lg)",
    borderRadius: "var(--button-radius-lg)",
    gap: "10px",
  }),
  xl: css({
    height: "var(--button-height-xl)",
    padding: "0 var(--button-padding-xl)",
    fontSize: "var(--button-font-size-xl)",
    borderRadius: "var(--button-radius-xl)",
    gap: "12px",
  }),
};

// UPDATED: Using the provided CSS variables for font weight.
const variantStyles = {
  filled: css({
    backgroundColor: "var(--md-sys-color-primary)",
    color: "var(--md-sys-color-on-primary)",
    fontWeight: "var(--button-text-weight-lg)",
    "&:hover:not(:disabled)": {
      boxShadow: "var(--md-sys-elevation-level-1)",
    },
  }),
  tonal: css({
    backgroundColor: "var(--md-sys-color-secondary-container)",
    color: "var(--md-sys-color-on-secondary-container)",
    fontWeight: "var(--button-text-weight-lg)",
    "&:hover:not(:disabled)": {
      boxShadow: "var(--md-sys-elevation-level-1)",
    },
  }),
  text: css({
    backgroundColor: "transparent",
    color: "var(--md-sys-color-primary)",
    fontWeight: "var(--button-text-weight-md)",
    padding: "0 12px",
  }),
  elevated: css({
    backgroundColor: "var(--md-sys-color-surface-container-low)",
    color: "var(--md-sys-color-primary)",
    fontWeight: "var(--button-text-weight-md)",
    boxShadow: "var(--md-sys-elevation-level-1)",
    "&:hover:not(:disabled)": {
      boxShadow: "var(--md-sys-elevation-level-2)",
    },
    "&:active:not(:disabled)": {
      boxShadow: "var(--md-sys-elevation-level-1)",
    },
  }),
  outlined: css({
    backgroundColor: "transparent",
    color: "var(--md-sys-color-primary)",
    fontWeight: "var(--button-text-weight-md)",
    border: "1px solid var(--md-sys-color-outline)",
    "&:focus-visible:not(:disabled)": {
      borderColor: "var(--md-sys-color-primary)",
    },
  }),
};

const disabledClass = css({
  backgroundColor: "var(--md-sys-color-on-surface)",
  color: "var(--md-sys-color-on-surface)",
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

export default function Button(props: ButtonProperties) {
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
      const iconOnlyPadding = `calc((${sizeStyles[size].height} - 1em) / 2)`;
      button.style.width = `var(--button-height-${size})`; // Make it circular/square
      button.style.padding = iconOnlyPadding;
    }

    const textEl = h.Span(undefined, text ?? "");

    if (iconPosition === "left") {
      button.append(iconEl, textEl);
    } else {
      button.append(textEl, iconEl);
    }
  } else {
    button.textContent = text ?? "";
  }

  if (disabled) {
    button.disabled = true;
    if (variant === "outlined") {
      button.style.borderColor = "var(--md-sys-color-on-surface)";
    }
    button.classList.add(disabledClass);
  } else {
    button.addEventListener("mousedown", (e) => createRipple(e, button));
  }
}
