import { useState, useEffect } from 'react';
import axios from 'axios';

function TaskForm() {
    const [formData, setFormData] = useState({
        taskId: '',
        taskdescription: '',
        taskType: '',
        dueDate: '',
        assignedTo: [],
        dept: '',
        taskStatus: 'Pending'
    });

    const [teamMembers, setTeamMembers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    
    // Get user data from localStorage
    const user = JSON.parse(localStorage.getItem('user'));

 
    

    const departments = ['AOF', 'IDP', 'PDE'];

    useEffect(() => {
        const fetchTeamMembers = async () => {
            try {
                const response = await axios.post('https://tsm-2d9v.onrender.com/fetchteam', {
                    dept: user.team, // Use selected department instead of user.department
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

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value,
            // Clear assignedTo when department changes
            ...(name === 'dept' ? { assignedTo: [] } : {})
        }));
    };

    const handleAssigneeChange = (e) => {
        const selectedEmails = Array.from(e.target.selectedOptions, option => option.value);
        setFormData(prev => ({
            ...prev,
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
            };

            const response = await axios.post('https://tsm-2d9v.onrender.com/tasks', taskData);
            if (response.data.success) {
                alert('Task created successfully');
                setFormData({
                    taskId: '',
                    taskdescription: '',
                    taskType: '',
                    dueDate: '',
                    assignedTo: [],
                    dept: '',
                    taskStatus: 'Pending'
                });
            }
        } catch (error) {
            setError('Failed to create task');
            console.error('Error:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
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
    );
}

export default TaskForm;