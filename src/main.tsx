import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

const root = document.getElementById("root");
const fallback = document.getElementById("base-fallback");

if (fallback) fallback.remove();

if (root) {
  createRoot(root).render(<App />);
}
