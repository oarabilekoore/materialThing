# materialThing

**MaterialThing** is a high-performance, lightweight TypeScript framework that brings fine-grained reactivity to vanilla JavaScript. 

Unlike traditional frameworks that rely on a Virtual DOM (VDOM), MaterialThing uses a custom **JSX Runtime** to compile directly to native DOM nodes. It combines fine-grained reactivity with an intelligent CSS-in-JS engine to ensure your apps are fast, type-safe, and style-conflict-free.

## 🚀 Key Features

- **Zero VDOM Overhead:** JSX compiles directly to `HTMLElement`, `Text`, or `DocumentFragment`
- **Fine-Grained Reactivity:** State changes update *only* the specific DOM attributes or text nodes bound to them—no component re-renders
- **Collision-Free Styling:** Built-in CSS engine that hashes and scopes styles automatically
- **TypeScript First:** Built completely in TypeScript for robust type safety
- **Bring Your Own Components:** Use any component library or build your own with our reactive primitives

## 📦 Installation

```bash
npm add @materialthing/core @materialthing/jsx
# or
bun add @materialthing/core @materialthing/jsx
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
const btn = Click Me; 

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

count.set(5); // Logs: "Count is: 5"
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

// Renders: Click Me
const view = Click Me;
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
  return Click me;
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
    
      {children}
    
  );
}
```

## 📚 Package Structure

- **@materialthing/core** - Reactive primitives, CSS-in-JS, and DOM utilities
- **@materialthing/jsx** - Custom JSX runtime for direct DOM compilation

## 🎯 Roadmap

- [ ] Router implementation
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
- [Material Design 3](https://m3.material.io/) specifications from Google
- [Signals](https://github.com/tc39/proposal-signals) proposal for reactive primitives

## 📖 Documentation

For more detailed documentation, visit our [documentation site](https://materialthing.dev) (coming soon) or check out the [examples](./examples) directory.
