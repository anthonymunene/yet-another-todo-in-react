// @flow

type todoObjAlias = {
  id: number,
  name: string,
  isComplete: boolean
}
const baseUrl = 'http://localhost:8080/todos'

export const loadTodos = () => {
  return fetch(baseUrl).then(res => res.json())
}

export const createTodo = (todo: todoObjAlias) => {
  return fetch(baseUrl, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(todo)
  }).then(res => res.json())
}

export const saveTodo = (todo: todoObjAlias) => {
  return fetch(`${baseUrl}/${todo.id}`, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(todo)
  }).then(res => res.json())
}

export const destroyTodo = (id: number) => {
  return fetch(`${baseUrl}/${id}`, {
    method: 'DELETE',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  })
}
