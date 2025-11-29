import { jsx } from "./jsx-runtime";

export { jsx, jsxs, Fragment } from "./jsx-runtime";

// jsxDEV is used in development mode
export function jsxDEV(type: any, props: any, key?: string) {
  // In development, we can add additional debugging info if needed
  // For now, just delegate to the regular jsx function
  return jsx(type, props, key);
}
