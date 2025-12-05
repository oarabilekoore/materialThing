import {
  BrowserRouter,
  Route,
  Link,
  useParams,
  useNavigate,
  useLocation,
  render,
} from "@materialthing/core";

// Base path constant for easier maintenance
const BASE_PATH = "/examples/router-demo";

// --- 1. Home Page ---
function HomePage() {
  const navigate = useNavigate();

  return (
    <div class="page">
      <h1>Home</h1>
      <p>Welcome! Try these dynamic routes:</p>
      <ul>
        <li>
          <Link to={`${BASE_PATH}/user/1`}>User 1 (Alice)</Link>
        </li>
        <li>
          <Link to={`${BASE_PATH}/user/42`}>User 42 (Bob)</Link>
        </li>
        <li>
          <Link to={`${BASE_PATH}/user/100`}>User 100 (Charlie)</Link>
        </li>
      </ul>

      <hr style="margin: 20px 0; border: 0; border-top: 1px solid #ddd;" />

      <h3>Programmatic Navigation</h3>
      <p>Click below to navigate with hidden state:</p>
      <button
        style="padding: 10px 20px; cursor: pointer; background: #007bff; color: white; border: none; border-radius: 4px;"
        onClick={() =>
          navigate(`${BASE_PATH}/dashboard`, {
            isAdmin: true,
            timestamp: Date.now(),
          })
        }
      >
        Go to Dashboard (as Admin)
      </button>
    </div>
  );
}

// --- 2. User Profile (Dynamic Params) ---
function UserProfile() {
  const params = useParams();

  return (
    <div class="page">
      <h1>User Profile</h1>

      {/* Debug info */}
      <div style="background: #f0f0f0; padding: 10px; border-radius: 5px; margin-bottom: 20px;">
        <strong>Debug:</strong> params = {() => JSON.stringify(params())}
      </div>

      <p style="font-size: 1.2rem;">
        Viewing Profile ID: <strong>{() => params().id || "NO ID"}</strong>
      </p>

      <p>
        <Link to={BASE_PATH}>← Back to Home</Link>
      </p>
    </div>
  );
}

// --- 3. Dashboard (History State) ---
function Dashboard() {
  const location = useLocation();

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

      <Link to={BASE_PATH}>Logout</Link>
    </div>
  );
}

// --- 4. Main App Layout ---
function App() {
  return (
    <div>
      <nav>
        <Link to={BASE_PATH}>Home</Link>
        <Link to={`${BASE_PATH}/dashboard`}>Dashboard</Link>
        <Link to={`${BASE_PATH}/user/42`}>User 42</Link>
      </nav>

      <BrowserRouter>
        <Route path={BASE_PATH} component={HomePage} />
        <Route path={`${BASE_PATH}/dashboard`} component={Dashboard} />
        <Route path={`${BASE_PATH}/user/:id`} component={UserProfile} />
      </BrowserRouter>
    </div>
  );
}

// Mount
const root = document.getElementById("app");
if (root) {
  render(<App />, root);
}
