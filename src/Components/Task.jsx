import React, { useState } from 'react';

function Task({ task, onToggle, onEdit, onDelete }) {
  const [editing, setEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(task.title);

  const handleEdit = () => {
    setEditing(true);
  };

  const handleSave = () => {
    onEdit(newTitle);
    setEditing(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSave();
    }
  };

  return (
    <>
    <div className='pt-2'>
      <input class="form-check-input mt-4 me-2" type="checkbox" checked={task.completed} onChange={onToggle} />
      {editing ? (
        <input
          type="text"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          onBlur={handleSave}
          onKeyPress={handleKeyPress}
          autoFocus
        />
      ) : (
        <span onDoubleClick={handleEdit}>{task.title}</span>
      )}
      <button className='btn btn-outline-success ms-2 mb-3 mt-3' onClick={handleEdit}>Edit</button>
      <button className='btn btn-outline-danger ms-2' onClick={onDelete}>Delete</button>
    </div>
    </>
  )
}

export default Task