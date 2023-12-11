import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import "./index.css";
import router from "./routing/routes.tsx";
import { ThemeContextProvider } from "./context/ThemeContext.tsx";
import { AuthContextProvider } from "./context/AuthContext.tsx";
import { ChatContextProvider } from "./context/ChatContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthContextProvider>
      <ChatContextProvider>
        <ThemeContextProvider>
          <RouterProvider router={router} />
        </ThemeContextProvider>
      </ChatContextProvider>
    </AuthContextProvider>
  </React.StrictMode>,
);
