import React from "react";
import "./App.css";
const App = () => {
  const [todos, setTodos] = React.useState([]);
  const [todo, setTodo] = React.useState("");

  const [editingTodos, setEditingTodos] = React.useState(null);
  const [editText, setEditText] = React.useState("");

  // Add the handlesubmit code here
  const handlesubmit = (e) => {

    e.preventDefault();

    const newTodo = {
      id: new Date().getTime(),
      text: todo.trim(),
      completed: false
    }

    if (newTodo.text.length > 0) {
      setTodos([...todos].concat(newTodo));
      setTodo("");
    } else {
      alert("Enter a valid Task");
      setTodo("");
    }
  }

  // Add the deleteToDo code here
  const deleteToDo = (id) => {
    let updatedTodo = [...todos].filter((todo) => todo.id != id);
    setTodos(updatedTodo);
  }

  // Add the toggleComplete code here
  const toggleComplete = (id) => {
    let updatedTodo = [...todos].map((todo) => {
      if (todo.id === id) {
        todo.completed = !todo.completed;
      }
      return todo;
    })
    setTodos(updatedTodo);
  }

  // Add the submitEdits code here
  const submitEdits = (id) => {
    let updatedTodo = [...todos].map((todo) => {
      if (todo.id === id) {
        todo.text = editText;
      }
      return todo;
    })
    setTodos(updatedTodo);
    setEditingTodos(null);
  }

  return (
    <div className="App">
      <h1>Todo List</h1>
      <form onSubmit={handlesubmit}>
        <input
          type="text"
          align="right"
          onChange={(e) => setTodo(e.target.value)}
          value={todo}
          placeholder="Add a task"
        />
        <button type="submit">Add Todo</button>
      </form>
      {todos.map((todo) =>
        <div id="todo-list" className="todo" key={todo.id}>
          <div className="todo-text">
            <input
              className="todo-completed"
              type="checkbox"
              id="completed"
              checked={todo.completed}
              onChange={() => toggleComplete(todo.id)}
            />
            {todo.id === editingTodos ? (
              <input
                type="text"
                onChange={(e) => setEditText(e.target.value)}
              />
            ) : (
              <div>{todo.text}</div>
            )}
          </div>
          <div className="todo-actions">
            {todo.id === editingTodos ? 
              (<button onClick={() => submitEdits(todo.id)}>Submit Edit </button>) : 
              (<button onClick={() => setEditingTodos(todo.id)}>Edit </button>)
            }
            <button onClick={() => deleteToDo(todo.id)}>Delete</button>
          </div>
        </div>
      )}
    </div>
  );
};
export default App;
