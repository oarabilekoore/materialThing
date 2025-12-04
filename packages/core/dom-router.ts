import { createSignal, useEffect, Accessor } from "./state-manager";

const REACT_ELEMENT_TYPE = Symbol.for("react.element");

function createVNode(type: any, props: any, key: any = null) {
  return {
    $$typeof: REACT_ELEMENT_TYPE,
    type,
    key,
    ref: props.ref,
    props,
  };
}

// --- GLOBAL ROUTER STATE ---

const [currentPath, setCurrentPath] = createSignal(window.location.pathname);

const [currentParams, setCurrentParams] = createSignal<Record<string, string>>(
  {}
);

const [currentLocationState, setCurrentLocationState] = createSignal(
  window.history.state
);

window.addEventListener("popstate", () => {
  setCurrentPath(window.location.pathname);
  setCurrentLocationState(window.history.state);
});

function matchPath(routePath: string, actualPath: string) {
  // route path to regex (e.g. /user/:id -> /^\/user\/([^/]+)$/)
  const paramNames: string[] = [];
  const regexPath = routePath.replace(/:([^\/]+)/g, (_, key) => {
    paramNames.push(key);
    return "([^/]+)";
  });

  const regex = new RegExp(`^${regexPath}$`);
  const match = actualPath.match(regex);

  if (!match) return null;

  const params: Record<string, string> = {};
  match.slice(1).forEach((value, index) => {
    params[paramNames[index]] = decodeURIComponent(value);
  });

  return { params };
}

// --- HOOKS ---

export function useParams() {
  return currentParams;
}

export function useLocation() {
  return {
    pathname: currentPath,
    state: currentLocationState,
  };
}

export function useNavigate() {
  return (path: string, state?: any) => {
    window.history.pushState(state || {}, "", path);
    setCurrentPath(path);
    setCurrentLocationState(state || {});
    setCurrentParams({});
  };
}

// --- COMPONENTS ---

export function Link(props: {
  to: string;
  state?: any;
  children?: any;
  class?: string;
  className?: string;
}) {
  const navigate = useNavigate();

  const onClick = (e: MouseEvent) => {
    e.preventDefault();
    navigate(props.to, props.state);
  };

  // Return a VNode instead of a DOM Element
  return createVNode("a", {
    href: props.to,
    className: props.class || props.className,
    onClick: onClick,
    children: props.children,
  });
}

export function Route(props: {
  path: string;
  component: (props?: any) => any; // Component returns VNode now
}) {
  return props; // Route is just a data container, effectively
}

export function BrowserRouter(props: { children: any[] }) {
  // props.children will be an array of VNodes (Route components)
  // We need to look at their props to find the matching path.

  const routes = Array.isArray(props.children)
    ? props.children
    : [props.children];

  // We return a function (Component) that the renderer will execute.
  // This allows the router to reactively update when signals change.
  return () => {
    const path = currentPath();

    // Find the matching route
    let matchParams = {};
    const matchedRouteVNode = routes.find((r) => {
      // In the VNode system, 'r' is an object { type: Route, props: { path, component } }
      // We need to access r.props.path
      const routePath = r.props?.path;
      if (!routePath) return false;

      const match = matchPath(routePath, path);
      if (match) {
        matchParams = match.params;
        return true;
      }
      return false;
    });

    if (matchedRouteVNode && matchedRouteVNode.props.component) {
      setCurrentParams(matchParams);

      // We return a VNode describing it so the renderer can mount it.
      return createVNode(matchedRouteVNode.props.component, {});
    }

    // 404 Fallback
    return createVNode("div", {
      children: `404 - No route matches ${path}`,
    });
  };
}
