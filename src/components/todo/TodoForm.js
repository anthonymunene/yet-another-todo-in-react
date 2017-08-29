import React from "react";
import PropTypes from "prop-types";

export const TodoForm = props =>
  <form action="" onSubmit={props.handleSubmit}>
    <input
      type="text"
      value={props.currentToDo}
      onChange={props.onInputChange}
    />
  </form>;

TodoForm.propTypes = {
  currentToDo: PropTypes.string,
  onInputChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired
};
