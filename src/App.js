// @flow
import React, { Component } from 'react'
import logo from './logo.svg'
import './App.css'
import { TodoForm, TodoList, Footer } from './components/todo'
import {
  addTodo,
  generateId,
  findById,
  toggleTodo,
  updateTodo,
  removeTodo,
  filterTodos
} from './lib/todoHelpers'

import { pipe, partial } from './lib/utils'
import { loadTodos, createTodo, saveTodo, destroyTodo } from './lib/todoService'

type State = {
  todos: Array<Object>,
  currentToDo: string,
  errorMessage: string,
  message: string
}

class App extends Component<{}, State> {
  state = {
    todos: [],
    currentToDo: '',
    errorMessage: '',
    message: ''
  }
  static contextTypes = {
    route: React.PropTypes.string
  }
  componentDidMount() {
    loadTodos().then(todos => this.setState({ todos }))
  }
  handleRemove = (id: number, evt: Event) => {
    evt.preventDefault()
    const updatedTodos = removeTodo(this.state.todos, id)
    this.setState({ todos: updatedTodos })
    destroyTodo(id).then(() => this.showTempMessage('Todo removed'))
  }
  handleToggle = (id: number) => {
    const getToggleTodo = pipe(findById, toggleTodo)
    const updated = getToggleTodo(id, this.state.todos)
    const getUpdatedTodos = partial(updateTodo, this.state.todos)
    const updatedTodos = getUpdatedTodos(updated)
    this.setState({ todos: updatedTodos })
    saveTodo(updated).then(() => this.showTempMessage('Todo updated'))
  }
  handleInputChange = (evt: SyntheticEvent<HTMLButtonElement>) => {
    this.setState({ currentToDo: evt.currentTarget.value })
  }
  handleSubmit = (evt: SyntheticEvent<HTMLButtonElement>) => {
    evt.preventDefault()
    const newId = generateId()
    const newTodo = {
      id: newId,
      name: this.state.currentToDo,
      isComplete: false
    }
    const updatedTodos = addTodo(this.state.todos, newTodo)
    this.setState({
      todos: updatedTodos,
      currentToDo: '',
      errorMessage: ''
    })
    createTodo(newTodo).then(() => this.showTempMessage('Todo added'))
  }
  showTempMessage = (msg: string) => {
    this.setState({ message: msg })
    setTimeout(() => this.setState({ message: '' }), 2500)
  }
  handleEmptySubmit = (evt: SyntheticEvent<HTMLButtonElement>) => {
    evt.preventDefault()
    this.setState({
      errorMessage: 'Please supply a todo name'
    })
  }
  render() {
    const submitHandler = this.state.currentToDo
      ? this.handleSubmit
      : this.handleEmptySubmit
    const displayTodos = filterTodos(this.state.todos, this.context.route)
    return (
      <div className="app">
        <div className="app-header">
          <img src={logo} className="app-logo" alt="logo" />
          <h2>React Todos</h2>
        </div>
        <div className="todo-App">
          {this.state.errorMessage && (
            <span className="error">{this.state.errorMessage}</span>
          )}
          {this.state.message && (
            <span className="success">{this.state.message}</span>
          )}
          <TodoForm
            currentToDo={this.state.currentToDo}
            onInputChange={this.handleInputChange}
            handleSubmit={submitHandler}
          />
          <TodoList
            handleToggle={this.handleToggle}
            todos={displayTodos}
            handleRemove={this.handleRemove}
          />
          <Footer />
        </div>
      </div>
    )
  }
}

export default App
