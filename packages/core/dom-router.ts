import { createSignal, useEffect, Accessor } from "./state-manager";

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

export function Link(props: {
  to: string;
  state?: any;
  children?: any;
  class?: string;
}) {
  const navigate = useNavigate();

  const onClick = (e: MouseEvent) => {
    e.preventDefault();
    navigate(props.to, props.state);
  };

  const a = document.createElement("a");
  a.setAttribute("href", props.to);
  if (props.class) a.className = props.class;
  a.onclick = onClick as any;

  // Handle simple children
  if (props.children) {
    if (typeof props.children === "string") {
      a.textContent = props.children;
    } else if (Array.isArray(props.children)) {
      props.children.forEach((c) => {
        if (typeof c === "string") a.appendChild(document.createTextNode(c));
        else if (c instanceof Node) a.appendChild(c);
      });
    } else if (props.children instanceof Node) {
      a.appendChild(props.children);
    }
  }

  return a;
}

export function Route(props: {
  path: string;
  component: (props?: any) => HTMLElement;
}) {
  return props;
}

export function Routes(props: { children: any[] }) {
  const routes = Array.isArray(props.children)
    ? props.children
    : [props.children];

  return () => {
    const path = currentPath();

    // Find the matching route using Regex
    let matchParams = {};
    const matchedRoute = routes.find((r) => {
      const match = matchPath(r.path, path);
      if (match) {
        matchParams = match.params;
        return true;
      }
      return false;
    });

    if (matchedRoute && matchedRoute.component) {
      setCurrentParams(matchParams);

      return matchedRoute.component({});
    }

    // 404 Fallback
    const notFound = document.createElement("div");
    notFound.textContent = `404 - No route matches ${path}`;
    return notFound;
  };
}
