// @flow
export const partial = (fn: Function, ...args: Array<mixed>) =>
  fn.bind(null, ...args)
const _pipe = (f, g) => (...args) => g(f(...args))
export const pipe = (...fns: Array<Function>) => fns.reduce(_pipe)
