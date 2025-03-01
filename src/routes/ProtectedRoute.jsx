import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../Context/AuthContext"; // ✅ FIXED IMPORT

const ProtectedRoute = ({ element, allowedRoles }) => {
    const { user } = useContext(AuthContext);

    console.log("🔍 Checking user in ProtectedRoute:", user);
    console.log("✅ Allowed Roles:", allowedRoles); // Debugging

    if (!user) {
        console.warn("🚨 No user found, redirecting to login...");
        return <Navigate to="/" />;
    }

    if (!allowedRoles.includes(user.role.toLowerCase())) {
        console.warn(`🚨 Unauthorized access! User role: ${user.role}`);

        // ✅ Correct Dynamic Redirection
        return <Navigate to={`/${user.role}`} />;
    }

    return element;
};

export default ProtectedRoute;



