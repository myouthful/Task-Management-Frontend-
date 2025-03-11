import Header from "../components/Header"
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TaskForm from "../components/taskform";
import HistoryTable from "../components/historytable";
import TeamLeadHistoryTable from "../components/teamleadhistorytable";

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
            <div className="w-full flex-col flex gap-[9px] px-[45px] mt-[130px] ">

                <p className="font-montserrat font-medium text-gray-900 text-[19px]">Welcome,</p>
                 <p className="font-montserrat font-semibold text-gray-900 text-[22px]">{user?.firstname} {user?.lastname}</p>

            </div>
            <hr className="mt-[20px] " />
            <p className="w-full font-montserrat pl-[40px] mt-[15px] font-medium text-gray-700 text-[17px]">
                Create Task
            </p>
            <TaskForm />
            <hr className="mt-[20px] " />
            <p className="px-[65px] mt-[30px] font-medium text-gray-900 text-[19px]">Task History</p>
            <div className="w-full mt-[35px] px-[45px] ">
            <TeamLeadHistoryTable />
            </div>
        </div>
    )
}

export default StaffPage;