const API_URL = 'http://localhost:4000/api/tasks';

export const fetchTasks = () => fetch(API_URL).then(res => res.json());

export const createTask = (taskData) => 
  fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(taskData),
  }).then(res => res.json());

export const updateTask = (id, taskData) => 
  fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(taskData),
  }).then(res => res.json());

export const deleteTask = (id) => 
  fetch(`${API_URL}/${id}`, { method: 'DELETE' });

export const toggleTask = (id) => 
  fetch(`${API_URL}/${id}/toggle`, { method: 'PATCH' }).then(res => res.json());