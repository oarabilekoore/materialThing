// src/main.tsx
import css from "../packages/core/css-manager";
import Button from "../packages/ui/button";

function App() {
  const handleClick = () => {
    alert("Button clicked!");
  };

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
        <Button
          variant="filled"
          size="lg"
          text="Filled Button"
          onClick={handleClick}
        />

        <Button
          variant="outlined"
          size="lg"
          text="Outlined Button"
          onClick={handleClick}
        />

        <Button
          variant="tonal"
          size="lg"
          text="Tonal Button"
          onClick={handleClick}
        />

        <Button
          variant="text"
          size="lg"
          text="Text Button"
          onClick={handleClick}
        />

        <Button
          variant="elevated"
          size="lg"
          text="Elevated Button"
          onClick={handleClick}
        />
      </div>

      <div
        style={{
          display: "flex",
          gap: "12px",
          flexWrap: "wrap",
          alignItems: "center",
        }}
      >
        <Button variant="filled" size="sm" text="Small" onClick={handleClick} />

        <Button
          variant="filled"
          size="md"
          text="Medium"
          onClick={handleClick}
        />

        <Button variant="filled" size="lg" text="Large" onClick={handleClick} />
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
