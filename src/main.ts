import h from "../package/html-elements.ts"
import css from "../package/css-manager.ts"


function App() {
  const page = h.Div()
  page.classList.add(css({
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh"
  }))

  h.Button(page, "Hello World")
  return page;
}

document.getElementById("app")?.appendChild(App())
