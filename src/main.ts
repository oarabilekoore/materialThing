import h from "../packages/core/html-elements.ts";
import css from "../packages/core/css-manager.ts";
import Button from "../packages/ui/button.ts";
function App() {
  const page = h.Div();
  page.classList.add(
    css({
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
    }),
    "dark",
  );

  Button({
    parent: page,
    variant: "outlined",
    shape: "pill",
    size: "lg",
    text: "Hello World",
  });
  return page;
}

document.getElementById("app")?.appendChild(App());
