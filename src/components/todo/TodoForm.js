// @flow
import React from 'react'
import PropTypes from 'prop-types'

type Props = {
  currentToDo: string,
  onInputChange: Function,
  handleSubmit: Function
}

export const TodoForm = (props: Props) => (
  <form action="" onSubmit={props.handleSubmit}>
    <input
      type="text"
      value={props.currentToDo}
      onChange={props.onInputChange}
    />
  </form>
)
