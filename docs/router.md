# MaterialThing Router Documentation

**Complete guide to client-side routing in MaterialThing**

## 📚 Table of Contents

1. [Quick Start](#quick-start)
2. [Core Concepts](#core-concepts)
3. [Components](#components)
4. [Hooks](#hooks)
5. [Route Patterns](#route-patterns)
6. [Navigation](#navigation)
7. [Advanced Patterns](#advanced-patterns)
8. [Best Practices](#best-practices)
9. [Examples](#examples)

---

## Quick Start

### Basic Setup

```tsx
import { BrowserRouter, Route, Link, render } from "@materialthing/core";

function Home() {
  return <h1>Home Page</h1>;
}

function About() {
  return <h1>About Page</h1>;
}

function App() {
  return (
    <div>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
      </nav>

      <BrowserRouter>
        <Route path="/" component={Home} />
        <Route path="/about" component={About} />
      </BrowserRouter>
    </div>
  );
}

render(<App />, document.getElementById("app")!);
```

---

## Core Concepts

### How MaterialThing Router Works

Unlike traditional routers that re-render entire component trees, MaterialThing's router uses **fine-grained reactivity**:

1. **URL changes** → Router signal updates
2. **Router re-evaluates** → Finds matching route
3. **Only matched component renders** → No full page re-render

```tsx
// When URL changes from "/" to "/about":
// 1. currentPath signal updates
// 2. BrowserRouter function re-runs (it's reactive!)
// 3. Only the new route component mounts
```

### Client-Side vs Server-Side

MaterialThing Router is **client-side only**:
- ✅ Single Page Application (SPA) routing
- ✅ Browser history API
- ✅ No page reloads
- ❌ No server-side rendering (yet)
- ❌ No static site generation (yet)

---

## Components

### `<BrowserRouter>`

Container for all routes. Reactively renders the component that matches the current URL.

```tsx
<BrowserRouter>
  <Route path="/" component={Home} />
  <Route path="/about" component={About} />
</BrowserRouter>
```

**Props:**
- `children`: Array of `<Route>` components

**Behavior:**
- Listens to URL changes (via browser history API)
- Matches current path against route definitions
- Renders first matching route component
- Shows 404 message if no routes match

---

### `<Route>`

Defines a route pattern and the component to render when matched.

```tsx
<Route path="/users/:id" component={UserProfile} />
```

**Props:**
- `path` (string): URL pattern to match (supports params with `:param`)
- `component` (function): Component to render when path matches

**Matching Order:**
Routes match in the order they're defined. Put more specific routes first:

```tsx
// ✅ CORRECT - specific before generic
<Route path="/users/new" component={NewUser} />
<Route path="/users/:id" component={UserProfile} />

// ❌ WRONG - generic catches everything
<Route path="/users/:id" component={UserProfile} />
<Route path="/users/new" component={NewUser} /> // Never matches!
```

---

### `<Link>`

Navigation component that changes the URL without page reload.

```tsx
<Link to="/about">About Us</Link>
<Link to="/users/42" className="nav-link">User 42</Link>
```

**Props:**
- `to` (string): Target URL path
- `state` (any, optional): Data to pass via history state
- `className` or `class` (string, optional): CSS classes
- `children`: Link content

**Features:**
- Prevents default anchor behavior
- Uses `pushState` for navigation
- Updates router signals automatically
- Renders as an `<a>` tag (accessible)

**With State:**

```tsx
<Link 
  to="/dashboard" 
  state={{ from: "homepage", timestamp: Date.now() }}
>
  Go to Dashboard
</Link>
```

---

## Hooks

### `useParams()`

Access dynamic route parameters.

```tsx
// Route: /users/:userId/posts/:postId
// URL: /users/42/posts/123

function PostDetail() {
  const params = useParams();
  
  return (
    <div>
      <p>User: {() => params().userId}</p>  // "42"
      <p>Post: {() => params().postId}</p>  // "123"
    </div>
  );
}
```

**Returns:**
- Signal accessor `() => Record<string, string>`
- Empty object `{}` if no params in current route

**Important:**
- Always call `params()` to get the object
- Wrap in function for reactive rendering: `{() => params().id}`
- Params are automatically URL-decoded

---

### `useLocation()`

Access current location information.

```tsx
function CurrentPath() {
  const location = useLocation();
  
  return (
    <div>
      <p>Path: {() => location.pathname()}</p>
      <p>State: {() => JSON.stringify(location.state())}</p>
    </div>
  );
}
```

**Returns:**
- Object with two signal accessors:
  - `pathname()` - Current URL path
  - `state()` - History state object (or `null`)

---

### `useNavigate()`

Programmatically navigate to different routes.

```tsx
function LoginForm() {
  const navigate = useNavigate();
  
  const handleSubmit = () => {
    // Do login...
    navigate("/dashboard", { 
      userId: 42, 
      loggedInAt: Date.now() 
    });
  };
  
  return <button onClick={handleSubmit}>Login</button>;
}
```

**Returns:**
- Function: `(path: string, state?: any) => void`

**Usage:**

```tsx
const navigate = useNavigate();

// Simple navigation
navigate("/home");

// With state
navigate("/profile", { from: "login" });

// Navigate back
window.history.back(); // Use browser API directly
```

---

## Route Patterns

### Static Routes

Exact path matching:

```tsx
<Route path="/" component={Home} />
<Route path="/about" component={About} />
<Route path="/contact" component={Contact} />
```

### Dynamic Parameters

Capture URL segments with `:paramName`:

```tsx
// Single param
<Route path="/users/:id" component={UserProfile} />
// Matches: /users/42, /users/alice, /users/123

// Multiple params
<Route path="/posts/:postId/comments/:commentId" component={Comment} />
// Matches: /posts/5/comments/10

// Mixed static and dynamic
<Route path="/blog/:year/:month/:slug" component={BlogPost} />
// Matches: /blog/2024/12/hello-world
```

**Accessing Params:**

```tsx
function UserProfile() {
  const params = useParams();
  
  // For route: /users/:id
  const userId = () => params().id;
  
  return <h1>User: {userId}</h1>;
}
```

### Nested Paths

MaterialThing doesn't have automatic nested routing, but you can structure paths manually:

```tsx
<Route path="/dashboard" component={Dashboard} />
<Route path="/dashboard/settings" component={Settings} />
<Route path="/dashboard/profile" component={Profile} />
```

### Wildcard / Catch-All

Not currently supported. Use specific routes or implement a custom 404:

```tsx
function App() {
  return (
    <BrowserRouter>
      <Route path="/" component={Home} />
      <Route path="/about" component={About} />
      {/* Add a fallback component for unmatched routes */}
    </BrowserRouter>
  );
}
```

---

## Navigation

### Declarative Navigation (Links)

Use `<Link>` components in your JSX:

```tsx
<nav>
  <Link to="/">Home</Link>
  <Link to="/about">About</Link>
  <Link to="/contact">Contact</Link>
</nav>
```

**With Dynamic Paths:**

```tsx
const users = [
  { id: 1, name: "Alice" },
  { id: 2, name: "Bob" }
];

<ul>
  {users.map(user => (
    <li>
      <Link to={`/users/${user.id}`}>{user.name}</Link>
    </li>
  ))}
</ul>
```

### Programmatic Navigation

Use `useNavigate()` hook:

```tsx
function LoginButton() {
  const navigate = useNavigate();
  
  const handleLogin = async () => {
    const success = await login();
    if (success) {
      navigate("/dashboard");
    }
  };
  
  return <button onClick={handleLogin}>Login</button>;
}
```

**Common Patterns:**

```tsx
const navigate = useNavigate();

// Navigate after form submission
const handleSubmit = (e) => {
  e.preventDefault();
  // Process form...
  navigate("/success");
};

// Navigate with delay
setTimeout(() => {
  navigate("/home");
}, 3000);

// Conditional navigation
if (isLoggedIn) {
  navigate("/dashboard");
} else {
  navigate("/login");
}
```

### Browser Navigation

Use standard browser APIs:

```tsx
// Go back
window.history.back();

// Go forward
window.history.forward();

// Go back 2 pages
window.history.go(-2);
```

---

## Advanced Patterns

### Passing State Between Routes

Use the `state` parameter:

```tsx
// Source route
<Link to="/details" state={{ from: "homepage", userId: 42 }}>
  View Details
</Link>

// Or programmatically
navigate("/details", { from: "homepage", userId: 42 });

// Destination route
function Details() {
  const location = useLocation();
  
  return (
    <div>
      <p>Came from: {() => location.state()?.from}</p>
      <p>User ID: {() => location.state()?.userId}</p>
    </div>
  );
}
```

### Protected Routes

Implement route guards:

```tsx
function ProtectedRoute({ component: Component }) {
  const navigate = useNavigate();
  const isAuthenticated = () => checkAuth(); // Your auth logic
  
  // Check auth and redirect if needed
  if (!isAuthenticated()) {
    navigate("/login");
    return <div>Redirecting...</div>;
  }
  
  return <Component />;
}

// Usage
<Route path="/dashboard" component={() => (
  <ProtectedRoute component={Dashboard} />
)} />
```

### Layout Wrapper

Create a shared layout for multiple routes:

```tsx
function Layout({ children }) {
  return (
    <div>
      <header>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
        </nav>
      </header>
      
      <main>{children}</main>
      
      <footer>© 2024</footer>
    </div>
  );
}

function App() {
  return (
    <Layout>
      <BrowserRouter>
        <Route path="/" component={Home} />
        <Route path="/about" component={About} />
      </BrowserRouter>
    </Layout>
  );
}
```

### Base Path for Deployment

If your app is deployed to a subdirectory (e.g., `example.com/my-app/`):

```tsx
const BASE_PATH = "/my-app";

function App() {
  return (
    <div>
      <nav>
        <Link to={BASE_PATH}>Home</Link>
        <Link to={`${BASE_PATH}/about`}>About</Link>
      </nav>
      
      <BrowserRouter>
        <Route path={BASE_PATH} component={Home} />
        <Route path={`${BASE_PATH}/about`} component={About} />
      </BrowserRouter>
    </div>
  );
}
```

### Query Parameters

Extract query params from the URL:

```tsx
function SearchResults() {
  const location = useLocation();
  
  // Parse query string
  const getQueryParam = (name: string) => {
    const params = new URLSearchParams(window.location.search);
    return params.get(name);
  };
  
  return (
    <div>
      <p>Search query: {getQueryParam("q")}</p>
      <p>Page: {getQueryParam("page")}</p>
    </div>
  );
}

// URL: /search?q=react&page=2
```

### Active Link Styling

Highlight the current page link:

```tsx
function NavLink({ to, children }) {
  const location = useLocation();
  const isActive = () => location.pathname() === to;
  
  return (
    <Link 
      to={to} 
      className={() => isActive() ? "active" : ""}
    >
      {children}
    </Link>
  );
}
```

---

## Best Practices

### 1. Use Base Path Constants

```tsx
// ✅ GOOD - easy to change
const BASE = "/app";

<Link to={`${BASE}/users`}>Users</Link>
<Route path={`${BASE}/users`} component={Users} />

// ❌ BAD - hard to maintain
<Link to="/app/users">Users</Link>
<Route path="/app/users" component={Users} />
```

### 2. Order Routes Correctly

```tsx
// ✅ GOOD - specific first
<Route path="/users/new" component={NewUser} />
<Route path="/users/:id" component={UserProfile} />

// ❌ BAD - generic catches "new"
<Route path="/users/:id" component={UserProfile} />
<Route path="/users/new" component={NewUser} />
```

### 3. Use Reactive Wrappers for Params

```tsx
// ✅ GOOD - reactive
<p>User: {() => params().id}</p>

// ❌ BAD - static
const id = params().id;
<p>User: {id}</p>
```

### 4. Handle Missing Params

```tsx
function UserProfile() {
  const params = useParams();
  
  return (
    <div>
      {() => {
        const id = params().id;
        if (!id) return <p>No user selected</p>;
        return <p>User: {id}</p>;
      }}
    </div>
  );
}
```

### 5. Clean Up State

Don't rely on route state being persisted:

```tsx
function Details() {
  const location = useLocation();
  const state = () => location.state();
  
  // ✅ GOOD - provide fallback
  const userId = () => state()?.userId || "unknown";
  
  return <p>User: {userId}</p>;
}
```

---

## Examples

### Basic Blog Router

```tsx
import { BrowserRouter, Route, Link, useParams } from "@materialthing/core";

function BlogHome() {
  const posts = [
    { id: 1, title: "First Post" },
    { id: 2, title: "Second Post" }
  ];
  
  return (
    <div>
      <h1>Blog</h1>
      {posts.map(post => (
        <div>
          <Link to={`/blog/${post.id}`}>{post.title}</Link>
        </div>
      ))}
    </div>
  );
}

function BlogPost() {
  const params = useParams();
  
  return (
    <div>
      <h1>Post #{() => params().id}</h1>
      <Link to="/blog">← Back to Blog</Link>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Route path="/blog" component={BlogHome} />
      <Route path="/blog/:id" component={BlogPost} />
    </BrowserRouter>
  );
}
```

### E-commerce Product Router

```tsx
function Products() {
  return (
    <div>
      <Link to="/products/electronics">Electronics</Link>
      <Link to="/products/books">Books</Link>
    </div>
  );
}

function Category() {
  const params = useParams();
  
  return (
    <div>
      <h1>Category: {() => params().category}</h1>
      <Link to={`/products/${params().category}/item-1`}>
        View Item 1
      </Link>
    </div>
  );
}

function Product() {
  const params = useParams();
  
  return (
    <div>
      <h2>Product: {() => params().productId}</h2>
      <p>Category: {() => params().category}</p>
      <Link to={`/products/${params().category}`}>
        ← Back to Category
      </Link>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Route path="/products" component={Products} />
      <Route path="/products/:category" component={Category} />
      <Route path="/products/:category/:productId" component={Product} />
    </BrowserRouter>
  );
}
```

### Dashboard with Tabs

```tsx
function Dashboard() {
  return (
    <div>
      <nav>
        <Link to="/dashboard/overview">Overview</Link>
        <Link to="/dashboard/analytics">Analytics</Link>
        <Link to="/dashboard/settings">Settings</Link>
      </nav>
      
      <BrowserRouter>
        <Route path="/dashboard/overview" component={Overview} />
        <Route path="/dashboard/analytics" component={Analytics} />
        <Route path="/dashboard/settings" component={Settings} />
      </BrowserRouter>
    </div>
  );
}
```

---

## Troubleshooting

### Params Not Showing

```tsx
// ❌ PROBLEM
<p>ID: {params().id}</p> // Empty

// ✅ SOLUTION
<p>ID: {() => params().id}</p> // Wrap in function
```

### Routes Not Matching

```tsx
// Check route order
<Route path="/users/:id" component={User} />
<Route path="/users/new" component={NewUser} /> // Never matches!

// Fix: Reorder
<Route path="/users/new" component={NewUser} />
<Route path="/users/:id" component={User} />
```

### Navigation Not Working

```tsx
// Make sure Link has correct path
<Link to="/about">About</Link> // ✅
<Link href="/about">About</Link> // ❌ Wrong prop
```

---

## Summary

**Key Takeaways:**

1. **Use `<BrowserRouter>` and `<Route>`** to define your routes
2. **Use `<Link>`** for declarative navigation
3. **Use `useNavigate()`** for programmatic navigation
4. **Use `useParams()`** to access route parameters
5. **Wrap params in functions** for reactive rendering: `{() => params().id}`
6. **Order matters** - specific routes before generic ones
7. **Use base path constants** for maintainability

The MaterialThing Router provides everything you need for client-side routing with fine-grained reactivity!
