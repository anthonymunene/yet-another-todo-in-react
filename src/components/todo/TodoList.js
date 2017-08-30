// @flow
import React from 'react'
import { TodoItem } from './TodoItem'

type Props = {
  todos: Array<Object>,
  handleToggle: Function,
  handleRemove: Function
}
export const TodoList = (props: Props) => (
  <div className="Todo-list">
    <ul>
      {props.todos.map(todo => (
        <TodoItem
          handleToggle={props.handleToggle}
          key={todo.id}
          {...todo}
          handleRemove={props.handleRemove}
        />
      ))}
    </ul>
  </div>
)
