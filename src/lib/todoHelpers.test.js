import { addTodo, findById, toggleTodo, filterTodos } from "./todoHelpers";
let startTodos;
beforeEach(() => {
  startTodos = [
    { id: 1, name: "one", isComplete: false },
    { id: 2, name: "two", isComplete: false },
    { id: 3, name: "three", isComplete: false }
  ];
});

test("addTodo should add the passed todo to the list", () => {
  const newTodo = { id: 4, name: "four", isComplete: false };
  const expected = [
    { id: 1, name: "one", isComplete: false },
    { id: 2, name: "two", isComplete: false },
    { id: 3, name: "three", isComplete: false },
    { id: 4, name: "four", isComplete: false }
  ];
  const result = addTodo(startTodos, newTodo);
  expect(result).toEqual(expected);
});

test("addTodo should not mutate the existing todo array", () => {
  const newTodo = { id: 4, name: "three", isComplete: false };
  const expected = [
    { id: 1, name: "one", isComplete: false },
    { id: 2, name: "two", isComplete: false },
    { id: 3, name: "three", isComplete: false },
    { id: 4, name: "four", isComplete: false }
  ];
  const result = addTodo(startTodos, newTodo);
  expect(result).not.toBe(startTodos);
});

test("findById should return the expected item from an array", () => {
  const expected = { id: 2, name: "two", isComplete: false };
  const result = findById(2, startTodos);
  expect(result).toEqual(expected);
});

test("toggleTodo should toggle the isComplete prop of a todo", () => {
  let startTodo = { id: 2, name: "two", isComplete: false };
  const expected = { id: 2, name: "two", isComplete: true };
  const result = toggleTodo(startTodo);
  expect(result).toEqual(expected);
});

test("toggleTodo should not mutate the original todo", () => {
  let startTodo = { id: 2, name: "two", isComplete: false };
  const result = toggleTodo(startTodo);
  expect(result).not.toBe(startTodo);
});
test("filterTodos should only return incomplete items for the active route", () => {
  const startTodos = [
    { id: 1, name: "one", isComplete: false },
    { id: 2, name: "two", isComplete: true },
    { id: 3, name: "three", isComplete: false }
  ];
  const expected = [
    { id: 1, name: "one", isComplete: false },
    { id: 3, name: "three", isComplete: false },
  ];
  const result = filterTodos(startTodos, '/active');
  expect(result).toEqual(expected)
});
