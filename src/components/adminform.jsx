import { useState, useEffect } from 'react';
import axios from 'axios';



function AdminForm() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const roles = ['Intern', 'Staff', 'Team Lead'];
    const departments = ['AOF', 'PDE', 'IDP'];

    useEffect(() => {
        fetchRecentSignups();
    }, []);

    const fetchRecentSignups = async () => {
        try {
            const response = await axios.get('https://tsm-2d9v.onrender.com/recentsignup');
            setUsers(response.data.users);
        } catch (err) {
            setError('Failed to fetch recent signups');
            console.error('Error:', err);
        }
    };

    const handleAssign = async (email, role, dept) => {
        if (!role || !dept) {
            alert('Please select both role and department');
            return;
        }

        setLoading(true);
        try {
            const response = await axios.post('https://tsm-2d9v.onrender.com/assignroles', {
               "email": email,
                role: role.toLowerCase(),
                "dept":dept
            });

            if (response.data.success) {
                // Remove the assigned user from the list
                setUsers(users.filter(user => user.email !== email));
                alert('Role and department assigned successfully');
            }
        } catch (err) {
            setError('Failed to assign role. Please try again.');
            console.error('Error:', err);
        } finally {
            setLoading(false);
        }
    };

    if (users.length === 0) {
        return (
            <div className="w-full max-w-4xl p-6">
                <p className="text-center font-montserrat text-gray-600 text-lg">No recent Signup</p>
            </div>
        );
    }

    return (
        <div className="w-full max-w-4xl p-6">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-blue-600">
                    <tr>
                        <th className="px-6 border py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Name</th>
                        <th className="px-6 border py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Email</th>
                        <th className="px-6 border py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Role</th>
                        <th className="px-6 border py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Department</th>
                        <th className="px-6 border py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Action</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {users.map((user) => (
                        <UserRow 
                            key={user._id} 
                            user={user} 
                            roles={roles} 
                            departments={departments} 
                            onAssign={handleAssign}
                            loading={loading}
                        />
                    ))}
                </tbody>
            </table>
            {error && <div className="text-red-600 text-sm mt-4">{error}</div>}
        </div>
    );
}

function UserRow({ user, roles, departments, onAssign, loading }) {
    const [selectedRole, setSelectedRole] = useState('');
    const [selectedDept, setSelectedDept] = useState('');

    return (
        <tr>
            <td className="px-6 py-4 font-montserrat text-[15px] whitespace-nowrap">
                {user.firstname} {user.lastname}
            </td>
            <td className="px-6 py-4 font-montserrat text-[15px] whitespace-nowrap">
                {user.email}
            </td>
            <td className="px-6 py-4 font-montserrat text-[15px] whitespace-nowrap">
                <select
                    value={selectedRole}
                    onChange={(e) => setSelectedRole(e.target.value)}
                    className="mt-1 p-2 font-montserrat text-[15px] border rounded-md"
                >
                    <option value="" className='font-montserrat text-[15px]'>Select Role</option>
                    {roles.map(role => (
                        <option key={role} value={role}>
                            {role}
                        </option>
                    ))}
                </select>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
                <select
                    value={selectedDept}
                    onChange={(e) => setSelectedDept(e.target.value)}
                    className="mt-1 p-2 font-montserrat text-[15px] border rounded-md"
                >
                    <option value="" className='font-montserrat text-[14px]'>Select Department</option>
                    {departments.map(dept => (
                        <option key={dept} value={dept}>{dept}</option>
                    ))}
                </select>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
                <button
                    onClick={() => onAssign(user.email, selectedRole, selectedDept)}
                    disabled={loading}
                    className={`py-2 px-4 font-montserrat text-[15px] text-white rounded-md ${
                        loading ? 'bg-blue-300 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-600'
                    }`}
                >
                    {loading ? 'Assigning...' : 'Assign'}
                </button>
            </td>
        </tr>
    );
}

export default AdminForm;
