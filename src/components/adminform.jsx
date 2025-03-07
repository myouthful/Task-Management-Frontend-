import { useState } from 'react';
import axios from 'axios';

function AdminForm() {
    const [formData, setFormData] = useState({
        role: '',
        email: '',
        dept: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const roles = ['intern', 'staff'];
    const departments = ['AOF', 'PDE', 'IDP'];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const response = await axios.post('https://tsm-2d9v.onrender.com/assignroles', formData);
            
            if (response.data.success) {
                alert('Role and department assigned successfully');
                setFormData({
                    role: '',
                    email: '',
                    dept: ''
                });
            }
        } catch (err) {
            setError('Failed to assign role. Please try again.');
            console.error('Error:', err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="w-full max-w-md p-6">
            <div className="space-y-4">
                <div className="flex flex-col">
                    <label className="text-sm font-medium text-gray-700">Role:</label>
                    <select
                        name="role"
                        value={formData.role}
                        onChange={handleChange}
                        required
                        className="mt-1 p-2 border rounded-md pr-[20px] w-[300px]"
                    >
                        <option value="">Select Role</option>
                        {roles.map(role => (
                            <option key={role} value={role}>
                                {role.charAt(0).toUpperCase() + role.slice(1)}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="flex flex-col">
                    <label className="text-sm font-medium text-gray-700">Email:</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="mt-1 p-2 border rounded-md px-[9px] w-[300px]"
                    />
                </div>

                <div className="flex flex-col">
                    <label className="text-sm font-medium text-gray-700">Department:</label>
                    <select
                        name="dept"
                        value={formData.dept}
                        onChange={handleChange}
                        required
                        className="mt-1 p-2 border rounded-md px-[9px] w-[300px]"
                    >
                        <option value="">Select Department</option>
                        {departments.map(dept => (
                            <option key={dept} value={dept}>{dept}</option>
                        ))}
                    </select>
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className={`w-[300px] mt-[30px] py-2 px-4 text-white rounded-md ${
                        loading 
                            ? 'bg-blue-300 cursor-not-allowed'
                            : 'bg-blue-600 hover:bg-blue-700'
                    }`}
                >
                    {loading ? 'Assigning...' : 'Assign Role'}
                </button>

                {error && (
                    <div className="text-red-600 text-sm mt-2">
                        {error}
                    </div>
                )}
            </div>
        </form>
    );
}

export default AdminForm;