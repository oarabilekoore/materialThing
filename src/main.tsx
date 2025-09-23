import css from "@core/css-manager";
import Button from "@ui/button";

function App() {
  return (
    <div
      class={
        css({
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }) + " dark"
      }
    >
      <Button variant="outlined" shape="pill" size="lg" text="Hello World" />
    </div>
  );
}

document.getElementById("app")?.appendChild(<App />);
