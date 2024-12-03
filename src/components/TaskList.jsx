import React from 'react';
import { Box, Button, Typography, Card, CardContent, CardActions } from '@mui/material';

const TaskList = ({ tasks, onEdit, onDelete, onToggleComplete }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        padding: 2,
        maxWidth: 800,
        margin: '0 auto',
      }}
    >
      {tasks.map((task) => (
        <Card
          key={task.id}
          sx={{
            boxShadow: 3,
            borderRadius: 2,
            padding: 2,
            backgroundColor: task.completed ? '#e8f5e9' : '#ebfaff',
          }}
        >
          <CardContent>
            <Typography 
              variant="h6" 
              component="h3" 
              sx={{
                fontWeight: 'bold',
                color: '#000053',
                marginBottom: 1,
              }}
            >
              {task.title}
            </Typography>
            <Typography variant="body1" sx={{ marginBottom: 1, color: '#000' }}>
              {task.description || 'No description available'}
            </Typography>
            <Typography 
              variant="caption" 
              color="textSecondary" 
              sx={{ display: 'block', marginBottom: 1, color: '#000' }}
            >
              Due: {task.dueDate}
            </Typography>
          </CardContent>
          <CardActions
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'flex-end',
              gap: 1,
            }}
          >
            <Button
              variant="contained"
              color={task.completed ? 'warning' : 'success'}
              onClick={() => onToggleComplete(task.id)}
              size="small"
            >
              {task.completed ? 'Mark as Pending' : 'Mark as Completed'}
            </Button>
            <Button
              variant="outlined"
              color="primary"
              onClick={() => onEdit(task)}
              size="small"
            >
              Edit
            </Button>
            <Button
              variant="outlined"
              color="error"
              onClick={() => onDelete(task.id)}
              size="small"
            >
              Delete
            </Button>
          </CardActions>
        </Card>
      ))}
    </Box>
  );
};

export default TaskList;
