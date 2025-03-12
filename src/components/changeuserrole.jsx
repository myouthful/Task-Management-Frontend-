import { useState, useEffect } from 'react';
import axios from 'axios';

function ChangeUserRole() {
    const [formData, setFormData] = useState({
        role: '',
        dept: '',
        email: ''
    });
    const [deptUsers, setDeptUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState(null);

    const roles = ['Intern', 'Staff', 'Team Lead'];
    const departments = ['AOF', 'PDE', 'IDP'];

    const fetchDepartmentUsers = async (dept) => {
        try {
            const response = await axios.post('https://tsm-2d9v.onrender.com/namefetch', { dept });
            if (response.data.success) {
                setDeptUsers(response.data.users);
            }
        } catch (error) {
            console.error('Error fetching users:', error);
            setMessage({ type: 'error', text: 'Failed to fetch department users' });
        }
    };

    const handleDepartmentChange = async (e) => {
        const dept = e.target.value;
        setFormData({ ...formData, dept, email: '' }); // Reset email when department changes
        if (dept) {
            await fetchDepartmentUsers(dept);
        } else {
            setDeptUsers([]);
        }
    };

    const handleNameSelect = (e) => {
        const selectedEmail = e.target.value;
        setFormData({ ...formData, email: selectedEmail });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!formData.role || !formData.dept || !formData.email) {
            setMessage({ type: 'error', text: 'All fields are required' });
            return;
        }

        setLoading(true);
        try {
            const response = await axios.post('https://tsm-2d9v.onrender.com/changeroles', {
                role: formData.role.toLowerCase(),
                dept: formData.dept,
                email: formData.email
            });

            if (response.data.success) {
                setMessage({ type: 'success', text: 'Role changed successfully' });
                setFormData({ role: '', dept: '', email: '' });
                setDeptUsers([]);
            }
        } catch (error) {
            setMessage({ type: 'error', text: 'Failed to change role' });
            console.error('Error:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full max-w-4xl p-6">
            <form onSubmit={handleSubmit}>
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-blue-600">
                        <tr>
                            <th className="px-6 py-3 border text-left text-xs font-medium text-white uppercase tracking-wider">
                                Role
                            </th>
                            <th className="px-6 py-3 border text-left text-xs font-medium text-white uppercase tracking-wider">
                                Department
                            </th>
                            <th className="px-6 py-3 border text-left text-xs font-medium text-white uppercase tracking-wider">
                                Name
                            </th>
                            <th className="px-6 py-3 border text-left text-xs font-medium text-white uppercase tracking-wider">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="px-6 py-4 font-montserrat text-[15px] whitespace-nowrap">
                                <select
                                    value={formData.role}
                                    onChange={(e) => setFormData({...formData, role: e.target.value})}
                                    className="mt-1 p-2 border rounded-md w-full"
                                >
                                    <option value="">Select Role</option>
                                    {roles.map(role => (
                                        <option key={role} value={role}>
                                            {role}
                                        </option>
                                    ))}
                                </select>
                            </td>
                            <td className="px-6 py-4 font-montserrat text-[15px] whitespace-nowrap">
                                <select
                                    value={formData.dept}
                                    onChange={handleDepartmentChange}
                                    className="mt-1 p-2 border rounded-md w-full"
                                >
                                    <option value="">Select Department</option>
                                    {departments.map(dept => (
                                        <option key={dept} value={dept}>{dept}</option>
                                    ))}
                                </select>
                            </td>
                            <td className="px-6 py-4 font-montserrat text-[15px] whitespace-nowrap">
                                <select
                                    value={formData.email}
                                    onChange={handleNameSelect}
                                    className="mt-1 p-2 border rounded-md w-full"
                                >
                                    <option value="">Select Name</option>
                                    {deptUsers.map(user => (
                                        <option key={user.email} value={user.email}>
                                            {user.name}
                                        </option>
                                    ))}
                                </select>
                            </td>
                            <td className="px-6 py-4 font-montserrat text-[14px] whitespace-nowrap">
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className={`py-2 px-4 text-white rounded-md ${
                                        loading ? 'bg-blue-300 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
                                    }`}
                                >
                                    {loading ? 'Submitting...' : 'Submit'}
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </form>
            {message && (
                <div className={`mt-4 p-3 rounded-md ${
                    message.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                }`}>
                    {message.text}
                </div>
            )}
        </div>
    );
}

export default ChangeUserRole;