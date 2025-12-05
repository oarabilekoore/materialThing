import { createSignal, render, css } from "@materialthing/core";

// Styles
const containerClass = css({
  maxWidth: "600px",
  margin: "50px auto",
  padding: "30px",
  backgroundColor: "#fff",
  borderRadius: "12px",
  boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
  fontFamily: "system-ui, -apple-system, sans-serif",
});

const titleClass = css({
  fontSize: "2rem",
  fontWeight: "700",
  marginBottom: "20px",
  color: "#333",
});

const inputClass = css({
  width: "100%",
  padding: "12px",
  fontSize: "1rem",
  border: "2px solid #ddd",
  borderRadius: "8px",
  outline: "none",
  boxSizing: "border-box",
  transition: "border-color 0.2s",
  "&:focus": {
    borderColor: "#6366f1",
  },
});

const buttonClass = css({
  width: "100%",
  marginTop: "10px",
  padding: "12px",
  fontSize: "1rem",
  fontWeight: "600",
  backgroundColor: "#6366f1",
  color: "white",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
  transition: "background-color 0.2s",
  "&:hover": {
    backgroundColor: "#4f46e5",
  },
  "&:active": {
    backgroundColor: "#4338ca",
  },
});

const listClass = css({
  listStyle: "none",
  padding: 0,
  marginTop: "20px",
});

const listItemClass = css({
  padding: "12px",
  backgroundColor: "#f8f9fa",
  borderRadius: "8px",
  marginBottom: "8px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  transition: "background-color 0.2s",
  "&:hover": {
    backgroundColor: "#e9ecef",
  },
});

const deleteButtonClass = css({
  padding: "6px 12px",
  fontSize: "0.875rem",
  backgroundColor: "#ef4444",
  color: "white",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
  transition: "background-color 0.2s",
  "&:hover": {
    backgroundColor: "#dc2626",
  },
});

const emptyClass = css({
  textAlign: "center",
  color: "#999",
  padding: "30px",
  fontSize: "1rem",
});

function TodoList() {
  const [todos, setTodos] = createSignal<string[]>([]);
  const [input, setInput] = createSignal("");

  const addTodo = () => {
    const value = input().trim();
    if (value) {
      setTodos([...todos(), value]);
      setInput("");
    }
  };

  const deleteTodo = (index: number) => {
    setTodos(todos().filter((_, i) => i !== index));
  };

  const handleKeyPress = (e: KeyboardEvent) => {
    if (e.key === "Enter") {
      addTodo();
    }
  };

  return (
    <div className={containerClass}>
      <h1 className={titleClass}>Todo List</h1>

      <div>
        {/* CRITICAL: Pass signal itself, not signal() */}
        <input
          className={inputClass}
          value={input}
          onInput={(e) => setInput((e.target as HTMLInputElement).value)}
          onKeyPress={handleKeyPress}
          placeholder="Enter a todo..."
        />
        <button className={buttonClass} onClick={addTodo}>
          Add Todo
        </button>
      </div>

      {/* Render list reactively */}
      {() => {
        const todoList = todos();

        if (todoList.length === 0) {
          return <div className={emptyClass}>No todos yet. Add one above!</div>;
        }

        return (
          <ul className={listClass}>
            {todoList.map((todo, index) => (
              <li className={listItemClass} key={index}>
                <span>{todo}</span>
                <button
                  className={deleteButtonClass}
                  onClick={() => deleteTodo(index)}
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        );
      }}
    </div>
  );
}

const root = document.getElementById("app");
if (root) {
  render(<TodoList />, root);
}
