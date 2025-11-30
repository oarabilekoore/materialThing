import { css, signal } from "@materialthing/core";
import { Button } from "@materialthing/ui";

function App() {
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
        <Button variant="filled" size="lg" text="Filled Button" />

        <Button variant="outlined" size="lg" text="Outlined Button" />

        <Button variant="tonal" size="lg" text="Tonal Button" />

        <Button variant="text" size="lg" text="Text Button" />

        <Button variant="elevated" size="lg" text="Elevated Button" />
      </div>

      <div
        style={{
          display: "flex",
          gap: "12px",
          flexWrap: "wrap",
          alignItems: "center",
        }}
      >
        <Button variant="filled" size="sm" text="Small" />

        <Button variant="filled" size="md" text="Medium" />

        <Button variant="filled" size="lg" text="Large" />
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
