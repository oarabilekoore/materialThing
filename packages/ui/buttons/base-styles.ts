import { css, keyframes } from "@materialthing/core";

export const rippleAnimation = keyframes({
  to: { transform: "scale(4)", opacity: "0" },
});

export const rippleClass = css({
  position: "absolute",
  borderRadius: "50%",
  transform: "scale(0)",
  opacity: "0.3",
  backgroundColor: "currentColor",
  animation: `${rippleAnimation} 600ms var(--motion-easing-standard, cubic-bezier(0.2, 0, 0, 1))`,
  pointerEvents: "none",
  zIndex: "2",
});

export const iconWrapperClass = css({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "18px", // M3 Standard Icon Size
  width: "18px",
  height: "18px",
  lineHeight: "1",
  flexShrink: "0",
});

export const baseButtonClass = css({
  position: "relative",
  overflow: "hidden",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  border: "none", // Reset border for all variants (outlined handles it separately)
  cursor: "pointer",
  userSelect: "none",
  verticalAlign: "middle",
  lineHeight: "20px", // M3 Label Large line-height
  textDecoration: "none",
  fontFamily: "var(--md-ref-typeface-plain, Roboto, sans-serif)",
  letterSpacing: "0.1px", // M3 Label Large tracking
  transition: `background-color 200ms cubic-bezier(0.2, 0, 0, 1),
              box-shadow 200ms cubic-bezier(0.2, 0, 0, 1),
              border-color 200ms cubic-bezier(0.2, 0, 0, 1),
              color 200ms cubic-bezier(0.2, 0, 0, 1)`,
  "&::before": {
    content: "''",
    position: "absolute",
    inset: "0",
    backgroundColor: "currentColor",
    opacity: "0",
    transition: "opacity 200ms linear",
    pointerEvents: "none",
    zIndex: "1",
  },
  // M3 State Layers
  "&:hover:not(:disabled)::before": { opacity: "0.08" },
  "&:focus-visible:not(:disabled)::before": { opacity: "0.12" },
  "&:active:not(:disabled)::before": { opacity: "0.12" },
});

// M3 Sizing Specifications
// Standard Button Height: 40px (md)
// Padding: 24px (horizontal)
export const sizeStyles = {
  xsm: css({
    height: "24px",
    padding: "0 12px",
    fontSize: "11px", // Label Small
    gap: "6px",
    "& > span": { fontSize: "16px", width: "16px", height: "16px" }, // Adjust icon
  }),
  sm: css({
    height: "32px",
    padding: "0 16px",
    fontSize: "12px",
    gap: "6px",
  }),
  md: css({
    height: "40px", // M3 Standard
    padding: "0 24px",
    fontSize: "14px", // M3 Label Large
    fontWeight: "500", // M3 Medium Weight
    gap: "8px",
  }),
  lg: css({
    height: "48px",
    padding: "0 32px",
    fontSize: "16px",
    gap: "8px",
  }),
  xl: css({
    height: "56px",
    padding: "0 36px",
    fontSize: "18px",
    gap: "12px",
    "& > span": { fontSize: "24px", width: "24px", height: "24px" }, // Larger icon for XL
  }),
};

export const variantStyles = {
  filled: css({
    backgroundColor: "var(--md-sys-color-primary, #6750a4)",
    color: "var(--md-sys-color-on-primary, #ffffff)",
    boxShadow: "var(--md-sys-elevation-level-0, none)",
    "&:hover:not(:disabled)": {
      boxShadow:
        "var(--md-sys-elevation-level-1, 0px 1px 2px rgba(0, 0, 0, 0.3), 0px 1px 3px 1px rgba(0, 0, 0, 0.15))",
    },
  }),
  tonal: css({
    backgroundColor: "var(--md-sys-color-secondary-container, #e8def8)",
    color: "var(--md-sys-color-on-secondary-container, #1d192b)",
    boxShadow: "var(--md-sys-elevation-level-0, none)",
    "&:hover:not(:disabled)": {
      boxShadow:
        "var(--md-sys-elevation-level-1, 0px 1px 2px rgba(0, 0, 0, 0.3), 0px 1px 3px 1px rgba(0, 0, 0, 0.15))",
    },
  }),
  elevated: css({
    backgroundColor: "var(--md-sys-color-surface-container-low, #f7f2fa)",
    color: "var(--md-sys-color-primary, #6750a4)",
    boxShadow:
      "var(--md-sys-elevation-level-1, 0px 1px 2px rgba(0, 0, 0, 0.3), 0px 1px 3px 1px rgba(0, 0, 0, 0.15))",
    "&:hover:not(:disabled)": {
      boxShadow:
        "var(--md-sys-elevation-level-2, 0px 1px 2px rgba(0, 0, 0, 0.3), 0px 2px 6px 2px rgba(0, 0, 0, 0.15))",
    },
    "&:active:not(:disabled)": {
      boxShadow:
        "var(--md-sys-elevation-level-1, 0px 1px 2px rgba(0, 0, 0, 0.3), 0px 1px 3px 1px rgba(0, 0, 0, 0.15))",
    },
  }),
  outlined: css({
    backgroundColor: "transparent",
    color: "var(--md-sys-color-primary, #6750a4)",
    border: "1px solid var(--md-sys-color-outline, #79747e)",
    padding: "0 23px", // -1px for border to maintain visual size (24px total)
    "&:focus-visible:not(:disabled)": {
      borderColor: "var(--md-sys-color-primary, #6750a4)",
    },
    "&:disabled": {
      border: "1px solid var(--md-sys-color-on-surface, #1c1b1f)", // Opacity applied by disabledClass
    },
  }),
  text: css({
    backgroundColor: "transparent",
    color: "var(--md-sys-color-primary, #6750a4)",
    padding: "0 12px", // Text button specific padding (min 12px)
    minWidth: "48px", // Touch target guidelines
  }),
};

export const disabledClass = css({
  backgroundColor: "var(--md-sys-color-on-surface, #1c1b1f) !important",
  color: "var(--md-sys-color-on-surface, #1c1b1f) !important",
  opacity: "0.12",
  pointerEvents: "none",
  boxShadow: "none !important",
  border: "none !important", // Outlined needs explicit border clear or override
  "&.outlined": {
    backgroundColor: "transparent !important",
    border: "1px solid var(--md-sys-color-on-surface, #1c1b1f) !important",
    opacity: "0.12",
  },
});
