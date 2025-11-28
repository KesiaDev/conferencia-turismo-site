import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import App from "./App";
import "./i18n";
import "./index.css";

// RAILWAY DEPLOY FIX - FORCE REBUILD NO CACHE
// Timestamp: 2025-01-27 - FORCE DEPLOY SITE UPDATE
console.log("🚀 RAILWAY FORCE DEPLOY - SITE UPDATE -", new Date().toISOString());

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </HelmetProvider>
  </React.StrictMode>
);

// FORCE REBUILD TRIGGER - RAILWAY DEPLOY FIX
