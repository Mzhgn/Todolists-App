import React, { useState } from "react";
import Header from "./Header";
import Todo from "./Todo";

export default function TodoList() {
  const [todos, setTodos] = useState([]);
  const [todoTitle, setTodoTitle] = useState("");
  const [status, setStatus] = useState("all");

  const todoTitleHandler = (event) => {
    setTodoTitle(event.target.value);
  };

  const addTodo = (event) => {
    event.preventDefault();

    let newTodoObj = {
      id: todos.length + 1,
      title: todoTitle,
      completed: false,
    };

    this.setState((prevState) => {
      return {
        todos: [...prevState.todos, newTodoObj],
        todoTitle: "",
      };
    });

    setTodos((prevState) => {
      return [...prevState.todos, newTodoObj];
    });
    setTodoTitle(" ");
  };

  const removeTodo = (todoId) => {
    console.log(todoId);
    let newTodos = todos.filter((todo) => {
      return todo.id !== todoId;
    });

    setTodos(newTodos);
  };

  const editTodo = (todoId) => {
    let newTodos = [...todos];
    newTodos.forEach((todo) => {
      if (todo.id === todoId) {
        todo.completed = !todo.completed;
      }
    });
    setTodos(newTodos);
  };

  const statusHandler = (event) => {
    setStatus(event.target.value);
  };

  return (
    <>
      <Header />
      <form onSubmit={addTodo}>
        <input
          type="text"
          className="todo-input"
          maxLength="40"
          value={state.todoTitle}
          onChange={todoTitleHandler}
        />
        <button className="todo-button" type="submit">
          <i className="fas fa-plus-square"></i>
        </button>
        <div className="select">
          <select name="todos" className="filter-todo" onChange={statusHandler}>
            <option value="all">All</option>
            <option value="completed">Completed</option>
            <option value="uncompleted">Uncompleted</option>
          </select>
        </div>
      </form>

      <div className="todo-container">
        <ul className="todo-list">
          {this.state.status === "uncompleted" &&
            this.state.todos
              .filter((todo) => !todo.completed)
              .map((todo) => (
                <Todo
                  {...todo}
                  key={todo.id}
                  onRemove={removeTodo}
                  onEdit={editTodo}
                />
              ))}
          {this.state.status === "completed" &&
            this.state.todos
              .filter((todo) => todo.completed)
              .map((todo) => (
                <Todo
                  {...todo}
                  key={todo.id}
                  onRemove={removeTodo}
                  onEdit={editTodo}
                />
              ))}
          {this.state.status === "all" &&
            this.state.todos.map((todo) => (
              <Todo
                {...todo}
                key={todo.id}
                onRemove={removeTodo}
                onEdit={editTodo}
              />
            ))}
        </ul>
      </div>
    </>
  );
}
