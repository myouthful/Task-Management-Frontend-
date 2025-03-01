import React, { useEffect, useState } from "react";
import TaskTable from "../components/table";

const InternDashboard = () => {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        fetch("http://localhost:5001/api/tasks")
            .then((res) => res.json())
            .then((data) => setTasks(data.filter(task => task.assignedTo === "Intern")))
            .catch((err) => console.error(err));
    }, []);

    return (
        <div className="flex flex-col gap-9 pl-[35px] pt-[20px] ">
            <h2 className="font-bold text-gray-700 text-[25px] ">Hello,</h2>

            {/* <ul>
                {tasks.length > 0 ? (
                    tasks.map((task, index) => (
                        <li key={index}>{task.title}</li>
                    ))
                ) : (
                    <p>No tasks assigned</p>
                )}
            </ul> */}
            <p className="font-medium text-slate-800 text-[13px] " >If you're unsure and do not fully understand a task do not hesitate to contact mydreamconnect@gmail.com</p>
            <TaskTable />
        </div>
    );
};

export default InternDashboard;

