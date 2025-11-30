// Material Design Implementation
// https://m3.material.io/components/floating-action-button/guidelines

import h from "../core/html-elements";
import { css } from "../core/css-manager";
import type { materialThingElement } from "./+ui-manager.ts";

interface FABButtonProperties extends materialThingElement {
  size?: "default" | "medium" | "large";
  icon: string;
  classList?: string[];
}

export default function FAB(props: FABButtonProperties): HTMLButtonElement {
  const { size = "default", icon, text, parent, classList } = props;
  const fab = h.Button(parent);
  text ? console.warn("Text on FAB does not make sense btw.") : null;

  if (classList && classList.length > 0) fab.classList.add(...classList);

  const baseTheme = css({});
  return fab;
}

interface ExpandingMenuFABProps extends FABButtonProperties {
  list: Record<string, string>;
}
export function ExapndingMenuFAB(props: ExpandingMenuFABProps) {}
