import React, { useState, useEffect } from 'react';
import "../styles/posts.css";
import supabase from '../services/supabaseClient';


function Todo() {
  const [task, setTask] = useState('');
  const [todos, setTodos] = useState([]);

  const fetchTodos = async () => {
    const { data, error } = await supabase.from('todos').select('*');
    if (error) {
      console.error('Error fetching todos:', error);
    } else {
      setTodos(data);
    }
  };

  const addTodo = async () => {
    if (task.trim() === '') return;
    const { data, error } = await supabase
      .from('todos')
      .insert([{ task, is_complete: false }]);
    if (error) {
      console.error('Error adding todo:', error);
    } else {
      setTask('');
      fetchTodos();
    }
  };

  const toggleTodo = async (id, isComplete) => {
    const { data, error } = await supabase
      .from('todos')
      .update({ is_complete: !isComplete })
      .eq('id', id);
    if (error) {
      console.error('Error toggling todo:', error);
    } else {
      fetchTodos();
    }
  };

  return (
    <div>
      <h1>Todo App</h1>
      <div>
        <input
          type="text"
          placeholder="Add a new task"
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
        <button onClick={addTodo}>Add</button>
      </div>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <input
              type="checkbox"
              checked={todo.is_complete}
              onChange={() => toggleTodo(todo.id, todo.is_complete)}
            />
            {todo.task}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Todo;