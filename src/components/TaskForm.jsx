import React, { useState } from 'react';
import { Box, Button, TextField, Typography, useTheme } from '@mui/material';

const TaskForm = ({ 
  onSubmit, 
  initialValues = { title: '', description: '', dueDate: '' }, 
  isEdit = false 
}) => {
  const [task, setTask] = useState(initialValues);

  const theme = useTheme(); // Access the current theme.

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask({ ...task, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(task);
    setTask({ title: '', description: '', dueDate: '' });
  };


  const textFieldStyles = {
    '& .MuiInputBase-root': {
      color: theme.palette.mode === 'dark' ? '#fff' : '#000',
      backgroundColor: theme.palette.mode === 'dark' ? '#222' : '#fff',
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: theme.palette.mode === 'dark' ? '#ccc' : '#000',
      },
      '&:hover fieldset': {
        borderColor: theme.palette.mode === 'dark' ? '#fff' : '#000',
      },
      '&.Mui-focused fieldset': {
        borderColor: theme.palette.mode === 'dark' ? '#f0eded' : '#000',
      },
    },
    '& .MuiInputLabel-root': {
      color: theme.palette.mode === 'dark' ? '#ccc' : '#000',
    },
    '& .MuiInputLabel-root.Mui-focused': {
      color: theme.palette.mode === 'dark' ? '#fff' : '000',
    },
  };


  return (
    <Box 
      component="form" 
      onSubmit={handleSubmit} 
      sx={{
        maxWidth: 500,
        margin: '0 auto',
        padding: 3,
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        boxShadow: 3,
        borderRadius: 2,
        backgroundColor: theme.palette.mode === 'dark' ? '#000000' : '#fff',
      }}
    >
      <Typography 
        variant="h5" 
        component="h2" 
        sx={{
          textAlign: 'center',
          marginBottom: 2,
          color: theme.palette.mode === 'dark' ? '#ffffff' : '#000042',
          fontWeight: 'bold',
        }}
      >
        {isEdit ? 'Edit Task' : 'Add New Task'}
      </Typography>
      <TextField
        label="Task Title"
        variant="outlined"
        name="title"
        value={task.title}
        onChange={handleChange}
        fullWidth
        required
        sx={textFieldStyles}
      />
      <TextField
        label="Description"
        variant="outlined"
        name="description"
        value={task.description}
        onChange={handleChange}
        fullWidth
        multiline
        rows={4}
        sx={textFieldStyles}
      />
      <TextField
        // label="Due Date"
        variant="outlined"
        name="dueDate"
        type="date"
        value={task.dueDate}
        onChange={handleChange}
        fullWidth
        required
        sx={textFieldStyles}
      />
      <Button 
        type="submit" 
        variant="contained" 
        color="primary"
        fullWidth
        sx={{
          paddingY: 1.5,
          fontWeight: 'bold',
          fontSize: '1rem',
        }}
      >
        {isEdit ? 'Update Task' : 'Add Task'}
      </Button>
    </Box>
  );
};

export default TaskForm;
