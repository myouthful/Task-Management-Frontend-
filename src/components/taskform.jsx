import { useState, useEffect } from 'react';
import axios from 'axios';
import generateTaskId from '../utility/taskid';

const userData = JSON.parse(localStorage.getItem('user')) || {};

function TaskForm() {

    const [tasks, setTasks] = useState([{
        taskId: generateTaskId(),
        taskName: '',
        taskDescription: '',
        dept: '',
        assignTo: [],
        assigneeEmails: [],
        dueDate: '',
       taskcreator: `${userData.firstname} ${userData.lastname}`
    }]);
    const [deptUsers, setDeptUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const departments = ['AOF', 'PDE', 'IDP'];

    const fetchDepartmentUsers = async (dept, taskIndex) => {
        try {
            const response = await axios.post('https://tsm-2d9v.onrender.com/namefetch', { dept });
            if (response.data.success) {
                setDeptUsers(response.data.users);
            }
        } catch (err) {
            setError('Failed to fetch department users');
            console.error('Error:', err);
        }
    };

    const handleDepartmentChange = async (e, index) => {
        const { value } = e.target;
        const updatedTasks = [...tasks];
        updatedTasks[index].dept = value;
        updatedTasks[index].assignTo = [];
        updatedTasks[index].assigneeEmails = [];
        setTasks(updatedTasks);
        if (value) {
            await fetchDepartmentUsers(value);
        }
    };

    const handleAssigneeChange = (e, index) => {
        const selectedOptions = Array.from(e.target.selectedOptions);
        const selectedNames = selectedOptions.map(option => option.getAttribute('data-name'));
        const selectedEmails = selectedOptions.map(option => option.value);

        const updatedTasks = [...tasks];
        updatedTasks[index].assignTo = selectedNames;
        updatedTasks[index].assigneeEmails = selectedEmails;
        setTasks(updatedTasks);
    };

    const addTaskRow = () => {
        setTasks([...tasks, {
            taskId: generateTaskId(),
            taskName: '',
            taskDescription: '',
            dept: '',
            assignTo: [],
            assigneeEmails: [],
            dueDate: '',
            taskcreator: `${userData.firstname} ${userData.lastname}`
        }]);
    };

    const removeTaskRow = (index) => {
        if (tasks.length > 1) {
            setTasks(tasks.filter((_, i) => i !== index));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            // Create array of formatted task data
            const tasksData = tasks.map(task => ({
                taskid: task.taskId,
                taskname: task.taskName,
                taskdescription: task.taskDescription,
                dept: task.dept,
                assignto: task.assignTo,
                assignee: task.assigneeEmails,
                taskstatus: 'pending',
                dueDate: task.dueDate,
                taskcreator: task.taskcreator
            }));
    
            // Send the array of tasks in a single request
            await axios.post('https://tsm-2d9v.onrender.com/tasks', tasksData);
            
            alert('Tasks created successfully!');
            setTasks([{
                taskId: generateTaskId(),
                taskName: '',
                taskDescription: '',
                dept: '',
                assignTo: [],
                assigneeEmails: [],
                dueDate: '',
                taskcreator: userData.email
            }]);
        } catch (err) {
            setError('Failed to create tasks');
            console.error('Error:', err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="p-6">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-blue-600">
                    <tr className="font-montserrat">
                        <th className="px-6 border  py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Task ID</th>
                        <th className="px-6 border  py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Task Name</th>
                        <th className="px-6 border  py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Description</th>
                        <th className="px-6 border  py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Department</th>
                        <th className="px-6 border  py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Assign To</th>
                        <th className="px-6 border  py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Due Date</th>
                        <th className="px-6 border  py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Actions</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {tasks.map((task, index) => (
                        <tr key={task.taskId}>
                            <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-900">
                                {task.taskId}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <input
                                    type="text"
                                    value={task.taskName}
                                    onChange={(e) => {
                                        const updatedTasks = [...tasks];
                                        updatedTasks[index].taskName = e.target.value;
                                        setTasks(updatedTasks);
                                    }}
                                    className="mt-1 font-montserrat pl-[5px] h-[50px] border block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                                />
                            </td>
                            <td className="px-5 py-4  whitespace-nowrap">
                                <textarea
                                    value={task.taskDescription}
                                    onChange={(e) => {
                                        const updatedTasks = [...tasks];
                                        updatedTasks[index].taskDescription = e.target.value;
                                        setTasks(updatedTasks);
                                    }}
                                    className="mt-1 font-monotserrat pl-[5px] block border w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                                    rows="3"
                                />
                            </td>
                            <td className="px-2 py-4 whitespace-nowrap">
                                <select
                                    value={task.dept}
                                    onChange={(e) => handleDepartmentChange(e, index)}
                                    className="mt-1 block border w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                                >
                                    <option value="">Select Department</option>
                                    {departments.map(dept => (
                                        <option key={dept} value={dept}>{dept}</option>
                                    ))}
                                </select>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <select
                                    multiple
                                    value={task.assigneeEmails}
                                    onChange={(e) => handleAssigneeChange(e, index)}
                                    className="mt-1 block border w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                                >
                                    {deptUsers.map(user => (
                                        <option 
                                            key={user.email} 
                                            value={user.email}
                                            data-name={user.name}
                                        >
                                            {user.name}
                                        </option>
                                    ))}
                                </select>
                            </td>
                            <td className="px-3 py-4 w-[120px] whitespace-nowrap">
                                <input
                                    type="datetime-local"
                                    value={task.dueDate}
                                    onChange={(e) => {
                                        const updatedTasks = [...tasks];
                                        updatedTasks[index].dueDate = e.target.value;
                                        setTasks(updatedTasks);
                                    }}
                                    className="mt-1 block w-[200px] rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                                />
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                <button
                                    type="button"
                                    onClick={() => removeTaskRow(index)}
                                    className="text-red-600 hover:text-red-900 mr-2"
                                >
                                    Remove
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className="mt-4 flex justify-between">
                <button
                    type="button"
                    onClick={addTaskRow}
                    className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
                >
                    Add Row
                </button>
                <button
                    type="submit"
                    disabled={loading}
                    className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
                >
                    {loading ? 'Creating...' : 'Create Tasks'}
                </button>
            </div>
            {error && (
                <div className="mt-4 text-red-600">
                    {error}
                </div>
            )}
        </form>
    );
}

export default TaskForm;