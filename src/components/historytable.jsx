import { useState, useEffect } from 'react';
import axios from 'axios';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const theme = createTheme({
  typography: {
    fontFamily: 'Montserrat, sans-serif',
  },
  components: {
    MuiTableCell: {
      styleOverrides: {
        root: {
          fontFamily: 'Montserrat, sans-serif',
        }
      }
    }
  }
});

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

  if (loading) return <div className='w-full px-[85px]'>Loading task history...</div>;
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

  const isOverdue = (dueDate) => {
    return new Date(dueDate) < new Date();
  };

  const StatusIndicator = ({ dueDate }) => (
    <div 
      className={`w-3 h-3 rounded-full ${
        isOverdue(dueDate) ? 'bg-red-500' : 'bg-green-500'
      }`}
    />
  );

  return (
    <ThemeProvider theme={theme}>
    <TableContainer component={Paper} className="overflow-x-auto">
      <Table sx={{ minWidth: 800 }} aria-label="task history table">
        <TableHead>
          <TableRow sx={{ backgroundColor: '#2563eb' }}>
            <TableCell sx={{ color: 'white' }}>Task ID</TableCell>
            <TableCell sx={{ color: 'white' }}>Description</TableCell>
            <TableCell sx={{ color: 'white' }}>Type</TableCell>
            <TableCell sx={{ color: 'white' }}>Status</TableCell>
            <TableCell sx={{ color: 'white', minWidth: '100px' }}>Due Date</TableCell>
            <TableCell sx={{ color: 'white' }}>Department</TableCell>
            <TableCell sx={{ color: 'white' }}>Task Creator</TableCell>
            <TableCell sx={{ color: 'white' }}>Assigned To</TableCell>
            <TableCell sx={{ color: 'white' }}>Submitted By</TableCell>
            <TableCell sx={{ color: 'white' }}>Not Submitted</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tasks.map((task) => (
            <TableRow
              key={task.taskId}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell sx={{ color: '#2563eb' }}>{task.taskId}</TableCell>
              <TableCell>{task.taskdescription}</TableCell>
              <TableCell>{task.taskType}</TableCell>
              <TableCell>
                <StatusIndicator dueDate={task.dueDate} />
              </TableCell>
              <TableCell sx={{ minWidth: '100px', color: '#ff6b6b' }}>
              {new Date(task.dueDate).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })}
                </TableCell>
                <TableCell>{task.dept}</TableCell>
                <TableCell>{task.taskcreator}</TableCell>
                <TableCell sx={{ minWidth: '200px' }}>
                  {renderList(task.assignedTo)}
                </TableCell>
                <TableCell sx={{ minWidth: '200px' }}>
                  {renderList(task.userswhosubmitted)}
                </TableCell>
                <TableCell sx={{ minWidth: '200px' }}>
                  {renderList(task.nosubmits)}
                </TableCell>
                
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </ThemeProvider>
  );
}