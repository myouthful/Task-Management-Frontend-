import { useState, useEffect } from 'react';
import axios from 'axios';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

export default function HistoryTable() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchTaskUpdates = async () => {
    try {
      const response = await axios.get('https://tsm-2d9v.onrender.com/taskupdates');
      if (response.data.success) {
        setTasks(response.data.tasks);
      }
    } catch (err) {
      setError('Failed to fetch task updates');
      console.error('Error fetching tasks:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTaskUpdates();
  }, []);

  if (loading) return <div>Loading task history...</div>;
  if (error) return <div>{error}</div>;

  const renderList = (items) => (
    <ul className="list-disc pl-4">
      {items.map((item, index) => (
        <li key={index} className="text-sm">
          {item}
        </li>
      ))}
    </ul>
  );

  return (
    <TableContainer component={Paper} className="overflow-x-auto">
      <Table sx={{ minWidth: 800 }} aria-label="task history table">
        <TableHead>
          <TableRow>
            <TableCell>Task ID</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Type</TableCell>
            <TableCell style={{ minWidth: '180px' }}>Due Date</TableCell>
            <TableCell>Department</TableCell>
            {/* <TableCell>Created By</TableCell> */}
            <TableCell>Assigned To</TableCell>
            <TableCell>Submitted By</TableCell>
            <TableCell>Not Submitted</TableCell>
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
              <TableCell style={{ minWidth: '180px' }}>
                {new Date(task.dueDate).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </TableCell>
              <TableCell>{task.dept}</TableCell>
              {/* <TableCell>{task.taskcreator}</TableCell> */}
              <TableCell className="min-w-[200px]">
                {renderList(task.assignedTo)}
              </TableCell>
              <TableCell className="min-w-[200px]">
                {renderList(task.userswhosubmitted)}
              </TableCell>
              <TableCell className="min-w-[200px]">
                {renderList(task.nosubmits)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}