# materialThing

A lightweight, pure JavaScript UI library that combines the flexibility of vanilla JS with the power of modern frameworks. Build interactive interfaces without touching the DOM directly through clean, declarative APIs.

## ✨ Features

- **🚀 Zero Dependencies** - Pure JavaScript with no external runtime dependencies
- **🎨 CSS-in-JS** - Dynamic styling with automatic class generation and caching
- **📱 Material Design** - Built-in Material Design 3 components and theming
- **⚡ Reactive State** - Signal-based state management with automatic dependency tracking
- **🧩 Component System** - Reusable components with props and lifecycle management
- **🛣️ Client-Side Routing** - Built-in browser router for single-page applications
- **🔧 TypeScript Ready** - Full TypeScript support with proper type definitions
- **📦 Modular Architecture** - Use only what you need with tree-shakable modules

## 🚀 Quick Start

### Installation

```bash
npm install materialthing
# or
yarn add materialthing
# or
pnpm add materialthing
```

### Basic Usage

```javascript
import { div, h1, p } from 'materialthing/core/html-elements';
import { css } from 'materialthing/core/css-manager';
import { Button } from 'materialthing/ui';

function App() {
  const container = div();
  container.classList.add(
    css({
      padding: '20px',
      fontFamily: 'system-ui',
      backgroundColor: 'var(--md-sys-color-surface)',
      color: 'var(--md-sys-color-on-surface)'
    }),
    'light' // Apply Material Design light theme
  );

  h1(container, 'Welcome to materialThing');
  p(container, 'Build beautiful UIs with pure JavaScript');

  Button({
    parent: container,
    text: 'Get Started',
    variant: 'filled',
    size: 'lg'
  });

  return container;
}

document.getElementById('app')?.appendChild(App());
```

## 📦 Package Structure

materialThing is organized into focused packages:

### Core (`@materialthing/core`)
The foundation of materialThing with essential building blocks:

- **HTML Elements** - Type-safe wrappers for all HTML elements
- **CSS Manager** - CSS-in-JS with automatic class generation and keyframes
- **State Management** - Reactive signals with computed values and effects
- **DOM Router** - Client-side routing for SPAs
- **Error Handling** - Comprehensive error management system

### UI Components (`@materialthing/ui`)
Material Design 3 components built with core:

- **Button** - Multiple variants (filled, outlined, text, elevated, tonal)
- **FAB** - Floating Action Button with expanding menu support
- **More components coming soon...**

### MTX Compiler (`@materialthing/mtx`)
JSX-like syntax extension for enhanced developer experience:

```jsx
// .mtx files support component syntax
export component Welcome(props: { name: string }) {
  <div class={styles.container}>
    <h1>Hello, {props.name}!</h1>
    if (props.name === 'World') {
      <p>Welcome to materialThing!</p>
    }
    for (let i = 0; i < 3; i++) {
      <div>Item {i}</div>
    }
  </div>
}
```

## 🎨 CSS-in-JS System

Dynamic styling with automatic optimization:

```javascript
import { css, keyframes } from 'materialthing/core/css-manager';

// Create reusable styles
const buttonStyle = css({
  padding: '12px 24px',
  borderRadius: '8px',
  backgroundColor: 'var(--md-sys-color-primary)',
  color: 'var(--md-sys-color-on-primary)',

  // Pseudo-classes and media queries
  ':hover': {
    backgroundColor: 'var(--md-sys-color-primary-container)'
  },

  '@media (max-width: 768px)': {
    padding: '8px 16px',
    fontSize: '14px'
  }
});

// Keyframe animations
const fadeIn = keyframes({
  '0%': { opacity: 0, transform: 'translateY(20px)' },
  '100%': { opacity: 1, transform: 'translateY(0)' }
});

const animatedStyle = css({
  animation: `${fadeIn} 300ms ease-out`
});
```

## ⚡ Reactive State Management

Signal-based reactivity with automatic dependency tracking:

```javascript
import { signal, computed, effect } from 'materialthing/core/state-manager';

// Create reactive state
const count = signal(0);
const name = signal('World');

// Computed values automatically update
const greeting = computed(() => `Hello, ${name.get()}!`);
const doubleCount = computed(() => count.get() * 2);

// Effects run when dependencies change
effect(() => {
  console.log(`Count is now: ${count.get()}`);
});

// Update state
count.set(count.get() + 1); // Triggers effect
name.set('materialThing'); // Updates computed greeting
```

## 🧩 Component System

Build reusable components with props and lifecycle:

```javascript
import { div, h2, p } from 'materialthing/core/html-elements';
import { css } from 'materialthing/core/css-manager';

function Card({ title, content, parent, variant = 'elevated' }) {
  const card = div(parent);

  card.classList.add(css({
    padding: '16px',
    borderRadius: '12px',
    backgroundColor: variant === 'elevated'
      ? 'var(--md-sys-color-surface-container-low)'
      : 'var(--md-sys-color-surface)',
    boxShadow: variant === 'elevated'
      ? 'var(--md-sys-elevation-level-1)'
      : 'none'
  }));

  h2(card, title);
  p(card, content);

  return card;
}

// Usage
Card({
  parent: document.body,
  title: 'Welcome',
  content: 'This is a reusable card component',
  variant: 'elevated'
});
```

## 🎨 Material Design Theming

Built-in Material Design 3 color tokens and theming:

```css
/* Apply theme classes to your root element */
.light { /* Light theme tokens */ }
.dark { /* Dark theme tokens */ }
.light-medium-contrast { /* Enhanced contrast */ }
.dark-high-contrast { /* High contrast mode */ }
```

```javascript
// Use Material Design color tokens
const themed = css({
  backgroundColor: 'var(--md-sys-color-primary)',
  color: 'var(--md-sys-color-on-primary)',
  borderColor: 'var(--md-sys-color-outline)'
});
```

## 🛣️ Client-Side Routing

Built-in router for single-page applications:

```javascript
import { BrowserRouter } from 'materialthing/core/dom-router';

const routes = [
  {
    path: '/',
    title: 'Home',
    component: () => HomePage()
  },
  {
    path: '/about',
    title: 'About',
    component: () => AboutPage()
  },
  {
    path: '/user/:id',
    title: 'User Profile',
    component: (params) => UserPage(params)
  }
];

const router = new BrowserRouter(routes, document.getElementById('app'));
```

## 📚 API Reference

### Core Elements
```javascript
import { div, button, input, h1, p, /* ... all HTML elements */ } from 'materialthing/core/html-elements';

// All elements support the same signature:
const element = div(parent?, text?, children?);
```

### CSS Management
```javascript
import { css, keyframes } from 'materialthing/core/css-manager';

const className = css(styleObject);
const animationName = keyframes(keyframeSteps);
```

### State Management
```javascript
import { signal, computed, effect } from 'materialthing/core/state-manager';

const reactive = signal(initialValue);
const derived = computed(() => /* computation */);
effect(() => /* side effect */);
```

## 🏗️ Development Setup

```bash
# Clone the repository
git clone https://github.com/your-org/materialthing.git
cd materialthing

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Run tests
npm test
```

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

### Development Workflow
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Add tests for new functionality
5. Run the test suite (`npm test`)
6. Commit your changes (`git commit -m 'Add amazing feature'`)
7. Push to your branch (`git push origin feature/amazing-feature`)
8. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Inspired by modern reactive frameworks while maintaining vanilla JS simplicity
- Material Design 3 specifications from Google
- Community feedback and contributions

---

**materialThing** - *Build beautiful, reactive UIs with pure JavaScript* 🚀
