import { createSelector } from '@reduxjs/toolkit';

export const selectTasks = (state) => state.tasks.tasks;

export const selectFilteredTasks = createSelector(
  [selectTasks, (_, filter) => filter],
  (tasks, filter) => {
    switch (filter) {
      case 'completed':
        return tasks.filter(task => task.completed);
      case 'pending':
        return tasks.filter(task => !task.completed && new Date(task.dueDate) >= new Date());
      case 'overdue':
        return tasks.filter(task => !task.completed && new Date(task.dueDate) < new Date());
      default:
        return tasks;
    }
  }
);
