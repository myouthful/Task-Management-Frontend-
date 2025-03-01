import React, { useContext } from "react"; // ✅ Explicitly import React
import { Link } from "react-router-dom";
import AuthContext from "../Context/AuthContext";


const TopBar = () => {
    const { user } = useContext(AuthContext);

    return (
        <div className="flex justify-between px-[2%] py-7 bg-gray-950 ">
            <h2 className="font-bold text-[19px] text-white ">Task Manager</h2>
            <div className=" ">
                {user ? (
                    <p className="text-white">Welcome, {user.name}</p>
                ) : (
                    <div className=" ">
                        <button className=" ">Account</button>
                        <div className=" ">
                            <Link to="/login">Login</Link>
                            <Link to="/signup">Signup</Link>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TopBar;

