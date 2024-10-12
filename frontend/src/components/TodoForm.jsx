import React, { useState, useEffect } from 'react';
import { createTodo, updateTodo } from '../api';
import './TodoForm.css';

const TodoForm = ({ selectedTodo, onSave, onClear }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (selectedTodo) {
      setTitle(selectedTodo.title);
      setDescription(selectedTodo.description);
    } else {
      setTitle('');
      setDescription('');
    }
  }, [selectedTodo]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const todoData = { title, description };

    try {
      if (selectedTodo) {
        await updateTodo(selectedTodo._id, todoData);
      } else {
        await createTodo(todoData);
      }

      onSave();  // Call the onSave callback to refresh the list
      setTitle('');
      setDescription('');
    } catch (error) {
      console.error('Error saving todo:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className='todo-form'>
      
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      ></textarea>
      <button type="submit">{selectedTodo ? 'Update Todo' : 'Add Todo'}</button>
      {selectedTodo && <button type="button" onClick={onClear}>Clear</button>}
    </form>
  );
};

export default TodoForm;
