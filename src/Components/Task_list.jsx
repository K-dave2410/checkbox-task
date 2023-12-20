import React, { useState } from 'react';
import Task from './Task';

const TaskList = ({ tasks, onTaskToggle, onTaskEdit, onTaskDelete }) => {
  return (
    <ul>
      {tasks.map(task => (
        <Task
          key={task.id}
          task={task}
          onToggle={() => onTaskToggle(task.id)}
          onEdit={(newTitle) => onTaskEdit(task.id, newTitle)}
          onDelete={() => onTaskDelete(task.id)}
        />
      ))}
    </ul>
  );
};

export default TaskList;