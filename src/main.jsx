import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import InterPage from "./pages/internpage.jsx";
import AdminPage from "./pages/admin.jsx";
import StaffPage from "./pages/staffpage.jsx";
import SignUpPage from "./pages/Signup.jsx";
import LoginPage from "./pages/loginpage.jsx";
import GeneralStaffPage from "./pages/generalstaff.jsx";
import "./index.css";



ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignUpPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/intern" element={<InterPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/staff" element={<StaffPage />} />
        <Route path="/generalstaff" element={<GeneralStaffPage />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>);