import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { useDrop, useDrag, DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { selectFilteredTasks } from '../features/tasks/taskSelectors';
import {
  addTask,
  editTask,
  deleteTask,
  toggleComplete,
  reorderTasks,
} from '../features/tasks/taskSlice';
import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';
import FilterBar from '../components/FilterBar';
import ConfirmationModal from '../components/ConfirmationModal';
import { Box, AppBar, Toolbar, Typography, IconButton, Container, CssBaseline, Paper, TextField } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck';
import Brightness3 from '@mui/icons-material/Brightness3';
import LightMode from '@mui/icons-material/LightMode';


const TaskCard = ({ task, index, onEdit, onDelete, onToggleComplete, moveTask }) => {
    const ref = React.useRef(null);
    const [, drop] = useDrop({
      accept: 'TASK',
      hover(item) {
        if (item.index !== index) {
          moveTask(item.index, index);
          item.index = index;
        }
      },
    });
  
    const [, drag] = useDrag({
      type: 'TASK',
      item: { id: task.id, index },
    });
  
    drag(drop(ref));
  
    return (
      <Box
        ref={ref}
        sx={{
          margin: '10px 0',
          padding: '10px',
          border: '1px solid #ccc',
          borderRadius: '5px',
          backgroundColor: task.completed ? '#d4edda' : '#d0e6f7',
        }}
      >
        <TaskList
          tasks={[task]}
          onEdit={onEdit}
          onDelete={onDelete}
          onToggleComplete={onToggleComplete}
        />
      </Box>
    );
  };
  
  
  const Dashboard = () => {
    const dispatch = useDispatch();
    const [filter, setFilter] = useState('all');
    // const tasks = useSelector((state) => selectFilteredTasks(state, filter));
    const allTasks = useSelector((state) => selectFilteredTasks(state, filter));
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedTask, setSelectedTask] = useState(null);
    const [isModalOpen, setModalOpen] = useState(false);
    const [darkMode, setDarkMode] = useState(false);

    // Filter tasks based on the search query
    const tasks = allTasks.filter((task) =>
    task.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  
    // Add or Edit Task
    const handleAddOrEditTask = (task) => {
      if (selectedTask) {
        dispatch(editTask({ id: selectedTask.id, updatedTask: { ...task, id: selectedTask.id } }));
      } else {
        dispatch(addTask({ ...task, id: uuidv4(), completed: false }));
      }
      setSelectedTask(null);
    };
  
    // Open Confirmation Modal
    const handleDeleteTask = (id) => {
      setSelectedTask({ id });
      setModalOpen(true);
    };
  
    // Confirm Delete Task
    const confirmDelete = () => {
      if (selectedTask) {
        dispatch(deleteTask(selectedTask.id));
      }
      setSelectedTask(null);
      setModalOpen(false);
    };
  
    // Handle Task Reordering
    const moveTask = (fromIndex, toIndex) => {
      const updatedTasks = [...tasks];
      const [movedTask] = updatedTasks.splice(fromIndex, 1);
      updatedTasks.splice(toIndex, 0, movedTask);
      dispatch(reorderTasks(updatedTasks));
    };


    // Theme configuration
  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
      primary: {
        main: '#000042',
      },
      background: {
        default: darkMode ? '#121212' : '#fcfcfc',
      },
    },
  });


  
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <DndProvider backend={HTML5Backend}>
        {/* Header */}
        <AppBar position="static" sx={{ marginBottom: 2, backgroundColor: '#000035' }}>
          <Toolbar>
            <PlaylistAddCheckIcon 
              sx={{ fontSize: 40, marginRight: 2 }} 
              color="inherit" 
            />
            <Typography variant="h6" sx={{ flexGrow: 1, textAlign: 'center', fontFamily: 'Arial, sans-serif', fontWeight: 600, letterSpacing: '0.05em', fontSize: '1.5rem' }}>
              Task Management Dashboard
            </Typography>
            <IconButton
              color="inherit"
              onClick={() => setDarkMode((prevMode) => !prevMode)}
              sx={{ marginLeft: 2 }}
            >
              {darkMode ? <Brightness3 /> : <LightMode />}
            </IconButton>
          </Toolbar>
        </AppBar>

        {/* Search Bar */}
        <Container maxWidth="md" sx={{ marginBottom: 2 }}>
          <TextField
            variant="outlined"
            fullWidth
            placeholder="Search tasks by title...."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            sx={{
              borderRadius: '64px',
              '& .MuiOutlinedInput-root': {
                backgroundColor: theme.palette.mode === 'dark' ? '#222' : '#fff',
              },
              '&.Mui-focused fieldset': {
                borderColor: theme.palette.mode === 'dark' ? '#f0eded' : '#000',
              },
              '& .MuiInputLabel-root': {
                color: theme.palette.mode === 'dark' ? '#ccc' : '#000',
              },
              '& .MuiInputLabel-root.Mui-focused': {
                color: theme.palette.mode === 'dark' ? '#fff' : '000',
              },
            }}
          />
        </Container>

        {/* Main Content */}
        <Container maxWidth="md">
          <Paper sx={{ padding: 3, marginBottom: 2, borderRadius: 2 }}>
            {/* Task Form */}
            <TaskForm
              onSubmit={handleAddOrEditTask}
              initialValues={selectedTask || { title: '', description: '', dueDate: '' }}
              isEdit={!!selectedTask}
            />

            {/* Filter Bar */}
            <FilterBar filter={filter} setFilter={setFilter} />

            {/* Task List */}
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, marginTop: 2 }}>
              {tasks.map((task, index) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  index={index}
                  onEdit={(t) => setSelectedTask(t)}
                  onDelete={() => handleDeleteTask(task.id)}
                  onToggleComplete={(id) => dispatch(toggleComplete(id))}
                  moveTask={moveTask}
                />
              ))}
            </Box>
          </Paper>
        </Container>

        {/* Footer */}
        <Box
          component="footer"
          sx={{
            textAlign: 'center',
            padding: 2,
            backgroundColor: '#000042', // Set footer background color
            color: 'white',             // Set footer text color
            marginTop: 2,
            borderTop: '1px solid',
            borderColor: 'divider',
          }}
        >
          <Typography variant="body2">
            © {new Date().getFullYear()} Brandkiln. All Rights Reserved.
          </Typography>
        </Box>


        {/* Confirmation Modal */}
        <ConfirmationModal
          open={isModalOpen}
          onClose={() => setModalOpen(false)}
          onConfirm={confirmDelete}
        />
      </DndProvider>
    </ThemeProvider>
  );
};

export default Dashboard;
