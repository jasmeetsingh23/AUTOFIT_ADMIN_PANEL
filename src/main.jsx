import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom"; // Import BrowserRouter
import "./index.css";
import App from "./App.jsx";

// Wrap your app with BrowserRouter to provide routing context
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      {" "}
      {/* Wrap your App component with BrowserRouter */}
      <App />
    </BrowserRouter>
  </StrictMode>
);
