import Header from "../components/Header"
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BasicTable from "../components/interntable";

function InterPage() {
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
            <p className="w-full mt-[120px] pl-[45px] font-medium text-gray-900 text-[19px]">
                Welcome, {user.firstname} {user.lastname}
            </p>
            <div className="flex px-7 mt-2 ">
            <BasicTable email={user.email} />
            </div>
        </div>
    )
}

export default InterPage;