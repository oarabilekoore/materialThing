# materialThing

**MaterialThing** is a high-performance, lightweight TypeScript framework that brings fine-grained reactivity to vanilla JavaScript.

Unlike traditional frameworks that rely on a Virtual DOM (VDOM), MaterialThing uses a custom **JSX Runtime** to compile directly to native DOM nodes. It combines fine-grained reactivity with an intelligent CSS-in-JS engine to ensure your apps are fast, type-safe, and style-conflict-free.

## 🚀 Key Features

- **Zero VDOM Overhead:** JSX compiles directly to `HTMLElement`, `Text`, or `DocumentFragment`
- **Fine-Grained Reactivity:** State changes update *only* the specific DOM attributes or text nodes bound to them—no component re-renders
- **Collision-Free Styling:** Built-in CSS engine that hashes and scopes styles automatically
- **TypeScript First:** Built completely in TypeScript for robust type safety
- **React Compatibility Layer:** Use React libraries and components seamlessly
- **Built-in Router:** Client-side routing with dynamic params and history state
- **Bring Your Own Components:** Use any component library or build your own with our reactive primitives

## 📦 Installation

```bash
npm add @materialthing/core @materialthing/jsx
# or
bun add @materialthing/core @materialthing/jsx
```

### For React Library Compatibility

```bash
npm add @materialthing/react
# or
bun add @materialthing/react
```

### Configuration

Update your `tsconfig.json` to use the custom JSX runtime:

```json
{
  "compilerOptions": {
    "jsx": "react-jsx",
    "jsxImportSource": "@materialthing/jsx"
  }
}
```

Update your `vite.config.ts`:

```typescript
import { defineConfig } from "vite";
import path from "path";

export default defineConfig({
  esbuild: {
    jsx: "automatic",
    jsxImportSource: "@materialthing/jsx",
  },
});
```

## 🛠 Development

To contribute to the framework or run the examples locally:

1. Clone the repository:

```bash 
git clone https://github.com/oarabilekoore/materialThing
cd materialThing
```

2. Install dependencies:

```bash 
bun install
```

3. Run examples:

```bash
bun dev 
```

## 💡 Core Concepts

### Direct DOM Manipulation

MaterialThing treats JSX differently. Instead of creating a JavaScript object that describes the UI (like React), the runtime creates the actual DOM elements immediately.

```tsx
// This creates a real HTMLButtonElement in memory immediately
const btn = <button>Click Me</button>; 

document.body.appendChild(btn);
```

### Fine-Grained Reactivity

MaterialThing uses Signals for state management. A Signal is a wrapper around a value that notifies subscribers when it changes.

#### Creating Signals

```tsx
import { createSignal } from "@materialthing/core";

// Create a signal
const [count, setCount] = createSignal(0);

// Access value
console.log(count()); // 0

// Update value
setCount(1);
setCount(c => c + 1); // Functional updates
```

#### Automatic Side Effects

Effects run immediately and re-run whenever their dependencies change:

```tsx
import { useEffect } from "@materialthing/core";

useEffect(() => {
  console.log("Count is:", count());
});

setCount(5); // Logs: "Count is: 5"
```

#### Computed Values

Create read-only derived values:

```tsx
import { useComputed } from "@materialthing/core";

const double = useComputed(() => count() * 2);
console.log(double()); // 10
```

### Intelligent Styling (CSS Manager)

Style conflicts are solved using a high-performance CSS-in-JS manager:

- **Hashes your styles:** Uses the DJB2 algorithm to generate unique class names (e.g., `gg-anim-x7z9`)
- **Direct Injection:** Uses `CSSStyleSheet.insertRule` for optimal performance
- **Caching:** Styles are cached—reusing the same style generates only one CSS rule

```tsx
import { css } from "@materialthing/core";

const btnClass = css({
  backgroundColor: '#6200ee',
  color: 'white',
  padding: '10px 20px',
  borderRadius: '4px',
  '&:hover': {
    backgroundColor: '#3700b3'
  }
});

const view = <button className={btnClass}>Click Me</button>;
```

#### Animations

```tsx
import { keyframes } from "@materialthing/core";

const fadeIn = keyframes({
  '0%': { opacity: 0 },
  '100%': { opacity: 1 }
});

const animatedClass = css({
  animation: `${fadeIn} 300ms ease-in`
});
```

### Client-Side Router

Built-in router with dynamic params, nested routes, and history state:

```tsx
import { BrowserRouter, Route, Link, useParams } from "@materialthing/core";

function UserProfile() {
  const params = useParams();
  return <div>User ID: {() => params().id}</div>;
}

function App() {
  return (
    <div>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/user/42">User 42</Link>
      </nav>

      <BrowserRouter>
        <Route path="/" component={HomePage} />
        <Route path="/user/:id" component={UserProfile} />
      </BrowserRouter>
    </div>
  );
}
```

## 🎨 Using with UI Libraries

MaterialThing is designed to work with any component library. Popular choices include:

### shadcn/ui
Since MaterialThing compiles to standard DOM elements, you can use shadcn/ui components directly:

```tsx
import { Button } from "@/components/ui/button"

function App() {
  const [count, setCount] = createSignal(0);
  
  return (
    <Button onClick={() => setCount(c => c + 1)}>
      Count: {count}
    </Button>
  );
}
```

### Material-UI (MUI)

Use Material-UI with the React compatibility layer:

```tsx
import React, { useState } from "@materialthing/react";
import { Button, TextField, Box } from "@mui/material";

function LoginForm() {
  const [email, setEmail] = useState("");

  return (
    <Box>
      <TextField 
        label="Email" 
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Button variant="contained">Login</Button>
    </Box>
  );
}
```

### React Router

```tsx
import React from "@materialthing/react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </BrowserRouter>
  );
}
```

### Material Web Components

Use Google's official Material Design Web Components:

```bash
npm install @material/web
```

```tsx
import '@material/web/button/filled-button.js';

function App() {
  return <md-filled-button>Click me</md-filled-button>;
}
```

### Build Your Own

Use MaterialThing's reactive primitives to build custom components:

```tsx
import { css } from "@materialthing/core";

function CustomButton({ children, onClick }) {
  const buttonClass = css({
    padding: '12px 24px',
    borderRadius: '8px',
    border: 'none',
    backgroundColor: '#007bff',
    color: 'white',
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: '#0056b3'
    }
  });
  
  return (
    <button className={buttonClass} onClick={onClick}>
      {children}
    </button>
  );
}
```

## 📚 Package Structure

- **@materialthing/core** - Reactive primitives, CSS-in-JS, router, and DOM utilities
- **@materialthing/jsx** - Custom JSX runtime for direct DOM compilation
- **@materialthing/react** - React compatibility layer for using React libraries

## 🔌 React Compatibility

MaterialThing provides a React compatibility layer that allows you to use React-based libraries without modification. This includes:

- **Full Hook Support:** `useState`, `useEffect`, `useCallback`, `useMemo`, `useRef`, `useContext`, etc.
- **Context API:** `createContext`, `Provider`, `Consumer`
- **Utilities:** `forwardRef`, `memo`, `Children`, `createPortal`
- **Tested Libraries:** Material-UI, React Router, React Hook Form, Radix UI, Chakra UI, Zustand, Jotai

**Note:** The React compatibility layer is for library interop only. For new MaterialThing code, use the native APIs (`createSignal`, `useEffect`, etc.) directly.

See the [@materialthing/react documentation](./packages/react-compat/README.md) for details.

## 🎯 Roadmap

- [x] Fine-grained reactivity with signals
- [x] CSS-in-JS with scoping and keyframes
- [x] Client-side router with dynamic params
- [x] React compatibility layer
- [x] Portal support
- [ ] Form validation utilities
- [ ] Transition/animation helpers
- [ ] Server-side rendering (SSR) support
- [ ] DevTools extension
- [ ] Component library (community-driven)

## 🤝 Contributing

Contributions are welcome! Please read our contributing guidelines before submitting PRs.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Inspired by modern reactive frameworks (Solid.js, Svelte)
- [Signals](https://github.com/tc39/proposal-signals) proposal for reactive primitives
- React team for the excellent Hooks API design

## 📖 Documentation

For more detailed documentation, visit our [documentation site](https://materialthing.dev) (coming soon) or check out the [examples](./examples) directory.

### Package Documentation

- [Core Package](./packages/core/README.md) - Reactive primitives and core utilities
- [JSX Runtime](./packages/jsx/README.md) - Custom JSX compiler
- [React Compatibility](./packages/react-compat/README.md) - React library integration

## 🚀 Quick Start Examples

### Counter with Signals

```tsx
import { createSignal, render } from "@materialthing/core";

function Counter() {
  const [count, setCount] = createSignal(0);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(c => c + 1)}>Increment</button>
    </div>
  );
}

render(<Counter />, document.getElementById("app")!);
```

### Todo List

```tsx
import { createSignal } from "@materialthing/core";

function TodoList() {
  const [todos, setTodos] = createSignal<string[]>([]);
  const [input, setInput] = createSignal("");

  const addTodo = () => {
    if (input().trim()) {
      setTodos([...todos(), input()]);
      setInput("");
    }
  };

  return (
    <div>
      <input 
        value={input()} 
        onInput={(e) => setInput(e.target.value)}
        placeholder="Enter todo"
      />
      <button onClick={addTodo}>Add</button>
      <ul>
        {() => todos().map(todo => <li>{todo}</li>)}
      </ul>
    </div>
  );
}
```

### With CSS-in-JS

```tsx
import { css, keyframes } from "@materialthing/core";

const slideIn = keyframes({
  from: { transform: 'translateX(-100%)' },
  to: { transform: 'translateX(0)' }
});

const cardClass = css({
  padding: '20px',
  borderRadius: '8px',
  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
  animation: `${slideIn} 0.3s ease-out`,
  '&:hover': {
    boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
  }
});

function Card({ children }) {
  return <div className={cardClass}>{children}</div>;
}
```

## 🌟 Why MaterialThing?

### Performance
- **No Virtual DOM diffing** - Direct DOM updates only where needed
- **Fine-grained reactivity** - Only changed values trigger updates, not entire components
- **Minimal bundle size** - Core is under 10KB minified + gzipped

### Developer Experience
- **TypeScript first** - Full type safety out of the box
- **Familiar JSX syntax** - Use the patterns you already know
- **React library support** - Use your favorite React libraries
- **Built-in routing** - No need for additional router packages

### Flexibility
- **Bring your own UI** - Works with any component library
- **Progressive adoption** - Start small, scale as needed
- **No lock-in** - Standard DOM means easy migration
