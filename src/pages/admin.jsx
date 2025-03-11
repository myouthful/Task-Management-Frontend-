import Header from "../components/Header"
import AdminForm from "../components/adminform";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminTable from "../components/adminhistory";
import ChangeUserRole from "../components/changeuserrole";
import TeamLeadHistoryTable from "../components/teamleadhistorytable";
import HistoryTable from "../components/historytable";

function AdminPage() {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const userData = localStorage.getItem('user');
        if (!userData) {
            navigate('/login');
            return;
        }
        setUser(JSON.parse(userData));


    }, []);


    if (!user) {
        return <div>Loading...</div>;
    }
    return(
        <div className="flex-col flex  gap-5">
            <Header />
            <div className="w-full flex-col flex gap-[9px] px-[75px] mt-[30px] ">

                <p className="font-montserrat font-medium text-gray-900 text-[19px]">Welcome,</p>
                 <p className="font-montserrat font-semibold text-gray-900 text-[22px]">{user?.firstname} {user?.lastname}</p>

            </div>
            <hr className="mt-[20px] " />
            <p className="w-full font-montserrat pl-[100px] mt-[15px] font-medium text-gray-900 text-[17px]">
                Assign Role to User
            </p>
            <div className="px-[50px] ">
                <AdminForm user={user} />
            </div>
          <p className="w-full font-montserrat pl-[100px] mt-[5px] font-medium text-gray-700 text-[17px]">
                Change User Role
            </p>
            <div className="px-[50px] ">
                <ChangeUserRole />
            </div>
            <hr className="mt-[20px] " />
            <p className="px-[65px] mt-[39px] font-montserrat font-medium text-gray-900 text-[17px]">Task History</p>
            <div className="w-full mt-[35px] px-[45px] ">
                <HistoryTable />
            </div>
        </div>
    )
}


export default AdminPage;