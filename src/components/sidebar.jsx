import React, { useContext } from "react"; 
import { Link } from "react-router-dom";
import AuthContext from "../Context/AuthContext";
import mdclogo from '../assets/mdclogo.png'

const Sidebar = () => {
    const { user, logout } = useContext(AuthContext);

    if (!user) return null;

    return (
        <div className="flex-col flex gap-[20px] bg-gray-800 pl-7 pt-6 w-[20%] h-svh ">
            <h3 className="text-white font-bold text-5 ">Dashboard</h3>
            <nav className="mt-3 ">
                <ul className="flex-col flex gap-4 ">
                    {user.role === "Admin" && <li className="text-white  "><Link to="/admin">Admin Panel</Link></li>}
                    {user.role === "Intern" && <li className="text-white  "><Link to="/intern">Intern Panel</Link></li>}
                    {user.role === "Intern" && <li className="text-white mt-1 font-semibold text-[14px] "><Link to="/intern">Current Task</Link></li>}
                    {user.role === "Intern" && <li className="text-white font-semibold text-[14px] "><Link to="/intern">Overall Performance</Link></li>}
                    {user.role === "Intern" && <li className="text-white font-semibold text-[14px] "><Link to="/intern">Completed Task</Link></li>}
                    
                </ul>
            </nav>
            <button className="bg-red-600 text-white mt-[50px] font-bold w-fit px-12 py-2 rounded-sm " onClick={logout}>Logout</button>
            <img className="w-[140px] mt-10 " src={mdclogo} alt="company logo" />
        </div>
    );
};

export default Sidebar;
