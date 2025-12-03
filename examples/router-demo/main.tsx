import {
  Routes,
  Route,
  Link,
  useParams,
  useNavigate,
  useLocation,
} from "../../packages/core";

// --- 1. Home Page ---
function HomePage() {
  const navigate = useNavigate();

  return (
    <div class="page">
      <h1>Home</h1>
      <p>Welcome! Try these dynamic routes:</p>
      <ul>
        <li>
          <Link to="/user/1">User 1 (Alice)</Link>
        </li>
        <li>
          <Link to="/user/42">User 42 (Bob)</Link>
        </li>
        <li>
          <Link to="/user/100">User 100 (Charlie)</Link>
        </li>
      </ul>

      <hr style="margin: 20px 0; border: 0; border-top: 1px solid #ddd;" />

      <h3>Programmatic Navigation</h3>
      <p>Click below to navigate with hidden state:</p>
      <button
        style="padding: 10px 20px; cursor: pointer; background: #007bff; color: white; border: none; border-radius: 4px;"
        onclick={() =>
          navigate("/dashboard", { isAdmin: true, timestamp: Date.now() })
        }
      >
        Go to Dashboard (as Admin)
      </button>
    </div>
  );
}

// --- 2. User Profile (Dynamic Params) ---
function UserProfile() {
  const params = useParams(); // Returns a Signal

  return (
    <div class="page">
      <h1>User Profile</h1>
      {/* We use a function to access the signal value reactively */}
      <p style="font-size: 1.2rem;">
        Viewing Profile ID: <strong>{() => params().id}</strong>
      </p>
      <p>
        <Link to="/">← Back to Home</Link>
      </p>
    </div>
  );
}

// --- 3. Dashboard (History State) ---
function Dashboard() {
  const location = useLocation(); // Returns { pathname, state } signals

  return (
    <div class="page" style="background: #e8f5e9;">
      <h1>Dashboard</h1>
      <p>
        This page checks <code>history.state</code>.
      </p>

      <div style="background: white; padding: 1rem; border-radius: 4px; border: 1px solid #c8e6c9;">
        <strong>Received State:</strong>
        <pre>{() => JSON.stringify(location.state(), null, 2)}</pre>
      </div>

      <p>
        {() =>
          location.state()?.isAdmin
            ? "✅ You have Admin privileges."
            : "❌ Standard User Access."
        }
      </p>

      <Link to="/">Logout</Link>
    </div>
  );
}

// --- 4. Main App Layout ---
function App() {
  return (
    <div>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/dashboard">Dashboard</Link>
      </nav>

      <Routes>
        <Route path="/" component={HomePage} />
        <Route path="/dashboard" component={Dashboard} />
        {/* The :id segment will be captured by the router */}
        <Route path="/user/:id" component={UserProfile} />
      </Routes>
    </div>
  );
}

// Mount
const root = document.getElementById("app");
if (root) {
  root.innerHTML = ""; // Clear existing content
  root.appendChild(App());
}
