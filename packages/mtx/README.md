# materialThing Compiler

This is the compiler package for materialThing - it allows for compilation for the materialThing jsx language extension (.mtx).

## Defining The .mtx Language Format

The mtx format is an addition and modifications on top of JSX, providing a more concise and expressive syntax for defining components and their properties. It also includes support for advanced features such as conditional rendering, looping, and event handling.

### Syntax Overview

#### Component Definition

This is inspired by the Ripple Framework.

```javascript
export component Input(props: { type: string, value: string, onChange: (value: string) => void }) {
  <input type={props.type} value={props.value} onChange={(e) => props.onChange(e.target.value)} />
}

// Instead of using export function we use export component
// This allows us to export multiple components in a single
// file and ducking the return keyword allows us to write less code.
```

#### Logic Statements

Also inspired by the Ripple Framework.

##### If Statement
```javascript
if (condition) {
  <Input />
} else {
  <SignInPage />
}
```

##### For loops
```javascript
for(let i = 0; i < 10; i++) {
  <div>{i}</div>
}
```
