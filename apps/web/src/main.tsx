import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import App from "./App";
import "./i18n";
import "./index.css";

// RAILWAY DEPLOY FIX - FORCE REBUILD
console.log("🚀 RAILWAY DEPLOY FIX - FORCE REBUILD");

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
