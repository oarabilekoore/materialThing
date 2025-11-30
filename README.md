# materialThing

**MaterialThing** is a high-performance, lightweight TypeScript framework that ships with its own design system. 

Unlike traditional frameworks that rely on a Virtual DOM (VDOM), MaterialThing uses a custom **JSX Runtime** to compile directly to native DOM nodes. It combines fine-grained reactivity with an intelligent CSS-in-JS engine to ensure your apps are fast, type-safe, and style-conflict-free.



## 🚀 Key Features

- **Zero VDOM Overhead:** JSX compiles directly to `HTMLElement`, `Text`, or `DocumentFragment`.
- **Fine-Grained Reactivity:** State changes update *only* the specific DOM attributes or text nodes bound to them—no component re-renders.
- **Collision-Free Styling:** A built-in CSS engine that hashes and scopes styles automatically.
- **Integrated UI Kit:** Comes with a ready-to-use set of Material Design inspired components (`@materialthing/ui`).
- **TypeScript First:** Built completely in TypeScript for robust type safety.



## 📦 Installation

To use MaterialThing in your project, install the core packages (assuming you have a Bun/NPM environment set up):

```bash
bun add @materialthing/core @materialthing/ui @materialthing/jsx
```

### Configuration 

Update your `tsconfig.json` to use the custom JSX runtime.

```json
{
  "compilerOptions": {
    "jsx": "react-jsx",
    "jsxImportSource": "@materialthing/jsx"
  }
}
```

## 🛠 Development

To contribute to the framework or run the examples locally:

1. Clone the repository:

```bash 
git clone https://github.com/oarabilekoore/materialThing
```

2. Install Dependencies using bun

```bash 
bun install
```

3. Run playground/examples

```bash
bun dev 
```

## 💡 Core Concepts

### The Framework (Direct DOM)

MaterialThing treats JSX differently. Instead of creating a JavaScript object that describes the UI (like React), the runtime creates the actual DOM elements immediately.

```javascript 
// This creates a real HTMLButtonElement in memory immediately
const btn = <button>Click Me</button>; 

document.body.appendChild(btn);
```

### Fine-Grained Reactivity

MaterialThing uses Signals for state management. A Signal is a wrapper around a value that notifies subscribers when it changes. We support automatic dependency tracking—if you access a signal inside an `effect`, it automatically subscribes.

```javascript
import { signal, effect, computed } from "@materialthing/core";

// 1. Create a Signal
const count = signal(0);

// 2. Access and Update
console.log(count.get()); // 0
count.set(1);
```

**Automatic Side Effects** : effect Effects run immediately, and re-run whenever their dependencies change.

```javascript
// This logs "Count is: 1" immediately.
// It automatically tracks 'count' because .get() was called inside.
effect(() => {
  console.log("Count is:", count.get());
});

count.set(5); // Logs: "Count is: 5"
```

**Derived State**: computed Create read-only values that update automatically based on other signals.

```javascript
const double = computed(() => count.get() * 2);

console.log(double.get()); // 10
```

### Intelligent Styling (CSS Manager)

Style clashes are solved using a high-performance CSS-in-JS manager.

Instead of inline styles or global CSS files, MaterialThing:

- Hashes your styles: Uses the DJB2 algorithm to generate a unique, deterministic class name (e.g., gg-anim-x7z9).

- Direct Injection: Uses CSSStyleSheet.insertRule to inject styles directly into the browser's CSS Object Model (CSSOM). This is significantly faster than appending <style> tags to the DOM.

- Caching: Styles are cached. If you use the same style object in 100 buttons, the CSS is only generated and inserted once.

```javascript
import { css } from "@materialthing/core";

// Returns a unique class name string
const btnClass = css({
  backgroundColor: '#6200ee',
  color: 'white',
  padding: '10px 20px',
  borderRadius: '4px',
  '&:hover': {
    backgroundColor: '#3700b3'
  }
});

// Render: <button class="gg-anim-z82a1">Click Me</button>
const view = <button className={btnClass}>Click Me</button>;
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Inspired by modern reactive frameworks while maintaining vanilla JS simplicity
- [Material Design 3](https://m3.material.io/) specifications from Google
- [Signals](https://github.com/tc39/proposal-signals) proposal for reactive primitives
