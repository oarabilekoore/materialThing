function parseArguments(args: any[]): {
  parent?: HTMLElement;
  text?: string;
  children?: Array<any>;
} {
  let parent: HTMLElement | undefined;
  let text: string | undefined;
  let children: Array<any> | undefined;

  for (const arg of args) {
    if (arg instanceof HTMLElement) {
      parent = arg;
    } else if (typeof arg === "string") {
      text = arg;
    } else if (Array.isArray(arg)) {
      children = arg;
    }
  }
  return { parent, text, children };
}

/**
 * INTERNAL USE: Returns a function, used in Widgets
 * @param tag
 * @returns
 */
export function genericElement<T extends HTMLElement>(tag: string) {
  return (...args: any[]): T => {
    const { parent, text, children } = parseArguments(args);
    return createElement<T>({ tag, text, children, parent });
  };
}

function createElement<T extends HTMLElement>(data: {
  tag: string;
  parent?: HTMLElement;
  text?: string;
  children?: HTMLElement[];
}): T {
  const { tag, parent, text, children } = data;
  const element = document.createElement(tag) as T;

  if (text) {
    element.textContent = text;
  }

  if (parent) {
    parent.appendChild(element);
  }

  if (children && children.length > 0) {
    appendChildren();
  }

  function appendChildren() {
    if (!children) return;
    for (const child of children) {
      if (child instanceof Node) {
        element.appendChild(child);
      }
    }
  }

  return element;
}
