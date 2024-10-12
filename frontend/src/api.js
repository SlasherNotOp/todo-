import axios from 'axios';




const API_URL = 'https://todo-backend-rdvr.onrender.com/api/todos';  // Adjust according to your backend URL

// Fetch all todos
export const getTodos = async () => {
  return await axios.get(API_URL);
};

// Create a new todo
export const createTodo = async (todo) => {
  return await axios.post(API_URL, todo);
};

// Update a todo by ID
export const updateTodo = async (id, updatedTodo) => {
  return await axios.put(`${API_URL}/${id}`, updatedTodo);
};

// Delete a todo by ID
export const deleteTodo = async (id) => {
  return await axios.delete(`${API_URL}/${id}`);
};
