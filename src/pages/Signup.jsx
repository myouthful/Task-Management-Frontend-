import React, { useContext, useState } from "react"; 
import { useNavigate } from "react-router-dom";
import AuthContext from "../Context/AuthContext";

const Signup = () => {
    const { setUser } = useContext(AuthContext); // ✅ Use setUser from context

    const [name, setName] = useState("");
    const [department, setDepartment] = useState("");
    const [role, setRole] = useState(""); 
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();
        
        const userData = { 
            name, 
            department, 
            role: role.trim().toLowerCase(),  
            email, 
            password 
        };

        console.log("📤 Sending signup request:", JSON.stringify(userData));

        try {
            const response = await fetch("http://localhost:5001/api/auth/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(userData),
            });

            const data = await response.json();
            console.log("📩 Signup Response:", data);

            if (response.ok && data.user) {
                const newUser = { 
                    ...data.user, 
                    role: data.user.role?.trim().toLowerCase() || "intern" 
                };

                setUser(newUser);
                localStorage.setItem("user", JSON.stringify(newUser));

                alert("✅ Signup successful!");
                navigate(newUser.role === "admin" ? "/admin" : "/intern");
            } else {
                alert(data.error || "❌ Signup failed");
            }
        } catch (error) {
            console.error("❌ Signup error:", error);
        }
    };

    return (
        <div className="flex flex-col gap-4 pl-[229px] pt-10">
            <h2 className="font-semibold text-gray-800 text-[19px]">Sign Up</h2>
            <form className="self-center flex flex-col gap-8 mt-8" onSubmit={handleSignup}>
                <input className="w-48 h-9 border px-2" type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
                <input className="w-48 h-9 border px-2" type="text" placeholder="Department" value={department} onChange={(e) => setDepartment(e.target.value)} required />

                <label>Role:</label>
                <select className="w-48 h-9 border px-2" value={role} onChange={(e) => setRole(e.target.value)} required>
                    <option value="">Select Role</option> 
                    <option value="admin">Admin</option>
                    <option value="intern">Intern</option>
                    <option value="staff">Staff</option>
                </select>

                <input className="w-48 h-9 border px-2" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                <input className="w-48 h-9 border px-2" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                <button className="bg-blue-700 text-white px-8 py-2 font-bold rounded-sm" type="submit">Sign Up</button>
            </form>
        </div>
    );
};

export default Signup;


