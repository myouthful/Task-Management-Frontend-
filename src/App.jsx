import React, { useContext } from "react";
import { Routes, Route } from "react-router-dom";
import { AuthContext } from "./Context/AuthContext"; // ✅ FIXED IMPORT
import Sidebar from "./components/sidebar";
import TopBar from "./components/topbar";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import AdminDashboard from "./pages/AdminDashboard";
import InternDashboard from "./pages/InternDashboard";
import ProtectedRoute from "./routes/ProtectedRoute";
import "./styles/styles.css"; 

function App() {
    const { user } = useContext(AuthContext);

    return (
        <>
            <TopBar />
            <div className="flex overflow-y-hidden">
                {user && <Sidebar />}
                <div>
                    <Routes>
                        <Route path="/" element={<Login />} />
                        <Route path="/signup" element={<Signup />} />
                        <Route path="/admin" element={<ProtectedRoute element={<AdminDashboard />} allowedRoles={["admin"]} />} />
                        <Route path="/intern" element={<ProtectedRoute element={<InternDashboard />} allowedRoles={["intern"]} />} />
                    </Routes>
                </div>
            </div>
        </>
    );
}

export default App;




