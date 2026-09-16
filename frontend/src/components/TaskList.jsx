import { useState } from 'react';

const TaskList = ({ tasks, onDelete, onToggle, onEdit }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editTitle, setEditTitle] = useState('');
  const [editDescription, setEditDescription] = useState('');

  if (!tasks || tasks.length === 0) {
    return <div>No tasks available</div>;
  }

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === tasks.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? tasks.length - 1 : prev - 1));
  };

  const startEditing = (task) => {
    setEditingTaskId(task.id);
    setEditTitle(task.title);
    setEditDescription(task.description);
  };

  const saveEdit = (id) => {
    onEdit(id, { title: editTitle, description: editDescription });
    setEditingTaskId(null);
  };

  return (
    <div className="simple-carousel">
      <button onClick={prevSlide}>Prev</button>
      
      <div className="carousel-window">
        <div 
          className="carousel-track" 
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {tasks.map((task) => (
            <div key={task.id} className="simple-card">
              {editingTaskId === task.id ? (
                <div className="edit-form">
                  <input 
                    type="text" 
                    value={editTitle} 
                    onChange={(e) => setEditTitle(e.target.value)} 
                  />
                  <input 
                    type="text" 
                    value={editDescription} 
                    onChange={(e) => setEditDescription(e.target.value)} 
                  />
                  <div className="card-buttons">
                    <button onClick={() => saveEdit(task.id)}>Save</button>
                    <button onClick={() => setEditingTaskId(null)}>Cancel</button>
                  </div>
                </div>
              ) : (
                <>
                  <h3>{task.title} (Priority: {task.priority})</h3>
                  <p>{task.description}</p>
                  
                  <div className="card-buttons">
                    <button onClick={() => onToggle(task.id)}>
                      {task.completed ? 'Completed' : 'Pending'}
                    </button>
                    <button onClick={() => startEditing(task)}>Edit</button>
                    <button onClick={() => onDelete(task.id)}>Delete</button>
                  </div>
                </>
              )}

            </div>
          ))}
        </div>
      </div>

      <button onClick={nextSlide}>Next</button>
    </div>
  );
};

export default TaskList;