# MaterialThing Reactivity Guide

**Understanding Fine-Grained Reactivity and Common Pitfalls**

## 📚 Table of Contents

1. [Core Concepts](#core-concepts)
2. [Signal Basics](#signal-basics)
3. [Reactive Bindings in JSX](#reactive-bindings-in-jsx)
4. [Common Pitfalls](#common-pitfalls)
5. [Advanced Patterns](#advanced-patterns)
6. [Performance Best Practices](#performance-best-practices)
7. [Debugging Tips](#debugging-tips)

---

## Core Concepts

### What is Fine-Grained Reactivity?

MaterialThing uses **fine-grained reactivity**, meaning only the specific DOM nodes bound to changed values update—not entire components. This is fundamentally different from React's approach.

```tsx
// React approach (Virtual DOM):
// When state changes, the entire component re-renders,
// then a diff algorithm figures out what changed

// MaterialThing approach (Fine-grained):
// When a signal changes, ONLY the DOM nodes bound to that signal update
```

### The Signal Model

A **signal** is a reactive container that:
1. Stores a value
2. Tracks who's reading it (subscribers)
3. Notifies subscribers when the value changes

```tsx
const [count, setCount] = createSignal(0);

// count() - Accessor function (reads the value)
// setCount() - Setter function (updates the value)
```

---

## Signal Basics

### Creating Signals

```tsx
import { createSignal } from "@materialthing/core";

// Primitive values
const [name, setName] = createSignal("Alice");
const [age, setAge] = createSignal(25);
const [isActive, setActive] = createSignal(true);

// Objects and arrays (stored by reference)
const [user, setUser] = createSignal({ name: "Bob", age: 30 });
const [items, setItems] = createSignal([1, 2, 3]);
```

### Reading Signal Values

```tsx
const [count, setCount] = createSignal(0);

// ❌ WRONG - count is the accessor function, not a number
console.log(count + 1); // Error: can't add to a function

// ✅ CORRECT - call the accessor to get the value
console.log(count() + 1); // 1
```

### Updating Signals

```tsx
const [count, setCount] = createSignal(0);

// Direct update
setCount(5);
console.log(count()); // 5

// Functional update (uses previous value)
setCount(prev => prev + 1);
console.log(count()); // 6

// ❌ WRONG - mutating the value directly
count() = 10; // Error: can't assign to function call

// ❌ WRONG - this doesn't trigger reactivity
const [user, setUser] = createSignal({ name: "Alice" });
user().name = "Bob"; // Mutates but doesn't notify subscribers

// ✅ CORRECT - create a new object
setUser({ ...user(), name: "Bob" });
```

---

## Reactive Bindings in JSX

### The Critical Rule: Signal vs Signal Value

**When to pass the signal itself (`signal`) vs its value (`signal()`)**

```tsx
const [text, setText] = createSignal("Hello");

// ✅ CORRECT - Pass signal for reactive attributes
<input value={text} />

// ❌ WRONG - Passes static value, won't update
<input value={text()} />

// ✅ CORRECT - Pass signal value for static text
<p>Message: {text()}</p>

// ✅ CORRECT - Wrap in function for reactive text
<p>{() => `Message: ${text()}`}</p>
```

### How It Works Under the Hood

When you pass a signal to an attribute:

```tsx
<input value={text} />

// The renderer detects it's a signal and creates:
useEffect(() => {
  inputElement.value = text();
});
```

When you call `text()` directly:

```tsx
<input value={text()} />

// The renderer sees a static string:
inputElement.value = "Hello";
// No reactivity created!
```

### Attributes That Should Be Reactive

```tsx
const [value, setValue] = createSignal("");
const [disabled, setDisabled] = createSignal(false);
const [className, setClassName] = createSignal("active");

// ✅ All reactive - pass signals
<input 
  value={value}
  disabled={disabled}
  className={className}
  placeholder="Type here..." // Static is fine
/>
```

### Event Handlers Are Always Static

```tsx
const [count, setCount] = createSignal(0);

// ✅ CORRECT - event handlers are always functions, not signals
<button onClick={() => setCount(count() + 1)}>
  Increment
</button>

// ❌ WRONG - don't pass signals to event handlers
<button onClick={someSignal}>
  Click
</button>
```

---

## Common Pitfalls

### Pitfall #1: Calling Signals in JSX Attributes

**❌ THE MOST COMMON MISTAKE**

```tsx
function Form() {
  const [email, setEmail] = createSignal("");

  // ❌ WRONG - email() evaluates once, no reactivity
  return (
    <input 
      value={email()} 
      onInput={(e) => setEmail((e.target as HTMLInputElement).value)}
    />
  );
}
```

**Why it fails:**
1. `email()` is called during initial render → returns `""`
2. JSX creates `<input value="">` 
3. User types in the input
4. `onInput` updates the signal
5. **Input doesn't update** because `value=""` is static

**✅ SOLUTION:**

```tsx
function Form() {
  const [email, setEmail] = createSignal("");

  // ✅ CORRECT - pass signal itself
  return (
    <input 
      value={email} 
      onInput={(e) => setEmail((e.target as HTMLInputElement).value)}
    />
  );
}
```

---

### Pitfall #2: Mutating Signal Values Directly

```tsx
const [user, setUser] = createSignal({ name: "Alice", age: 25 });

// ❌ WRONG - mutates object but doesn't trigger updates
user().age = 26;
console.log(user().age); // 26, but UI won't update

// ✅ CORRECT - create new object to trigger reactivity
setUser({ ...user(), age: 26 });

// ✅ ALSO CORRECT - functional update
setUser(prev => ({ ...prev, age: 26 }));
```

**Why it fails:**
- Signals track by reference, not by deep equality
- Mutating the object doesn't change its reference
- Subscribers are never notified

---

### Pitfall #3: Arrays Without Reactive Wrappers

```tsx
const [items, setItems] = createSignal(["a", "b", "c"]);

// ❌ WRONG - map() result is static array
return (
  <ul>
    {items().map(item => <li>{item}</li>)}
  </ul>
);
```

**Why it fails:**
1. `items()` is called once during render
2. `.map()` creates static array of `<li>` elements
3. When `items` changes, the map doesn't re-run

**✅ SOLUTION:**

```tsx
// Option 1: Wrap in arrow function
return (
  <ul>
    {() => items().map(item => <li>{item}</li>)}
  </ul>
);

// Option 2: Use a computed signal
const listItems = useComputed(() => 
  items().map(item => <li>{item}</li>)
);

return <ul>{listItems}</ul>;
```

---

### Pitfall #4: Conditional Rendering Without Functions

```tsx
const [showMessage, setShowMessage] = createSignal(false);

// ❌ WRONG - evaluates once
return (
  <div>
    {showMessage() && <p>Hello!</p>}
  </div>
);
```

**✅ SOLUTION:**

```tsx
// Option 1: Wrap in function
return (
  <div>
    {() => showMessage() && <p>Hello!</p>}
  </div>
);

// Option 2: Use ternary with function
return (
  <div>
    {() => showMessage() ? <p>Hello!</p> : null}
  </div>
);
```

---

### Pitfall #5: Losing Signal Context in Callbacks

```tsx
const [count, setCount] = createSignal(0);

// ❌ WRONG - creates closure over initial value
const handleClick = () => {
  console.log(count); // Logs the function, not the value
};

// ❌ ALSO WRONG - reads value once at creation time
const handleClick = () => {
  const value = count();
  setTimeout(() => {
    console.log(value); // Stale value after 1 second
  }, 1000);
};

// ✅ CORRECT - read signal when needed
const handleClick = () => {
  setTimeout(() => {
    console.log(count()); // Always current value
  }, 1000);
};
```

---

### Pitfall #6: Effects That Don't Track Dependencies

```tsx
const [count, setCount] = createSignal(0);
const [name, setName] = createSignal("Alice");

// ❌ WRONG - effect doesn't track count
useEffect(() => {
  const c = count(); // Read once, then ignored
  console.log("Effect ran");
});

// ✅ CORRECT - reads count inside effect
useEffect(() => {
  console.log("Count is:", count());
  // Effect re-runs every time count() is called
});
```

**The Rule:**
- Effects automatically track any signals read **during execution**
- Reading a signal before/after the effect doesn't create a subscription

---

### Pitfall #7: Type Errors with Event Handlers

```tsx
const [value, setValue] = createSignal("");

// ❌ WRONG - TypeScript error: Property 'value' does not exist on type 'EventTarget'
<input onInput={(e) => setValue(e.target.value)} />

// ✅ CORRECT - type cast
<input onInput={(e) => setValue((e.target as HTMLInputElement).value)} />

// ✅ ALSO CORRECT - use currentTarget
<input onInput={(e) => setValue(e.currentTarget.value)} />
```

---

## Advanced Patterns

### Computed Signals

Derive values from other signals:

```tsx
const [firstName, setFirstName] = createSignal("John");
const [lastName, setLastName] = createSignal("Doe");

// Automatically recomputes when either signal changes
const fullName = useComputed(() => `${firstName()} ${lastName()}`);

console.log(fullName()); // "John Doe"
setFirstName("Jane");
console.log(fullName()); // "Jane Doe"
```

### Batched Updates

Multiple signal updates in the same function execute synchronously but effects only run once:

```tsx
const [count, setCount] = createSignal(0);
const [multiplier, setMultiplier] = createSignal(2);

useEffect(() => {
  console.log("Result:", count() * multiplier());
  // Runs once per batch, not per update
});

// This triggers the effect only ONCE
function updateBoth() {
  setCount(5);
  setMultiplier(3);
}
```

### Memos vs Computed

```tsx
// useComputed - reactive, tracks dependencies
const double = useComputed(() => count() * 2);

// useMemo (from React compat) - manual dependencies
const double = useMemo(() => count() * 2, [count()]);
// ⚠️ useMemo requires explicit deps, useComputed doesn't
```

**Recommendation:** Use `useComputed` for native MaterialThing code.

---

## Performance Best Practices

### 1. Don't Over-Signal

```tsx
// ❌ BAD - too granular
const [userFirstName, setUserFirstName] = createSignal("");
const [userLastName, setUserLastName] = createSignal("");
const [userAge, setUserAge] = createSignal(0);
const [userEmail, setUserEmail] = createSignal("");

// ✅ GOOD - appropriate grouping
const [user, setUser] = createSignal({
  firstName: "",
  lastName: "",
  age: 0,
  email: ""
});
```

### 2. Avoid Unnecessary Computations

```tsx
// ❌ BAD - recalculates on every render
function Component() {
  const [items, setItems] = createSignal([1,2,3,4,5]);
  
  return (
    <ul>
      {() => items().map(i => <li>{i * 2}</li>)}
    </ul>
  );
}

// ✅ BETTER - computed once
function Component() {
  const [items, setItems] = createSignal([1,2,3,4,5]);
  const doubled = useComputed(() => items().map(i => i * 2));
  
  return (
    <ul>
      {() => doubled().map(i => <li>{i}</li>)}
    </ul>
  );
}
```

### 3. Use Keys for Dynamic Lists

```tsx
const [items, setItems] = createSignal([
  { id: 1, text: "Item 1" },
  { id: 2, text: "Item 2" }
]);

// ✅ GOOD - keys help with reconciliation
return (
  <ul>
    {() => items().map(item => (
      <li key={item.id}>{item.text}</li>
    ))}
  </ul>
);
```

---

## Debugging Tips

### 1. Check If Signal Is Being Called

```tsx
const [count, setCount] = createSignal(0);

// Add logging
console.log("Signal value:", count());
console.log("Signal function:", count);
console.log("Is function:", typeof count === "function");
```

### 2. Track Effect Executions

```tsx
useEffect(() => {
  console.log("[EFFECT] Count changed to:", count());
  console.trace(); // See the call stack
});
```

### 3. Verify Reactive Bindings

```tsx
// Check if attribute is reactive
<input 
  value={text} 
  ref={(el) => {
    console.log("Initial value:", el.value);
    setTimeout(() => {
      console.log("Value after 1s:", el.value);
    }, 1000);
  }}
/>
```

### 4. Common Error Messages

**"Cannot read property 'value' of undefined"**
- You're calling the signal but it returned `undefined`
- Check if the signal was initialized

**"X is not a function"**
- You're trying to call something that isn't a signal
- Check if you forgot to create the signal

**"Maximum call stack size exceeded"**
- You have circular dependencies in effects
- An effect is updating a signal it's tracking

---

## Quick Reference

### ✅ DO

```tsx
// Pass signals to reactive attributes
<input value={signal} />

// Call signals in effects
useEffect(() => console.log(signal()));

// Wrap dynamic content in functions
<div>{() => signal() ? "yes" : "no"}</div>

// Create new objects/arrays for updates
setItems([...items(), newItem]);

// Use computed for derived values
const total = useComputed(() => items().reduce((a,b) => a + b, 0));
```

### ❌ DON'T

```tsx
// Call signals in JSX attributes
<input value={signal()} />

// Mutate signal values directly
signal().property = newValue;

// Forget to wrap dynamic arrays
<ul>{items().map(i => <li>{i}</li>)}</ul>

// Mix up signal functions and values
console.log(signal + 1); // signal is a function!

// Create effects inside loops
items().forEach(item => {
  useEffect(() => {...}); // DON'T!
});
```

---

## Summary

**The Golden Rules:**

1. **Signals are functions** - Always call them with `()` to get the value
2. **Pass signals, not values** - Let the renderer create reactive bindings
3. **Never mutate** - Always create new objects/arrays
4. **Wrap dynamic JSX** - Use arrow functions for reactive rendering
5. **Effects track automatically** - No manual dependency arrays needed

Master these concepts and you'll write performant, reactive MaterialThing applications with ease!
