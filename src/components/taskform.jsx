import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function TaskForm() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        date: '',
        taskdescription: '',
        taskName: '',
        dueDate: '',
        assignedTo: [],
        dept: '',
        taskStatus: 'Pending'
    });

    const [tasks, setTasks] = useState([]); // Ensure tasks array exists
    const [teamMembers, setTeamMembers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Get user data from localStorage
    const user = JSON.parse(localStorage.getItem('user'));


    const departments = ['AOF', 'IDP', 'PDE'];

    useEffect(() => {
        const fetchTeamMembers = async () => {

            if (!formData.dept) return; // Prevent API call if no department is selected

            try {
                const response = await axios.post('https://tsm-2d9v.onrender.com/fetchteam', {
                    dept: formData.dept, // Fetch based on selected department
                    email: user?.email
                });

                if (response.data.success) {
                    const emails = response.data.team.map(member => member.email);
                    setTeamMembers(emails);
                }
            } catch (err) {
                setError('Failed to fetch team members');
                console.error('Error fetching team members:', err);
            }
        };

        fetchTeamMembers();
    }, [formData.dept]);


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value,
            ...(name === 'dept' ? { assignedTo: [] } : {}) // Reset assignedTo when department changes
        }));
    };

    const handleAssigneeChange = (e) => {
        const selectedEmails = Array.from(e.target.selectedOptions, option => option.value);
        setFormData(prev => ({
            ...prev,

            assignedTo: selectedEmails
        }));
    };

    const addTaskRow = () => {
        setTasks([...tasks, { date: '', taskName: '', taskdescription: '', assignedTo: '', taskStatus: 'Pending' }]);
    };

    const removeTaskRow = (index) => {
        setTasks(tasks.filter((_, i) => i !== index));
    };

    const handleTaskChange = (index, field, value) => {
        const updatedTasks = [...tasks];
        updatedTasks[index][field] = value;
        setTasks(updatedTasks);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const taskData = {
                ...formData,
                taskcreator: user?.email,
                email: user?.email,
                noOfExpectedResponse: formData.assignedTo.length,
                responseRecieved: 0,
                taskStatus: 'Pending'
            };

            const response = await axios.post('https://tsm-2d9v.onrender.com/tasks', taskData);
            if (response.data.success) {
                alert('Task created successfully');
                setFormData({

                    date: '',
                    taskdescription: '',
                    taskName: '',
                    dueDate: '',
                    assignedTo: [],
                    dept: '',
                    taskStatus: 'Pending'
                });
                navigate('/admin');
            }
        } catch (error) {
            setError('Failed to create task');
            console.error('Task creation error:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form id="taskForm" onSubmit={handleSubmit} className="w-full p-6">
            <div className="p-6">
                <table id="taskTable" className="w-full border-collapse border border-gray-300">
                    <thead>
                        <tr className="bg-gray-200 text-gray-700">
                            <th className="border p-2">Date</th>
                            <th className="border p-2">Task Name</th>
                            <th className="border p-2">Task Description</th>
                            <th className="border p-2">Assigned To</th>
                            <th className="border p-2">Status</th>
                            <th className="border p-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tasks.map((task, index) => (
                            <tr key={index} className="border">
                                <td className="border p-2">
                                    <input 
                                        type="date" 
                                        className="w-full p-1 border rounded" 
                                        value={task.date} 
                                        onChange={(e) => handleTaskChange(index, 'date', e.target.value)}
                                    />
                                </td>
                                <td className="border p-2">
                                    <input 
                                        type="text" 
                                        className="w-full p-1 border rounded" 
                                        value={task.taskName} 
                                        onChange={(e) => handleTaskChange(index, 'taskName', e.target.value)}
                                    />
                                </td>
                                <td className="border p-2">
                                    <textarea 
                                        className="w-full p-1 border rounded" 
                                        value={task.taskdescription} 
                                        onChange={(e) => handleTaskChange(index, 'taskdescription', e.target.value)}
                                    ></textarea>
                                </td>
                                <td className="border p-2">
                                    <select 
                                        className="w-full p-1 border rounded"
                                        value={task.assignedTo} 
                                        onChange={(e) => handleTaskChange(index, 'assignedTo', e.target.value)}
                                    >
                                        <option value="">Select</option>
                                        {teamMembers.map(email => (
                                            <option key={email} value={email}>{email}</option>
                                        ))}
                                    </select>
                                </td>
                                <td className="border p-2">
                                    <select 
                                        className={`w-full p-1 border rounded ${task.taskStatus === 'Pending' ? 'bg-yellow-300' : 'bg-green-300'}`}
                                        value={task.taskStatus} 
                                        onChange={(e) => handleTaskChange(index, 'taskStatus', e.target.value)}
                                    >
                                        <option value="Pending">Pending</option>
                                        <option value="Completed">Completed</option>
                                    </select>
                                </td>
                                <td className="border p-2 text-center">
                                    <button 
                                        type="button"
                                        onClick={() => removeTaskRow(index)} 
                                        className="text-red-500 hover:text-red-700"
                                    >
                                        Remove
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <div className="mt-4">
                    <button 
                        type="button"
                        onClick={addTaskRow} 
                        className="bg-blue-500 text-white px-4 py-2 rounded"
                    >
                        Add Task Row
                    </button>
                </div>

                {error && <p className="text-red-500 mt-2">{error}</p>}
            </div>

            <div className="flex justify-center mt-6">
                <button
                    type="submit"
                    disabled={loading}
                    className={`w-[250px] mt-[15px] py-2 px-4 text-white rounded-md ${
                        loading ? 'bg-blue-300 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
                    }`}
                >
                    {loading ? 'Creating Task...' : 'Create Task'}
                </button>
            </div>
        </form>

    );
}

export default TaskForm;




