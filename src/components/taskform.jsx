import { useState, useEffect } from 'react';
<<<<<<< HEAD
import axios from 'axios';

function TaskForm() {
    const [formData, setFormData] = useState({
        taskId: '',
        taskdescription: '',
        taskType: '',
=======
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function TaskForm() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        date: '',
        taskdescription: '',
        taskName: '',
>>>>>>> 3ff6ec5 ( updated TaskForm component user adjusted as well as icon changed)
        dueDate: '',
        assignedTo: [],
        dept: '',
        taskStatus: 'Pending'
    });

<<<<<<< HEAD
    const [teamMembers, setTeamMembers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    
    // Get user data from localStorage
    const user = JSON.parse(localStorage.getItem('user'));

 
    

=======
    const [tasks, setTasks] = useState([]); // Ensure tasks array exists
    const [teamMembers, setTeamMembers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Get user data from localStorage
    const user = JSON.parse(localStorage.getItem('user'));

>>>>>>> 3ff6ec5 ( updated TaskForm component user adjusted as well as icon changed)
    const departments = ['AOF', 'IDP', 'PDE'];

    useEffect(() => {
        const fetchTeamMembers = async () => {
<<<<<<< HEAD
            try {
                const response = await axios.post('https://tsm-2d9v.onrender.com/fetchteam', {
                    dept: user.department, // Use selected department instead of user.department
                    email: user.email
                });
                console.log('Server response:', response.data)
                if (response.data.success) {
                    const emails = response.data.team.map(member => member.email);
                console.log('Team emails:', emails);
                setTeamMembers(emails);
                }
            } catch (err) {
                setError('Failed to fetch team members');
                console.error('Error:', err);
            }
        };

        // Fetch team members whenever department changes and is not empty
        if (formData.dept) {
            fetchTeamMembers();
        } else {
            setTeamMembers([]); // Clear team members if no department is selected
        }
    }, [formData.dept]); // Changed dependency to formData.dept
=======
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
>>>>>>> 3ff6ec5 ( updated TaskForm component user adjusted as well as icon changed)

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value,
<<<<<<< HEAD
            // Clear assignedTo when department changes
            ...(name === 'dept' ? { assignedTo: [] } : {})
=======
            ...(name === 'dept' ? { assignedTo: [] } : {}) // Reset assignedTo when department changes
>>>>>>> 3ff6ec5 ( updated TaskForm component user adjusted as well as icon changed)
        }));
    };

    const handleAssigneeChange = (e) => {
        const selectedEmails = Array.from(e.target.selectedOptions, option => option.value);
        setFormData(prev => ({
            ...prev,
<<<<<<< HEAD
            assignedTo: selectedEmails,
            noOfExpectedResponse: selectedEmails.length
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const taskData = {
                ...formData,
                taskcreator: user.email,
                email: user.email,
                noOfExpectedResponse: formData.assignedTo.length,
                responseRecieved: 0,
                Status: 'Pending'
=======
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
>>>>>>> 3ff6ec5 ( updated TaskForm component user adjusted as well as icon changed)
            };

            const response = await axios.post('https://tsm-2d9v.onrender.com/tasks', taskData);
            if (response.data.success) {
                alert('Task created successfully');
                setFormData({
<<<<<<< HEAD
                    taskId: '',
                    taskdescription: '',
                    taskType: '',
=======
                    date: '',
                    taskdescription: '',
                    taskName: '',
>>>>>>> 3ff6ec5 ( updated TaskForm component user adjusted as well as icon changed)
                    dueDate: '',
                    assignedTo: [],
                    dept: '',
                    taskStatus: 'Pending'
                });
<<<<<<< HEAD
            }
        } catch (error) {
            setError('Failed to create task');
            console.error('Error:', error);
=======
                navigate('/admin');
            }
        } catch (error) {
            setError('Failed to create task');
            console.error('Task creation error:', error);
>>>>>>> 3ff6ec5 ( updated TaskForm component user adjusted as well as icon changed)
        } finally {
            setLoading(false);
        }
    };

    return (
<<<<<<< HEAD
        <form onSubmit={handleSubmit} className="w-full p-6">
        {/* First Row */}
        <div className="flex px-[45px] gap-7 mb-4">
            <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-700">Task ID:</label>
                <input
                    type="text"
                    name="taskId"
                    value={formData.taskId}
                    onChange={handleChange}
                    required
                    className="mt-1 p-2 border rounded-md w-[290px]"
                />
            </div>

            <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-700">Task Type:</label>
                <input
                    type="text"
                    name="taskType"
                    value={formData.taskType}
                    onChange={handleChange}
                    required
                    className="mt-1 p-2 border rounded-md w-[290px]"
                />
            </div>

            <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-700">Due Date:</label>
                <input
                    type="datetime-local"
                    name="dueDate"
                    value={formData.dueDate}
                    onChange={handleChange}
                    required
                    className="mt-1 p-2 border rounded-md w-[290px]"
                />
            </div>
        </div>

        {/* Second Row */}
        <div className="flex px-[45px] gap-6 mb-4">
            <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-700">Description:</label>
                <textarea
                    name="taskdescription"
                    value={formData.taskdescription}
                    onChange={handleChange}
                    required
                    className="mt-1 p-2 border rounded-md w-[290px]"
                    rows="3"
                />
            </div>

            <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-700">Department:</label>
                <select
                    name="dept"
                    value={formData.dept}
                    onChange={handleChange}
                    required
                    className="mt-1 p-2 border rounded-md w-[290px]"
                >
                    <option value="">Select Department</option>
                    {departments.map(dept => (
                        <option key={dept} value={dept}>{dept}</option>
                    ))}
                </select>
            </div>

            {teamMembers.length > 0 ? (
                <div className="flex flex-col">
                    <label className="text-sm font-medium text-gray-700">Assign To:</label>
                    <select
                        multiple
                        name="assignedTo"
                        value={formData.assignedTo}
                        onChange={handleAssigneeChange}
                        required
                        className="mt-1 p-2 border rounded-md w-[290px]"
                    >
                        {teamMembers.map(email => (
                            <option key={email} value={email}>{email}</option>
                        ))}
                    </select>
                    <p className="text-sm text-gray-500 mt-1">
                        Hold Ctrl/Cmd to select multiple interns
                    </p>
                </div>
            ) : (
                <div className="w-[350px]" />
            )}
        </div>

        {/* Submit Button Row */}
        <div className="flex justify-center mt-6">
            <button
                type="submit"
                disabled={loading}
                className={`w-[250px] mt-[15px] py-2 px-4 text-white rounded-md ${
                    loading 
                        ? 'bg-blue-300 cursor-not-allowed'
                        : 'bg-blue-600 hover:bg-blue-700'
                }`}
            >
                {loading ? 'Creating Task...' : 'Create Task'}
            </button>
        </div>

        {error && (
            <div className="text-red-600 text-sm mt-2 text-center">
                {error}
            </div>
        )}
    </form>
=======
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
>>>>>>> 3ff6ec5 ( updated TaskForm component user adjusted as well as icon changed)
    );
}

export default TaskForm;
<<<<<<< HEAD
=======

>>>>>>> 3ff6ec5 ( updated TaskForm component user adjusted as well as icon changed)
