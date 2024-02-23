import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";

// Render the root component of the application
ReactDOM.createRoot(document.getElementById("root")).render(
  // Wrap the entire application in React StrictMode for additional development checks and warnings
  <React.StrictMode>
    {/* Render the main application component */}
    <App />
  </React.StrictMode>
);
