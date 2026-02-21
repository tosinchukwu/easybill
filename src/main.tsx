if (typeof window !== "undefined" && isBaseApp()) {
  // Prevent eager wallet listeners from initializing
  // but do NOT fully delete ethereum
  try {
    Object.defineProperty(window, "ethereum", {
      configurable: true,
      get() {
        return undefined;
      }
    });
  } catch {}
}
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

const rootEl = document.getElementById("root");

if (rootEl) {
  requestAnimationFrame(() => {
    createRoot(rootEl).render(<App />);
  });
}
// import { createRoot } from "react-dom/client";
// import App from "./App.tsx";
// import "./index.css";

// createRoot(document.getElementById("root")!).render(<App />);
