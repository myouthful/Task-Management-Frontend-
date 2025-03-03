import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUpPage from "./pages/signup.jsx";
import LoginPage from "./pages/loginpage.jsx";

import "./index.css";
import InterPage from "./pages/internpage.jsx";
import AdminPage from "./pages/admin.jsx";
import StaffPage from "./pages/staffpage.jsx";


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignUpPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/intern" element={<InterPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/staff" element={<StaffPage />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>);