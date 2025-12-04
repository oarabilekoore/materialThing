import {
  createSignal,
  useComputed,
  css,
  keyframes,
  render,
} from "@materialthing/core";

// Create a simple button component using raw CSS-in-JS
function CustomButton({ children, onClick, variant = "primary" }) {
  const rippleAnim = keyframes({
    to: { transform: "scale(4)", opacity: "0" },
  });

  const baseClass = css({
    position: "relative",
    overflow: "hidden",
    padding: "12px 24px",
    borderRadius: "8px",
    border: "none",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "500",
    transition: "all 200ms cubic-bezier(0.2, 0, 0, 1)",
    "&::before": {
      content: "''",
      position: "absolute",
      inset: "0",
      backgroundColor: "currentColor",
      opacity: "0",
      transition: "opacity 200ms",
    },
    "&:hover::before": {
      opacity: "0.08",
    },
    "&:active::before": {
      opacity: "0.12",
    },
  });

  const primaryClass = css({
    backgroundColor: "#6200ee",
    color: "white",
  });

  const secondaryClass = css({
    backgroundColor: "transparent",
    color: "#6200ee",
    border: "1px solid #6200ee",
  });

  const variantClass = variant === "primary" ? primaryClass : secondaryClass;

  const handleClick = (e: MouseEvent) => {
    // Create ripple effect
    const button = e.currentTarget as HTMLElement;
    const ripple = document.createElement("span");
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);

    const rippleClass = css({
      position: "absolute",
      borderRadius: "50%",
      transform: "scale(0)",
      backgroundColor: "currentColor",
      opacity: "0.3",
      animation: `${rippleAnim} 600ms cubic-bezier(0.2, 0, 0, 1)`,
      pointerEvents: "none",
    });

    ripple.className = rippleClass;
    ripple.style.width = ripple.style.height = `${size}px`;
    ripple.style.left = `${e.clientX - rect.left - size / 2}px`;
    ripple.style.top = `${e.clientY - rect.top - size / 2}px`;

    button.appendChild(ripple);
    ripple.addEventListener("animationend", () => ripple.remove());

    if (onClick) onClick(e);
  };

  return (
    <button className={`${baseClass} ${variantClass}`} onClick={handleClick}>
      {children}
    </button>
  );
}

// Create a card component
function Card({ children, title }) {
  const cardClass = css({
    backgroundColor: "white",
    borderRadius: "12px",
    padding: "24px",
    boxShadow: "0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24)",
    transition: "box-shadow 200ms",
    "&:hover": {
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.12), 0 2px 4px rgba(0, 0, 0, 0.08)",
    },
  });

  const titleClass = css({
    fontSize: "24px",
    fontWeight: "600",
    marginBottom: "16px",
    color: "#1a1a1a",
  });

  return (
    <div className={cardClass}>
      {title && <h2 className={titleClass}>{title}</h2>}
      {children}
    </div>
  );
}

// Main App Component
function App() {
  const [count, setCount] = createSignal(0);
  const [name, setName] = createSignal("World");

  // Computed values automatically update
  const doubleCount = useComputed(() => count() * 2);
  const greeting = useComputed(() => `Hello, ${name()}!`);

  const containerClass = css({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "100vh",
    gap: "24px",
    padding: "20px",
    backgroundColor: "#f5f5f5",
    fontFamily: "system-ui, -apple-system, sans-serif",
  });

  const buttonGroupClass = css({
    display: "flex",
    gap: "12px",
    flexWrap: "wrap",
  });

  const textClass = css({
    fontSize: "18px",
    color: "#333",
  });

  const inputClass = css({
    padding: "10px 16px",
    borderRadius: "8px",
    border: "1px solid #ddd",
    fontSize: "16px",
    outline: "none",
    transition: "border-color 200ms",
    "&:focus": {
      borderColor: "#6200ee",
    },
  });

  return (
    <div className={containerClass}>
      <Card title="MaterialThing Demo">
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <p className={textClass}>
            <strong>{greeting}</strong>
          </p>

          <input
            className={inputClass}
            type="text"
            placeholder="Enter your name"
            value={name()}
            onInput={(e) => setName(e.target.value)}
          />

          <div className={buttonGroupClass}>
            <CustomButton onClick={() => setCount((c) => c + 1)}>
              Count: {count}
            </CustomButton>
            <CustomButton variant="secondary" onClick={() => setCount(0)}>
              Reset
            </CustomButton>
          </div>

          <p className={textClass}>
            Double count: <strong>{doubleCount}</strong>
          </p>
        </div>
      </Card>

      <Card title="Features">
        <ul style={{ lineHeight: "1.8", color: "#555" }}>
          <li>✨ Fine-grained reactivity with signals</li>
          <li>🎨 Built-in CSS-in-JS with scoping</li>
          <li>⚡ Direct DOM manipulation (no VDOM)</li>
          <li>🔧 TypeScript support out of the box</li>
          <li>🎯 Bring your own component library</li>
        </ul>
      </Card>
    </div>
  );
}

// Mount the app
const appElement = document.getElementById("app");
if (appElement) {
  render(<App />, appElement);
} else {
  console.error("Could not find app element");
}
