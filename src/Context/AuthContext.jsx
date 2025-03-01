import React, { createContext, useState, useEffect } from "react";

// ✅ Named exports (NO DEFAULT EXPORT)
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        const storedToken = localStorage.getItem("token");

        if (storedUser && storedToken) {
            setUser(JSON.parse(storedUser));
            setToken(storedToken);
        }
    }, []);

    const login = async (email, password) => {
        try {
            const response = await fetch("http://localhost:5001/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (response.ok && data.user && data.token) {
                const loggedInUser = {
                    ...data.user,
                    role: data.user.role?.trim().toLowerCase() || "intern",
                };

                setUser(loggedInUser);
                setToken(data.token);

                localStorage.setItem("user", JSON.stringify(loggedInUser));
                localStorage.setItem("token", data.token); // ✅ Store the token

                return loggedInUser;
            } else {
                alert(data.message || "Login failed");
                return null;
            }
        } catch (error) {
            console.error("❌ Login error:", error);
            return null;
        }
    };

    const logout = () => {
        setUser(null);
        setToken(null);
        localStorage.removeItem("user");
        localStorage.removeItem("token");
    };

    return (
        <AuthContext.Provider value={{ user, setUser, token, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;




