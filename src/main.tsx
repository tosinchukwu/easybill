import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

// 👇 ADD THIS LINE
import { MiniApp } from "@base-org/sdk";

const root = createRoot(document.getElementById("root")!);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// 👇 REQUIRED FOR BASE MINI APP
MiniApp.ready();
