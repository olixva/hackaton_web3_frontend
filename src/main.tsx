import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import { UserProvider } from "./contexts/UserContext";
import "./index.css";

// Renders application in DOM with StrictMode and providers
ReactDOM.createRoot(document.getElementById("root")!).render(
  // StrictMode for detecting potential issues in development
  <React.StrictMode>
    {/* User context provider for global access */}
    <UserProvider>
      {/* Main router managing navigation */}
      <RouterProvider router={router} />
    </UserProvider>
  </React.StrictMode>
);
