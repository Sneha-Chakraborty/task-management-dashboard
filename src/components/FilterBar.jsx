import React from 'react';
import { Box, Button, Typography, useTheme } from '@mui/material';

const FilterBar = ({ filter, setFilter }) => {
  const theme = useTheme(); // Access the current theme.
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        gap: 2,
        padding: 2,
        backgroundColor: theme.palette.mode === 'dark' ? '#000000' : '#f5f5f5',
        borderRadius: 2,
        boxShadow: 1,
        marginTop: 3,
      }}
    >
      <Typography
        variant="h6"
        sx={{
          alignSelf: 'center',
          color: theme.palette.mode === 'dark' ? '#ffffff' : '#000042',
          fontWeight: 'bold',
        }}
      >
        Filter:
      </Typography>
      <Button
        variant='contained'
        color="primary"
        onClick={() => setFilter('all')}
        sx={{ minWidth: 100 }}
      >
        All
      </Button>
      <Button
        variant={filter === 'completed' ? 'contained' : 'outlined'}
        color="success"
        onClick={() => setFilter('completed')}
        sx={{ minWidth: 100 }}
      >
        Completed
      </Button>
      <Button
        variant={filter === 'pending' ? 'contained' : 'outlined'}
        color="warning"
        onClick={() => setFilter('pending')}
        sx={{ minWidth: 100 }}
      >
        Pending
      </Button>
      <Button
        variant={filter === 'overdue' ? 'contained' : 'outlined'}
        color="error"
        onClick={() => setFilter('overdue')}
        sx={{ minWidth: 100 }}
      >
        Overdue
      </Button>
    </Box>
  );
};

export default FilterBar;
