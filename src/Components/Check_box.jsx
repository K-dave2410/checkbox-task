import React, { useEffect, useState } from 'react'
import TaskList from './Task_list';
import { Button, Modal } from 'react-bootstrap';

function Check_box() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('all');
  const [newTask, setNewTask] = useState('');
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    if (storedTasks.length > 0) {
      setTasks(storedTasks);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);


  const addTask = () => {
    if (newTask.trim() !== '') {
      setTasks([...tasks, { id: Date.now(), title: newTask, completed: false }]);
      setNewTask('');
    }
    setShow(false);
  };

  const toggleTask = (taskId) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const editTask = (taskId, newTitle) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, title: newTitle } : task
      )
    );
  };

  const deleteTask = (taskId) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === 'completed') {
      return task.completed;
    } else if (filter === 'uncompleted') {
      return !task.completed;
    } else {
      return true;
    }
  });

  const showFilterButtons = tasks.length > 0;

  return (
    <>
      <div className='main_div'>
        <h1>Task List</h1>
        <button className='btn btn-outline-primary mb-3' onClick={handleShow}>Add Item</button>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Todo Task List</Modal.Title>
          </Modal.Header>
          <Modal.Body>
        <div>
          <label htmlFor="" className='fs-5'>Title :</label><br />
          <input
            type="text"
            className='div_input pt-2 pb-2 ps-2 w-100'
            placeholder="Add a new title..."
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
          />
        </div>
          </Modal.Body>
          <Modal.Footer>
            <Button className='btn btn-outline-dark mt-3 ms-2' onClick={addTask}>
              Submit
            </Button>
          </Modal.Footer>
        </Modal>
        {showFilterButtons && (
          <div>
            <button
              className={`btn btn btn-outline-dark ${filter === 'all' ? 'active' : ''}`}
              onClick={() => setFilter('all')}
            >
              All
            </button>
            <button
              className={`btn btn btn-outline-dark ms-2 ${filter === 'completed' ? 'active' : ''}`}
              onClick={() => setFilter('completed')}
            >
              Completed
            </button>
            <button
              className={`btn btn btn-outline-dark ms-2 ${filter === 'uncompleted' ? 'active' : ''}`}
              onClick={() => setFilter('uncompleted')}
            >
              Uncompleted
            </button>
          </div>
        )}
        <TaskList
          tasks={filteredTasks}
          onTaskToggle={toggleTask}
          onTaskEdit={editTask} 
          onTaskDelete={deleteTask}
        />
        {/* <div>
          <input
            type="text"
            className='div_input ms-2 pt-2 pb-2 ps-2'
            placeholder="Add a new task"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
          />
        </div> */}
        {/* <button className='btn btn-outline-dark mt-3 ms-2' onClick={addTask}>Submit</button> */}
      </div>
    </>
  )
}

export default Check_box