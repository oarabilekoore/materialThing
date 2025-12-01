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
        <Button.Filled variant="filled" size="lg" shape="square">
          Filled
        </Button.Filled>

        <Button.Outlined variant="outlined" size="lg">
          Outlined
        </Button.Outlined>

        <Button.Tonal variant="tonal" size="lg">
          Tonal
        </Button.Tonal>

        <Button.Text variant="text" size="lg">
          Text Button
        </Button.Text>

        <Button.Elevated variant="elevated" size="lg">
          Elevated
        </Button.Elevated>
      </div>

      <div
        style={{
          display: "flex",
          gap: "12px",
          flexWrap: "wrap",
          alignItems: "center",
        }}
      >
        <Button.Filled variant="filled" size="sm">
          Small
        </Button.Filled>

        <Button variant="filled" size="md">
          Medium
        </Button>

        <Button variant="filled" size="lg">
          Large
        </Button>
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
