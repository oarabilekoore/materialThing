
import h from "../package/core/html-elements.ts"
import css from "../package/core/css-manager.ts"
import Button from "../package/ui/button.ts"

function App() {
  const page = h.Div()
  page.classList.add(css({
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh"
  }), 'dark')

  Button({
    parent: page,
    variant: "filled",
    text: "Hello World"
  })
  return page;
}

document.getElementById("app")?.appendChild(App())
