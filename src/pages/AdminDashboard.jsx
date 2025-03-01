import React, { useEffect, useState } from "react";

const AdminDashboard = ({ loggedInAdmin }) => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [internName, setInternName] = useState(""); // ✅ Assign by name
  const [department, setDepartment] = useState("");
  const [dueDate, setDueDate] = useState("");

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch("http://localhost:5001/api/tasks");
        const data = await response.json();
        console.log("Fetched Tasks:", data);

        if (Array.isArray(data)) {
          setTasks(data);
        } else {
          setTasks([]);
        }
      } catch (error) {
        console.error("Error fetching tasks:", error);
        setTasks([]);
      }
    };

    fetchTasks();
  }, []);

  const addTask = async () => {
    if (!newTask.trim() || !internName.trim() || !department.trim() || !dueDate.trim()) {
      alert("Please fill in all fields.");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      console.error("❌ No token found in localStorage");
      alert("No token found. Please log in.");
      return;
    }

    const taskData = {
      task: newTask,
      department,
      internName, // ✅ Send name instead of ID
      assignedBy: loggedInAdmin,
      dueDate: new Date(dueDate).toISOString(),
    };

    try {
      const response = await fetch("http://localhost:5001/api/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(taskData),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to add task: ${errorText}`);
      }

      const createdTask = await response.json();
      console.log("✅ New Task Added:", createdTask);

      setTasks([...tasks, createdTask.task]); // ✅ Update tasks list
      setNewTask("");
      setInternName("");
      setDepartment("");
      setDueDate("");
    } catch (error) {
      console.error("❌ Error adding task:", error);
    }
  };

  return (
    <div className="flex flex-col gap-6 pl-10 pt-5">
      <h2 className="font-bold text-gray-700 text-2xl">Admin Dashboard</h2>

      <div className="flex gap-3">
        <input
          className="w-48 h-9 border px-2"
          type="text"
          placeholder="Task Name"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <input
          className="w-48 h-9 border px-2"
          type="text"
          placeholder="Intern Name"
          value={internName}
          onChange={(e) => setInternName(e.target.value)}
        />
        <input
          className="w-48 h-9 border px-2"
          type="text"
          placeholder="Department"
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
        />
        <input
          className="w-48 h-9 border px-2"
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />
        <button
          className="bg-blue-700 text-white px-5 py-2 font-bold rounded-sm"
          onClick={addTask}
        >
          Create Task
        </button>
      </div>

      <ul className="mt-4">
        {tasks.length > 0 ? (
          tasks.map((task) => (
            <li key={task._id} className="py-2 border-b">
              {task.task} - Assigned to: {task.assignedTo.name} {/* ✅ Uses intern's name */}
            </li>
          ))
        ) : (
          <p className="text-gray-500">No tasks available.</p>
        )}
      </ul>
    </div>
  );
};

export default AdminDashboard;

