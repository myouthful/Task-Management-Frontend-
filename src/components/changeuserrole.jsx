import { useState } from 'react';
import axios from 'axios';

function ChangeUserRole() {
    const [formData, setFormData] = useState({
        role: '',
        dept: '',
        email: ''
    });
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState(null);

    const roles = ['Intern', 'Staff', 'Team Lead'];
    const departments = ['AOF', 'PDE', 'IDP'];

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!formData.role || !formData.dept || !formData.email) {
            setMessage({ type: 'error', text: 'All fields are required' });
            return;
        }

        setLoading(true);
        try {
            const response = await axios.post('http://localhost:3000/changeroles', {
                role: formData.role.toLowerCase(),
                dept: formData.dept,
                email: formData.email
            });

            if (response.data.success) {
                setMessage({ type: 'success', text: 'Role changed successfully' });
                setFormData({ role: '', dept: '', email: '' }); // Reset form
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
                    <thead>
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Role
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Department
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Email
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
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
                                    onChange={(e) => setFormData({...formData, dept: e.target.value})}
                                    className="mt-1 p-2 border rounded-md w-full"
                                >
                                    <option value="">Select Department</option>
                                    {departments.map(dept => (
                                        <option key={dept} value={dept}>{dept}</option>
                                    ))}
                                </select>
                            </td>
                            <td className="px-6 py-4 font-montserrat text-[15px] whitespace-nowrap">
                                <input
                                    type="email"
                                    value={formData.email}
                                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                                    placeholder="Enter email"
                                    className="mt-1 p-2 border rounded-md w-full"
                                />
                            </td>
                            <td className="px-6 py-4 font-montserrat text-[15px] whitespace-nowrap">
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