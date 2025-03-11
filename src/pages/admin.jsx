import Header from "../components/Header"
import AdminForm from "../components/adminform";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminTable from "../components/adminhistory";

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
<<<<<<< HEAD
    }, [navigate]);
=======
    }, []);
>>>>>>> 3ff6ec5 ( updated TaskForm component user adjusted as well as icon changed)

    if (!user) {
        return <div>Loading...</div>;
    }
    return(
        <div className="flex-col flex  gap-5">
            <Header />
            <p className="w-full px-[75px] mt-[30px] font-medium text-gray-900 text-[19px]">
<<<<<<< HEAD
                Welcome, {user.firstname} {user.lastname}
=======
                Welcome, {user?.firstname} {user?.lastname}
>>>>>>> 3ff6ec5 ( updated TaskForm component user adjusted as well as icon changed)
            </p>
            <hr className="mt-[20px] " />
            <p className="w-full px-[80px] mt-[5px] font-medium text-gray-900 text-[19px]">
                Assign Role to User
            </p>
            <div className="px-[55px] ">
<<<<<<< HEAD
                <AdminForm />
=======
                <AdminForm user={user} />
>>>>>>> 3ff6ec5 ( updated TaskForm component user adjusted as well as icon changed)
            </div>
            <hr className="mt-[20px] " />
            <p className="px-[65px] mt-[30px] font-medium text-gray-900 text-[19px]">Task History</p>
            <div className="w-full mt-[35px] px-[45px] ">
                <AdminTable />
            </div>
        </div>
    )
}


export default AdminPage;