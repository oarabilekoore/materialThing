import { Routes, Route, Link } from "@materialthing/core";

// --- Page Components ---

function HomePage() {
  return (
    <div class="page">
      <h1>Home Page</h1>
      <p>Welcome to the MaterialThing Router Demo.</p>
      <p>
        This page was rendered because the URL matches <code>/</code>.
      </p>
    </div>
  );
}

function AboutPage() {
  return (
    <div class="page">
      <h1>About Us</h1>
      <p>We are building a custom framework with a React-like router.</p>
      <p>This content is swapped dynamically without a page reload.</p>
    </div>
  );
}

function ContactPage() {
  return (
    <div class="page">
      <h1>Contact</h1>
      <p>Get in touch with us!</p>
      <button onclick={() => alert("Message Sent!")}>Send Message</button>
    </div>
  );
}

// --- Main App ---

function App() {
  return (
    <div>
      <nav>
        {/* We use Link instead of <a> to avoid reloading */}
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link>
        <Link to="/broken-link">Broken Link</Link>
      </nav>

      {/* The Routes component watches the URL signal and swaps these components */}
      <Routes>
        <Route path="/" component={HomePage} />
        <Route path="/about" component={AboutPage} />
        <Route path="/contact" component={ContactPage} />
      </Routes>
    </div>
  );
}

// Mount the app
const root = document.getElementById("app");
if (root) {
  root.appendChild(App());
}
