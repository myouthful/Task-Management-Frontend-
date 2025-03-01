import React from "react";

const TaskTable = ({ tasks = [] }) => {
    console.log("Tasks Data:", tasks); // Debugging check

    return (
        <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="border px-4 py-2">Task Title</th>
                        <th className="border px-4 py-2">Task Description</th>
                        <th className="border px-4 py-2">Assigned By</th>
                        <th className="border px-4 py-2">Assigned Date</th>
                        <th className="border px-4 py-2">Deadline</th>
                        <th className="border px-4 py-2">Status</th>
                    </tr>
                </thead>
                <tbody>
                    {Array.isArray(tasks) && tasks.length > 0 ? (
                        tasks.map((task, index) => (
                            <tr key={index}>
                                <td className="border px-4 py-2">{task.task}</td>
                                <td className="border px-4 py-2">{task.department}</td>
                                <td className="border px-4 py-2">{task.assignedBy?.name || "Unknown"}</td>
                                <td className="border px-4 py-2">{new Date(task.assignedAt).toLocaleDateString()}</td>
                                <td className="border px-4 py-2">{new Date(task.dueDate).toLocaleDateString()}</td>
                                <td className="border px-4 py-2">
                                    <span
                                        className={`px-2 py-1 rounded text-white ${
                                            task.status === "pending" ? "bg-yellow-500" :
                                            task.status === "completed" ? "bg-green-500" : "bg-red-500"
                                        }`}
                                    >
                                        {task.status}
                                    </span>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="6" className="text-center py-4">No tasks assigned</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default TaskTable;


