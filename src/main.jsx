import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUpPage from "../src/pages/signup";
import LoginPage from "../src/pages/loginpage";

import "./index.css";
import InterPage from "./pages/internpage";
import AdminPage from "./pages/admin";
import StaffPage from "./pages/staffpage";


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