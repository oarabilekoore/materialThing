# @materialthing/react

**React Compatibility Layer for MaterialThing**

A compatibility shim that allows React-based libraries to run on MaterialThing's signal-based reactive system.

## 🎯 Purpose

This package exists to bridge the gap between React's API and MaterialThing's architecture. It translates React Hook calls into MaterialThing's signal system, allowing you to use existing React component libraries without modification.

**This is not React.** This is a compatibility layer that implements React's API surface to enable library interop.

## 📦 Installation

```bash
npm install @materialthing/react @materialthing/core @materialthing/jsx
# or
bun add @materialthing/react @materialthing/core @materialthing/jsx
```

## 🔌 What This Is For

Use this package when you want to:

- Use React component libraries (Material-UI, Chakra UI, Radix UI, etc.) with MaterialThing
- Integrate React Router, React Hook Form, or other React-based tools
- Migrate React codebases incrementally to MaterialThing
- Use npm packages that depend on `react` as a peer dependency

## ⚠️ What This Is NOT For

- **Not for React performance patterns** - `useMemo`, `useCallback`, and `memo` are implemented for API compatibility but don't improve performance in MaterialThing (signals already handle that)
- **Not a React replacement** - If you want actual React, use React
- **Not for new MaterialThing code** - Use MaterialThing's native APIs (`createSignal`, `useEffect`, etc.) directly

## 🚀 Quick Start

### Using with React Libraries

```tsx
// Import from the compatibility layer
import React, { useState, useEffect } from "@materialthing/react";
import { Button, TextField } from "@mui/material";
import { render } from "@materialthing/core";

function LoginForm() {
  const [email, setEmail] = useState("");
  
  return (
    <div>
      <TextField 
        label="Email" 
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Button variant="contained">Login</Button>
    </div>
  );
}

render(<LoginForm />, document.getElementById("app")!);
```

### Package.json Aliasing (Recommended)

To use React libraries that import from `"react"`:

```json
{
  "dependencies": {
    "@materialthing/react": "^1.0.0",
    "@mui/material": "^5.0.0"
  },
  "resolutions": {
    "react": "npm:@materialthing/react@^1.0.0",
    "react-dom": "npm:@materialthing/react@^1.0.0"
  }
}
```

Or in Vite:

```ts
// vite.config.ts
export default defineConfig({
  resolve: {
    alias: {
      'react': '@materialthing/react',
      'react-dom': '@materialthing/react'
    }
  }
});
```

## 📚 API Reference

### Implemented Hooks

All hooks are implemented to match React's API contract:

- `useState<T>(initial)` - Maps to MaterialThing signals
- `useEffect(fn, deps?)` - Runs effects with dependency tracking
- `useLayoutEffect(fn, deps?)` - Alias for useEffect (no layout phase in MaterialThing)
- `useCallback(fn, deps)` - Returns function (no memoization benefit)
- `useMemo(fn, deps)` - Returns value (no memoization benefit)
- `useRef<T>(initial)` - Creates stable reference object
- `createContext<T>(default)` - Creates context for prop drilling
- `useContext<T>(context)` - Reads context value
- `forwardRef(render)` - Forwards refs through components
- `memo(Component)` - Returns component (no memoization benefit)

### Utilities

- `Children` - Utilities for manipulating children
- `Fragment` - Groups elements without wrapper
- `createElement` - Creates VNodes
- `isValidElement` - Checks if value is a VNode
- `createPortal(children, container)` - Renders children into a different DOM node

### Not Implemented

These hooks are not implemented as they're rarely needed by libraries:

- `useReducer` - Use `useState` or MaterialThing's signals directly
- `useImperativeHandle` - Rarely used by libraries
- `useDebugValue` - Development tool
- `useDeferredValue`, `useTransition` - Concurrent features
- `useId` - Not needed for SSR compatibility (no SSR yet)

## 🔄 How It Works

### State Management

When you call `useState`, it creates a MaterialThing signal under the hood:

```tsx
// You write:
const [count, setCount] = useState(0);

// Under the hood:
const [signal, setSignal] = createSignal(0);
// Then returns unwrapped value and wrapped setter
```

This means:
- State updates trigger MaterialThing's fine-grained reactivity
- Only affected DOM nodes update, not entire component trees
- No virtual DOM diffing

### Effects

When you call `useEffect`, it wraps MaterialThing's `useEffect`:

```tsx
// You write:
useEffect(() => {
  console.log(count);
}, [count]);

// Under the hood:
// Tracks dependencies and only re-runs when they change
// Uses MaterialThing's reactive system for automatic tracking
```

### Hooks State

The compatibility layer maintains hook state per component using WeakMaps:

```tsx
// Each component gets its own hook storage
// Hook calls are tracked by index
// State persists across re-renders
```

## ✅ Tested Libraries

These React libraries are known to work:

- **Material-UI (MUI)** - ✅ Full support
- **React Router v6** - ✅ Full support
- **React Hook Form** - ✅ Full support
- **Radix UI** - ✅ Full support
- **Chakra UI** - ✅ Full support
- **Zustand** - ✅ Full support
- **Jotai** - ✅ Full support

## ⚠️ Known Limitations

1. **Class Components** - Not supported. Use functional components only.
2. **SSR/RSC** - Server-side rendering not implemented yet
3. **Concurrent Features** - No Suspense data fetching or transitions
4. **Error Boundaries** - Not implemented (use try/catch)
5. **Profiler** - Not implemented

## 🐛 Debugging

### Common Issues

**"Hooks can only be called inside a component"**
- You're calling hooks outside a function component
- You're calling hooks conditionally or in loops

**Library complains about React version**
- Add package alias (see "Package.json Aliasing" above)
- Some libraries check `React.version` - this is set to "18.0.0"

**State not updating**
- Check that you're using the setter from `useState`, not mutating directly
- Verify the library isn't checking `instanceof React.Component`

## 🎯 Migration Strategy

### For Existing React Apps

1. Install MaterialThing packages
2. Alias `react` to `@materialthing/react`
3. Change top-level render:
   ```tsx
   // Before
   import ReactDOM from 'react-dom/client';
   ReactDOM.createRoot(el).render(<App />);
   
   // After
   import { render } from '@materialthing/core';
   render(<App />, el);
   ```
4. Test thoroughly - most code should "just work"

### For New MaterialThing Apps

**Don't use this package for new code.** Use MaterialThing's native APIs:

```tsx
// Instead of this (React compat):
import { useState } from "@materialthing/react";
const [count, setCount] = useState(0);

// Do this (MaterialThing native):
import { createSignal } from "@materialthing/core";
const [count, setCount] = createSignal(0);
```

Only import `@materialthing/react` when using third-party React libraries.

## 📝 Examples

### Using React Router

```tsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "@materialthing/react";
import { render } from "@materialthing/core";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </BrowserRouter>
  );
}

render(<App />, document.getElementById("app")!);
```

### Using Material-UI

```tsx
import { Button, Box, TextField } from "@mui/material";
import React, { useState } from "@materialthing/react";

function Form() {
  const [value, setValue] = useState("");

  return (
    <Box>
      <TextField 
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <Button onClick={() => console.log(value)}>
        Submit
      </Button>
    </Box>
  );
}
```

### Using Portals

```tsx
import React, { useState } from "@materialthing/react";
import { createPortal } from "@materialthing/react";

function Modal({ children, isOpen }) {
  if (!isOpen) return null;

  // Render modal content into document.body
  return createPortal(
    <div className="modal-backdrop">
      <div className="modal-content">
        {children}
      </div>
    </div>,
    document.body
  );
}

function App() {
  const [showModal, setShowModal] = useState(false);

  return (
    <div>
      <button onClick={() => setShowModal(true)}>Open Modal</button>
      <Modal isOpen={showModal}>
        <h2>Modal Title</h2>
        <button onClick={() => setShowModal(false)}>Close</button>
      </Modal>
    </div>
  );
}
```

## 🤝 Contributing

Found a React library that doesn't work? Please report it with:

1. Library name and version
2. Minimal reproduction code
3. Error message or unexpected behavior
4. What you expected to happen

## 📄 License

MIT License - see the [LICENSE](../../LICENSE) file for details.

## 📖 See Also

- [MaterialThing Core](../core/README.md) - Use these APIs for new code
- [MaterialThing JSX](../jsx/README.md) - JSX runtime documentation
- [React Documentation](https://react.dev) - Original React docs (for reference)
