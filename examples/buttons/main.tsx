import { createSignal, useComputed } from "@materialthing/core";
function App() {
  const [count, setCount] = createSignal(0);

  const doubleCount = useComputed(() => count() * 2);
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        gap: "20px",
        backgroundColor: "var(--md-sys-color-background)",
        color: "var(--md-sys-color-on-background)",
      }}
    >
      <div
        style={{
          display: "flex",
          gap: "12px",
          flexWrap: "wrap",
          alignItems: "center",
        }}
      >
        <button onClick={() => setCount((n) => n + 1)}>Count: {count}</button>
      </div>
    </div>
  );
}

// Mount the app
const appElement = document.getElementById("app");
if (appElement) {
  appElement.appendChild(<App />);
} else {
  console.error("Could not find app element");
}
