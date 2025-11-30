/** A CSS property value can be a string or a number. */
type CSSPropertyValue = string | number;

/**
 * A CSSObject represents a style block. It can contain:
 * - Standard CSS properties (e.g., `backgroundColor: 'red'`).
 * - Nested pseudo-classes (e.g., `':hover': { color: 'blue' }`).
 * - Nested media queries (e.g., `'@media (min-width: 768px)': { ... }`).
 */
export interface CSSObject {
  [property: string]: CSSPropertyValue | CSSObject;
}

type KeyframeSteps = Record<string, CSSObject>;

const sheet = document.head.appendChild(document.createElement("style")).sheet!;
const cache = new Map<string, string>();

function djb2(str: string): number {
  let hash = 5381;
  for (let i = 0; i < str.length; i++) {
    hash = (hash * 33) ^ str.charCodeAt(i);
  }
  return hash;
}

function camelToKebab(str: string): string {
  return str.replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, "$1-$2").toLowerCase();
}

function parseStyleObject(styleObject: CSSObject): string {
  let cssText = "";
  for (const [key, value] of Object.entries(styleObject)) {
    // Nested objects are handled by the main `css` function, so we only parse primitives here.
    if (typeof value === "string" || typeof value === "number") {
      cssText += `${camelToKebab(key)}:${value};`;
    }
  }
  return cssText;
}

export function keyframes(steps: KeyframeSteps): string {
  const key = JSON.stringify(steps);
  if (cache.has(key)) return cache.get(key)!;

  const name = `gg-anim-${(djb2(key) >>> 0).toString(36)}`;
  const rule = `@keyframes ${name}{${Object.entries(steps)
    .map(([step, styles]) => `${step}{${parseStyleObject(styles)}}`)
    .join("")}}`;

  try {
    sheet.insertRule(rule, sheet.cssRules.length);
    cache.set(key, name);
  } catch (e) {
    console.error("Failed to insert keyframes rule:", e);
  }
  return name;
}

export function css(styleObject: CSSObject): string {
  const key = JSON.stringify(styleObject);
  if (cache.has(key)) return cache.get(key)!;

  const className = `gg-${(djb2(key) >>> 0).toString(36)}`;
  const baseStyles: CSSObject = {};
  const nestedRules: string[] = [];

  for (const [property, value] of Object.entries(styleObject)) {
    // TypeScript's control flow analysis correctly narrows the type of `value` here.
    if (typeof value === "object" && value !== null) {
      const rule = property.startsWith("@")
        ? `${property}{.${className}{${parseStyleObject(value as CSSObject)}}}`
        : `.${className}${property.replace("&", "")}{${parseStyleObject(
            value as CSSObject
          )}}`;
      nestedRules.push(rule);
    } else {
      baseStyles[property] = value;
    }
  }

  try {
    if (Object.keys(baseStyles).length) {
      sheet.insertRule(
        `.${className}{${parseStyleObject(baseStyles)}}`,
        sheet.cssRules.length
      );
    }
    nestedRules.forEach((rule) =>
      sheet.insertRule(rule, sheet.cssRules.length)
    );
    cache.set(key, className);
  } catch (e) {
    console.error("Failed to insert CSS rule:", e);
  }

  return className;
}
