const express = require('express');
const router = express.Router();
const { validateTask } = require('../middleware/validation');

let tasks = [];
let nextId = 1;

router.get('/', (req, res) => {
  res.json(tasks);
});

router.post('/', validateTask, (req, res) => {
  const newTask = {
    id: nextId++,
    title: req.body.title,
    description: req.body.description,
    completed: false,
    createdAt: new Date(),
    priority: req.body.priority
  };
  tasks.push(newTask);
  res.status(201).json(newTask);
});

router.put('/:id', (req, res) => {
  const taskId = parseInt(req.params.id);
  const taskIndex = tasks.findIndex(t => t.id === taskId);
  
  if (taskIndex === -1) return res.status(404).json({ error: 'Task not found' });

  tasks[taskIndex] = {
    ...tasks[taskIndex],
    title: req.body.title || tasks[taskIndex].title,
    description: req.body.description || tasks[taskIndex].description,
    priority: req.body.priority || tasks[taskIndex].priority
  };
  res.json(tasks[taskIndex]);
});

router.delete('/:id', (req, res) => {
  const taskId = parseInt(req.params.id);
  const taskIndex = tasks.findIndex(t => t.id === taskId);
  
  if (taskIndex === -1) return res.status(404).json({ error: 'Task not found' });

  tasks.splice(taskIndex, 1);
  res.status(200).json({ message: 'Task deleted' });
});

router.patch('/:id/toggle', (req, res) => {
  const taskId = parseInt(req.params.id);
  const task = tasks.find(t => t.id === taskId);
  
  if (!task) return res.status(404).json({ error: 'Task not found' });

  task.completed = !task.completed;
  res.json(task);
});

module.exports = router;