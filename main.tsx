import { createSignal, useComputed, css, keyframes } from "@materialthing/core";

// Animations
const float = keyframes({
  "0%, 100%": { transform: "translateY(0px)" },
  "50%": { transform: "translateY(-20px)" },
});

const glow = keyframes({
  "0%, 100%": { boxShadow: "0 0 20px rgba(99, 102, 241, 0.5)" },
  "50%": {
    boxShadow:
      "0 0 40px rgba(99, 102, 241, 0.8), 0 0 60px rgba(99, 102, 241, 0.6)",
  },
});

const slideIn = keyframes({
  "0%": { opacity: 0, transform: "translateX(-50px)" },
  "100%": { opacity: 1, transform: "translateX(0)" },
});

const scaleIn = keyframes({
  "0%": { opacity: 0, transform: "scale(0.8)" },
  "100%": { opacity: 1, transform: "scale(1)" },
});

const gradientShift = keyframes({
  "0%": { backgroundPosition: "0% 50%" },
  "50%": { backgroundPosition: "100% 50%" },
  "100%": { backgroundPosition: "0% 50%" },
});

// Styles
const bodyClass = css({
  margin: 0,
  padding: 0,
  fontFamily:
    "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  background: "#0a0a0f",
  minHeight: "100vh",
  color: "#fff",
  overflow: "x-hidden",
});

const containerClass = css({
  maxWidth: "1400px",
  margin: "0 auto",
  padding: "20px",
});

const heroClass = css({
  minHeight: "100vh",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  position: "relative",
  textAlign: "center",
  padding: "40px 20px",
});

const backgroundGradient = css({
  position: "fixed",
  top: "-50%",
  left: "-50%",
  width: "200%",
  height: "200%",
  background:
    "radial-gradient(circle at 20% 50%, rgba(99, 102, 241, 0.15) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(139, 92, 246, 0.15) 0%, transparent 50%)",
  animation: `${gradientShift} 20s ease infinite`,
  zIndex: 0,
  pointerEvents: "none",
});

const logoClass = css({
  fontSize: "5rem",
  fontWeight: "900",
  marginBottom: "20px",
  background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #ec4899 100%)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  backgroundSize: "200% 200%",
  animation: `${gradientShift} 3s ease infinite, ${scaleIn} 0.8s ease-out`,
  letterSpacing: "-0.05em",
  position: "relative",
  zIndex: 1,
});

const taglineClass = css({
  fontSize: "1.8rem",
  fontWeight: "300",
  marginBottom: "30px",
  color: "#a5b4fc",
  animation: `${slideIn} 0.8s ease-out 0.2s both`,
  position: "relative",
  zIndex: 1,
  maxWidth: "800px",
});

const subtitleClass = css({
  fontSize: "1.1rem",
  color: "#94a3b8",
  maxWidth: "700px",
  margin: "0 auto 50px",
  lineHeight: "1.8",
  animation: `${slideIn} 0.8s ease-out 0.4s both`,
  position: "relative",
  zIndex: 1,
});

const ctaButtonClass = css({
  display: "inline-block",
  padding: "18px 48px",
  fontSize: "1.1rem",
  fontWeight: "700",
  background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
  color: "white",
  textDecoration: "none",
  borderRadius: "12px",
  border: "none",
  cursor: "pointer",
  transition: "all 0.3s ease",
  boxShadow: "0 10px 40px rgba(99, 102, 241, 0.4)",
  animation: `${scaleIn} 0.8s ease-out 0.6s both, ${glow} 2s ease-in-out infinite`,
  position: "relative",
  zIndex: 1,
  "&:hover": {
    transform: "translateY(-5px) scale(1.05)",
    boxShadow: "0 20px 60px rgba(99, 102, 241, 0.6)",
  },
});

const sectionClass = css({
  padding: "120px 20px",
  position: "relative",
  zIndex: 1,
});

const sectionTitleClass = css({
  fontSize: "3.5rem",
  fontWeight: "800",
  textAlign: "center",
  marginBottom: "70px",
  background: "linear-gradient(135deg, #fff 0%, #a5b4fc 100%)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  letterSpacing: "-0.03em",
});

const featuresGridClass = css({
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
  gap: "40px",
  marginBottom: "80px",
});

const featureCardClass = css({
  background:
    "linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(139, 92, 246, 0.1) 100%)",
  padding: "40px 30px",
  borderRadius: "24px",
  border: "1px solid rgba(99, 102, 241, 0.2)",
  transition: "all 0.4s ease",
  position: "relative",
  overflow: "hidden",
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background:
      "radial-gradient(circle at top left, rgba(99, 102, 241, 0.15), transparent 60%)",
    opacity: 0,
    transition: "opacity 0.4s ease",
  },
  "&:hover": {
    transform: "translateY(-10px)",
    border: "1px solid rgba(99, 102, 241, 0.5)",
    boxShadow: "0 20px 60px rgba(99, 102, 241, 0.3)",
  },
  "&:hover::before": {
    opacity: 1,
  },
});

const featureIconClass = css({
  fontSize: "3.5rem",
  marginBottom: "20px",
  display: "block",
  filter: "drop-shadow(0 4px 12px rgba(99, 102, 241, 0.4))",
  position: "relative",
  zIndex: 1,
});

const featureHeadingClass = css({
  fontSize: "1.5rem",
  fontWeight: "700",
  marginBottom: "15px",
  color: "#e2e8f0",
  position: "relative",
  zIndex: 1,
});

const featureTextClass = css({
  color: "#94a3b8",
  lineHeight: "1.7",
  fontSize: "1rem",
  position: "relative",
  zIndex: 1,
});

const examplesGridClass = css({
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))",
  gap: "50px",
  marginBottom: "80px",
});

const exampleCardClass = css({
  background: "rgba(15, 15, 25, 0.8)",
  borderRadius: "28px",
  overflow: "hidden",
  border: "1px solid rgba(99, 102, 241, 0.2)",
  transition: "all 0.4s ease",
  backdropFilter: "blur(10px)",
  "&:hover": {
    transform: "translateY(-12px) scale(1.02)",
    border: "1px solid rgba(99, 102, 241, 0.5)",
    boxShadow: "0 30px 80px rgba(99, 102, 241, 0.4)",
  },
});

const exampleImageClass = css({
  width: "100%",
  height: "300px",
  background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #ec4899 100%)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "6rem",
  position: "relative",
  overflow: "hidden",
  "&::before": {
    content: '""',
    position: "absolute",
    width: "200%",
    height: "200%",
    background:
      "radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 60%)",
    animation: `${float} 6s ease-in-out infinite`,
  },
});

const exampleContentClass = css({
  padding: "35px",
});

const exampleTitleClass = css({
  fontSize: "1.8rem",
  fontWeight: "700",
  marginBottom: "15px",
  color: "#e2e8f0",
});

const exampleDescClass = css({
  color: "#94a3b8",
  lineHeight: "1.8",
  marginBottom: "25px",
  fontSize: "1rem",
});

const exampleLinkClass = css({
  display: "inline-flex",
  alignItems: "center",
  gap: "10px",
  padding: "14px 32px",
  background: "rgba(99, 102, 241, 0.2)",
  color: "#a5b4fc",
  textDecoration: "none",
  borderRadius: "10px",
  fontWeight: "600",
  border: "1px solid rgba(99, 102, 241, 0.3)",
  transition: "all 0.3s ease",
  "&:hover": {
    background: "rgba(99, 102, 241, 0.3)",
    color: "#fff",
    border: "1px solid rgba(99, 102, 241, 0.5)",
    transform: "translateX(5px)",
  },
});

const techStackClass = css({
  background:
    "linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(139, 92, 246, 0.1) 100%)",
  borderRadius: "28px",
  padding: "60px 40px",
  border: "1px solid rgba(99, 102, 241, 0.2)",
  backdropFilter: "blur(10px)",
});

const techGridClass = css({
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
  gap: "20px",
});

const techBadgeClass = css({
  background: "rgba(99, 102, 241, 0.15)",
  border: "1px solid rgba(99, 102, 241, 0.3)",
  color: "#a5b4fc",
  padding: "16px 24px",
  borderRadius: "12px",
  fontWeight: "600",
  fontSize: "0.95rem",
  textAlign: "center",
  transition: "all 0.3s ease",
  "&:hover": {
    background: "rgba(99, 102, 241, 0.25)",
    border: "1px solid rgba(99, 102, 241, 0.5)",
    color: "#fff",
    transform: "scale(1.05)",
  },
});

const footerClass = css({
  textAlign: "center",
  padding: "80px 20px 40px",
  borderTop: "1px solid rgba(99, 102, 241, 0.1)",
  position: "relative",
  zIndex: 1,
});

const footerTextClass = css({
  color: "#64748b",
  fontSize: "1rem",
  marginBottom: "15px",
});

const footerLinkClass = css({
  color: "#a5b4fc",
  textDecoration: "none",
  fontWeight: "600",
  borderBottom: "2px solid rgba(165, 180, 252, 0.3)",
  transition: "all 0.3s ease",
  "&:hover": {
    color: "#fff",
    borderBottomColor: "#fff",
  },
});

// Components
function FeatureCard({ icon, title, description }) {
  return (
    <div className={featureCardClass}>
      <span className={featureIconClass}>{icon}</span>
      <h3 className={featureHeadingClass}>{title}</h3>
      <p className={featureTextClass}>{description}</p>
    </div>
  );
}

function ExampleCard({ icon, title, description, link }) {
  return (
    <div className={exampleCardClass}>
      <div className={exampleImageClass}>
        <span style={{ position: "relative", zIndex: 1 }}>{icon}</span>
      </div>
      <div className={exampleContentClass}>
        <h3 className={exampleTitleClass}>{title}</h3>
        <p className={exampleDescClass}>{description}</p>
        <a href={link} className={exampleLinkClass}>
          <span>Explore Demo</span>
          <span>→</span>
        </a>
      </div>
    </div>
  );
}

function TechBadge({ children }) {
  return <div className={techBadgeClass}>{children}</div>;
}

// Main App
function App() {
  return (
    <div className={bodyClass}>
      <div className={backgroundGradient}></div>

      <div className={containerClass}>
        <section className={heroClass}>
          <h1 className={logoClass}>MaterialThing</h1>
          <p className={taglineClass}>The Future of Reactive UI Development</p>
          <p className={subtitleClass}>
            Build lightning-fast web applications with fine-grained reactivity,
            zero VDOM overhead, and battle-tested CSS-in-JS. Experience the
            power of signals-based state management.
          </p>
          <a href="#examples" className={ctaButtonClass}>
            Explore Examples
          </a>
        </section>

        <section className={sectionClass}>
          <h2 className={sectionTitleClass}>Why MaterialThing?</h2>
          <div className={featuresGridClass}>
            <FeatureCard
              icon="⚡"
              title="Blazing Performance"
              description="Direct DOM updates without Virtual DOM diffing. Fine-grained reactivity means only changed nodes re-render."
            />
            <FeatureCard
              icon="🎨"
              title="Elegant Styling"
              description="Built-in CSS-in-JS with automatic scoping, collision-free class names, and powerful keyframe animations."
            />
            <FeatureCard
              icon="🔧"
              title="Type-Safe DX"
              description="Written entirely in TypeScript. Get IntelliSense, type checking, and refactoring support out of the box."
            />
            <FeatureCard
              icon="🎯"
              title="Surgical Updates"
              description="Signals track dependencies automatically. State changes trigger precise, minimal DOM updates."
            />
            <FeatureCard
              icon="🧩"
              title="Bring Your UI"
              description="Use Material Web Components, shadcn/ui, or build your own. MaterialThing is just the foundation."
            />
            <FeatureCard
              icon="🚀"
              title="Modern Tooling"
              description="Custom JSX runtime, browser router, and reactive primitives. Everything you need in one framework."
            />
          </div>
        </section>

        <section className={sectionClass} id="examples">
          <h2 className={sectionTitleClass}>Live Examples</h2>
          <div className={examplesGridClass}>
            <ExampleCard
              icon="🎨"
              title="Reactivity & Styling"
              description="Dive deep into signals, computed values, and reactive effects. See CSS-in-JS magic with ripple effects, hover states, and smooth animations."
              link="/examples/reactivity-css/"
            />
            <ExampleCard
              icon="🧭"
              title="Client-Side Router"
              description="Full-featured SPA routing with dynamic params, nested routes, and history state. Zero page reloads, maximum performance."
              link="/examples/router-demo/"
            />
          </div>
        </section>

        <section className={sectionClass}>
          <div className={techStackClass}>
            <h2 className={sectionTitleClass} style={{ marginBottom: "40px" }}>
              Powered By Modern Web Standards
            </h2>
            <div className={techGridClass}>
              <TechBadge>TypeScript</TechBadge>
              <TechBadge>Fine-Grained Reactivity</TechBadge>
              <TechBadge>CSS-in-JS</TechBadge>
              <TechBadge>Zero VDOM</TechBadge>
              <TechBadge>JSX Runtime</TechBadge>
              <TechBadge>SPA Router</TechBadge>
              <TechBadge>Signals</TechBadge>
              <TechBadge>ESM</TechBadge>
            </div>
          </div>
        </section>

        <footer className={footerClass}>
          <p className={footerTextClass}>
            Crafted with passion by Oarabile Koore
          </p>
          <p className={footerTextClass}>
            <a
              href="https://github.com/oarabilekoore/materialThing"
              target="_blank"
              className={footerLinkClass}
            >
              Star on GitHub
            </a>
            {" · "}
            <span style={{ color: "#475569" }}>MIT License</span>
            {" · "}
            <span style={{ color: "#475569" }}>v1.0.0</span>
          </p>
        </footer>
      </div>
    </div>
  );
}

// Mount the app
const root = document.getElementById("app");
if (root) {
  root.appendChild(App());
}
