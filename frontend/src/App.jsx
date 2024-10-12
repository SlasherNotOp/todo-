import React, { useState, useEffect } from 'react';
import TodoList from './components/TodoList';
import TodoForm from './components/TodoForm';
import { getTodos } from './api';
import './App.css';

function App() {
  const [selectedTodo, setSelectedTodo] = useState(null);
  const [todos, setTodos] = useState([]);

  // Function to fetch todos and update state
  const fetchTodos = async () => {
    try {
      const res = await getTodos();
      setTodos(res.data);
    } catch (error) {
      console.error('Error fetching todos:', error);
    }
  };

  // Fetch todos initially when the component mounts
  useEffect(() => {
    fetchTodos();
  }, []);

  const handleEdit = (todo) => {
    setSelectedTodo(todo);
  };

  const handleSave = () => {
    setSelectedTodo(null);
    fetchTodos(); // Re-fetch todos after saving (add/update)
  };

  const handleClear = () => {
    setSelectedTodo(null);
  };

  return (
    <div className="App">

      <div className='con'>
      <h1>Todo App</h1>
      <TodoForm selectedTodo={selectedTodo} onSave={handleSave} onClear={handleClear} />
      </div>
      <TodoList todos={todos} onEdit={handleEdit} fetchTodos={fetchTodos} />
    </div>
  );
}

export default App;
