const validateTask = (req, res, next) => {
  const { title, description, priority } = req.body;
  
  if (!title || !description || !priority) {
    return res.status(400).json({ error: 'Title, description, and priority are required' });
  }
  
  next(); 
};

module.exports = { validateTask };