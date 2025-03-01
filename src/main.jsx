import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./Context/AuthContext"; // ✅ FIXED IMPORT

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <AuthProvider> {/* ✅ Wraps App with AuthProvider */}
            <BrowserRouter> {/* ✅ Keeps Router only in main.jsx */}
                <App />
            </BrowserRouter>
        </AuthProvider>
    </React.StrictMode>
);
