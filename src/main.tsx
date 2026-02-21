// Block injected wallets in Base Mini App
if (typeof window !== "undefined") {
  // @ts-ignore
  window.ethereum = undefined;
  // @ts-ignore
  window.web3 = undefined;
}
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(<App />);
