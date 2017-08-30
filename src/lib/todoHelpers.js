// @flow
export const addTodo = (list: Array<Object>, item: Object) => [...list, item]
export const generateId = () => Math.floor(Math.random() * 1000)
export const findById = (id: number, list: Array<Object>) =>
  list.find(item => item.id === id)
export const toggleTodo = (todo: Object) => ({
  ...todo,
  isComplete: !todo.isComplete
})
export const updateTodo = (list: Array<Object>, updated: Object) => {
  const updatedIndex = list.findIndex(item => item.id === updated.id)
  return [
    ...list.slice(0, updatedIndex),
    updated,
    ...list.slice(updatedIndex + 1)
  ]
}

export const removeTodo = (list: Array<Object>, id: number) => {
  const removeIndex = list.findIndex(item => item.id === id)
  return [...list.slice(0, removeIndex), ...list.slice(removeIndex + 1)]
}

export const filterTodos = (list: Array<Object>, route: string) => {
  switch (route) {
    case '/active':
      return list.filter(item => !item.isComplete)
    case '/complete':
      return list.filter(item => item.isComplete)
    default:
      return list
  }
}
