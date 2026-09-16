import { useState, useEffect } from 'react';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import TaskFilter from './components/TaskFilter';
import { fetchTasks, createTask, updateTask, deleteTask, toggleTask } from './services/api';
import './styles/App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchTasks()
      .then(data => {
        setTasks(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching tasks:", err);
        setLoading(false);
      });
  }, []);

  const handleAddTask = async (newTaskData) => {
    try {
      const createdTask = await createTask(newTaskData);
      setTasks([...tasks, createdTask]);
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this task?')) return;
    try {
      await deleteTask(id);
      setTasks(tasks.filter(task => task.id !== id));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const handleToggle = async (id) => {
    try {
      const updatedTask = await toggleTask(id);
      setTasks(tasks.map(task => task.id === id ? updatedTask : task));
    } catch (error) {
      console.error("Error toggling task:", error);
    }
  };

  const handleEdit = async (id, updatedData) => {
    try {
      const updatedTask = await updateTask(id, updatedData);
      setTasks(tasks.map(task => task.id === id ? updatedTask : task));
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === 'completed') return task.completed;
    if (filter === 'pending') return !task.completed;
    return true;
  });

  return (
    <div className="app-container">
      <h1>Helfy Task Manager</h1>
      <TaskForm onAdd={handleAddTask} />
      <hr style={{ margin: '30px 0' }} />
      <TaskFilter currentFilter={filter} onFilterChange={setFilter} />
      {loading ? (
        <div>Loading tasks...</div>
      ) : (
        <TaskList 
          tasks={filteredTasks} 
          onDelete={handleDelete} 
          onToggle={handleToggle} 
          onEdit={handleEdit} 
        />
      )}
    </div>
  );
}

export default App;