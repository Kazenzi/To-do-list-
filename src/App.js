import React, { useState } from 'react';
import TodoForm from './Components/TodoForm';
import TodoItem from './Components/TodoItem';
import './App.css'; // You can add some basic styles later

function App() {
  // State to store our list of todos
  const [todos, setTodos] = useState([]);

  // Function to add a new todo
  const addTodo = (text) => {
    const newTodo = {
      id: Date.now(), // Simple unique ID
      text: text,
      completed: false,
    };
    setTodos([...todos, newTodo]); // Add new todo to the existing array
  };

  // Function to toggle the completion status of a todo
  const toggleComplete = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  // Function to delete a todo
  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <div className="App">
      <h1>My To-Do List</h1>
      <TodoForm addTodo={addTodo} />
      <div className="todo-list">
        {todos.length === 0 ? (
          <p>No tasks yet. Add some!</p>
        ) : (
          <ul>
            {todos.map((todo) => (
              <TodoItem
                key={todo.id} // Important for React list rendering
                todo={todo}
                toggleComplete={toggleComplete}
                deleteTodo={deleteTodo}
              />
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default App;