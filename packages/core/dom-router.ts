interface RouteGuards {}

interface Route {
  title: string;
  path: string;
  component: (params?: any) => HTMLElement | Promise<(params?: any) => HTMLElement>;
}

export class BrowserRouter {
  private parent: HTMLElement;
  private routes: Route[];
  private map: Map<string, Route>;
  private currentLocation: string;
  private loadedComponent: HTMLElement;

  constructor(routes: Route[], parent: HTMLElement) {
    this.parent = parent;
    this.routes = routes;
    this.map = new Map();
    this.currentLocation = window.location.pathname;

    for (const route of this.routes) {
      this.map.set(route.path, route);
    }
  }

  private navigator(path: string, params: object = {}, pushState: boolean = true) {
    if (!this.map.has(path)) {
      console.error(`BrowserRouter Error: ${path} doees not exist`);
      return;
    }
  }
}
