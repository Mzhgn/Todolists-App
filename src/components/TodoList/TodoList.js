import React, { useState } from "react";
import Header from "./Header";
import Todo from "./Todo";

export default function TodoList() {
  const [todos, setTodos] = useState([]);
  const [todoTitle, setTodoTitle] = useState("");
  const [status, setStatus] = useState("all");

  const todoTitleHandler = (event) => {
    this.setState({
      todoTitle: event.target.value,
    });
  };

  const addTodo = (event) => {
    event.preventDefault();

    let newTodoObj = {
      id: this.state.todos.length + 1,
      title: this.state.todoTitle,
      completed: false,
    };

    this.setState((prevState) => {
      return {
        todos: [...prevState.todos, newTodoObj],
        todoTitle: "",
      };
    });
  };

  const removeTodo = (todoId) => {
    console.log(todoId);
    let newTodos = this.state.todos.filter((todo) => {
      return todo.id !== todoId;
    });

    this.setState({
      todos: newTodos,
    });
  };

  const editTodo = (todoId) => {
    let newTodos = [...this.state.todos];
    newTodos.forEach((todo) => {
      if (todo.id === todoId) {
        todo.completed = !todo.completed;
      }
    });

    this.setState({
      todos: newTodos,
    });
  };

  const statusHandler = (event) => {
    this.setState({
      status: event.target.value,
    });
  };

  return (
    <>
      <Header />
      <form onSubmit={this.addTodo}>
        <input
          type="text"
          className="todo-input"
          maxLength="40"
          value={this.state.todoTitle}
          onChange={this.todoTitleHandler}
        />
        <button className="todo-button" type="submit">
          <i className="fas fa-plus-square"></i>
        </button>
        <div className="select">
          <select
            name="todos"
            className="filter-todo"
            onChange={this.statusHandler}
          >
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
                  onRemove={this.removeTodo}
                  onEdit={this.editTodo}
                />
              ))}
          {this.state.status === "completed" &&
            this.state.todos
              .filter((todo) => todo.completed)
              .map((todo) => (
                <Todo
                  {...todo}
                  key={todo.id}
                  onRemove={this.removeTodo}
                  onEdit={this.editTodo}
                />
              ))}
          {this.state.status === "all" &&
            this.state.todos.map((todo) => (
              <Todo
                {...todo}
                key={todo.id}
                onRemove={this.removeTodo}
                onEdit={this.editTodo}
              />
            ))}
        </ul>
      </div>
    </>
  );
}
