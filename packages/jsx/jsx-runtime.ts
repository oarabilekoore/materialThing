// packages/jsx/jsx-runtime.ts

export type VNode = {
  $$typeof: symbol;
  type: string | Function;
  props: Record<string, any>;
  key: any;
  ref: any;
};

const REACT_ELEMENT_TYPE = Symbol.for("react.element");

export function jsx(type: any, props: any, key: any): VNode {
  const { children, ...rest } = props || {};

  // Normalize children to always be an array for consistency in the VDOM
  const childArray = Array.isArray(children)
    ? children
    : children !== undefined && children !== null
    ? [children]
    : [];

  return {
    $$typeof: REACT_ELEMENT_TYPE,
    type,
    key,
    ref: (rest as any).ref,
    props: {
      ...rest,
      children: childArray.length === 1 ? childArray[0] : childArray,
    },
  };
}

export const jsxs = jsx;

export const Fragment = ({ children }: { children: any }) => children;
