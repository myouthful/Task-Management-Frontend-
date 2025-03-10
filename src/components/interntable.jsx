import { useState, useEffect } from 'react';
import axios from 'axios';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

export default function BasicTable({ email }) {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchTasks = async () => {
    try {
      const response = await axios.get(`https://tsm-2d9v.onrender.com/internlog?email=${email}`);
      if (response.data.success) {
        setTasks(response.data.tasks);
      }
    } catch (err) {
      setError('Failed to fetch tasks');
      console.error('Error fetching tasks:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [email]);

  const handleSubmitTask = async (taskId) => {
    try {
      const response = await axios.post('https://tsm-2d9v.onrender.com/submittask', {
        email: email,
        taskId: taskId,
        taskdone: true
      });

      if (response.data.success) {
        // Reload the tasks after successful submission
        fetchTasks();
      }
    } catch (error) {
      console.error('Error submitting task:', error);
      alert('Failed to submit task');
    }
  };

  if (loading) return <div>Loading tasks...</div>;
  if (error) return <div>{error}</div>;

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="tasks table">
        <TableHead>
          <TableRow>
            <TableCell>Task ID</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Type</TableCell>
            <TableCell>Due Date</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Submit</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tasks.map((task) => (
            <TableRow
              key={task.taskId}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell>{task.taskId}</TableCell>
              <TableCell>{task.taskdescription}</TableCell>
              <TableCell>{task.taskType}</TableCell>
              <TableCell>
                {new Date(task.dueDate).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </TableCell>
              <TableCell>
                <span className={`px-2 py-1 rounded ${
                  task.Status === 'Not done' 
                    ? 'bg-red-100 text-red-800' 
                    : 'bg-green-100 text-green-800'
                }`}>
                  {task.Status}
                </span>
              </TableCell>
              <TableCell>
                <button
                  onClick={() => handleSubmitTask(task.taskId)}
                  disabled={task.Status !== 'Not done'}
                  className={`px-4 py-2 rounded-md text-white
                    ${task.Status === 'Not done'
                      ? 'bg-blue-500 hover:bg-blue-600'
                      : 'bg-gray-300 cursor-not-allowed'}
                  `}
                >
                  Mark as Done
                </button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
