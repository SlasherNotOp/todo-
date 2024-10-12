const express = require('express');
const router = express.Router();
const Todo = require('../models/Todo');

// @route   GET /api/todos
// @desc    Get all todos
router.get('/', async (req, res) => {
  try {
    const todos = await Todo.find();
    res.json(todos);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});


router.get('/hi', async (req, res) => {
  
    res.send("hello");
 
});



// @route   POST /api/todos
// @desc    Create a new todo
router.post('/', async (req, res) => {
  const { title, description } = req.body;
  try {
    const newTodo = new Todo({
      title,
      description,
    });
    const todo = await newTodo.save();
    res.json(todo);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// @route   PUT /api/todos/:id
// @desc    Update a todo by ID
router.put('/:id', async (req, res) => {
  const { title, description, isCompleted } = req.body;
  try {
    const updatedTodo = await Todo.findByIdAndUpdate(
      req.params.id,
      { title, description, isCompleted },
      { new: true }
    );
    res.json(updatedTodo);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// @route   DELETE /api/todos/:id
// @desc    Delete a todo by ID
router.delete('/:id', async (req, res) => {
  try {
    await Todo.findByIdAndDelete(req.params.id);
    res.json({ message: 'Todo deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
