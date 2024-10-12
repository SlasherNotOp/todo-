import React from 'react';
import { updateTodo, deleteTodo } from '../api';

const TodoList = ({ todos, onEdit, fetchTodos }) => {

  // Complete or Undo a todo
  const handleToggleComplete = async (id, isCompleted) => {
    try {
      await updateTodo(id, { isCompleted: !isCompleted });
      fetchTodos(); // Re-fetch todos after marking as complete or undo
    } catch (error) {
      console.error('Error updating todo:', error);
    }
  };

  // Delete a todo
  const handleDelete = async (id) => {
    try {
      await deleteTodo(id);
      fetchTodos(); // Re-fetch todos after deletion
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  return (
    <ul>
      {todos.map((todo) => (
        <li key={todo._id} className={todo.isCompleted ? 'completed' : ''}>
          <h3>{todo.title}</h3>
          <p>{todo.description}</p>
          <button onClick={() => handleToggleComplete(todo._id, todo.isCompleted)}>
            {todo.isCompleted ? 'Undo' : 'Complete'}
          </button>
          <button onClick={() => onEdit(todo)}>Edit</button>
          <button onClick={() => handleDelete(todo._id)}>Delete</button>
        </li>
      ))}
    </ul>
  );
};

export default TodoList;
