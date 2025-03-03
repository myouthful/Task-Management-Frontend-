import Header from "../components/Header"
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TaskForm from "../components/taskform";
import HistoryTable from "../components/historytable";

function StaffPage() {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const userData = localStorage.getItem('user');
        if (!userData) {
            navigate('/login');
            return;
        }
        setUser(JSON.parse(userData));
    }, [navigate]);

    if (!user) {
        return <div>Loading...</div>;
    }

    return(
        <div className="flex-col flex gap-5">
            <Header />
            <p className="w-full px-[65px] mt-[30px] font-medium text-gray-900 text-[19px]">
                Welcome, {user.firstname} {user.lastname}
            </p>
            <hr className="mt-[20px] " />
            <p className="px-[65px] mt-[30px] font-medium text-gray-900 text-[19px]">Create Task</p>
            <TaskForm />
            <hr className="mt-[20px] " />
            <p className="px-[65px] mt-[30px] font-medium text-gray-900 text-[19px]">Task History</p>
            <div className="w-full mt-[35px] px-[45px] ">
            <HistoryTable />
            </div>
        </div>
    )
}

export default StaffPage;