import React from 'react'
import PropTypes from 'prop-types'

const Todo = ({ onClick, removeTodo, completed, text }) => (
  <li
    onClick={onClick}
    style={{
      textDecoration: completed ? 'line-through' : 'none'
    }}
  >
    {text}
    {' '}
    <button onClick={removeTodo}>Remove</button>
  </li>
)

Todo.propTypes = {
  onClick: PropTypes.func.isRequired,
  removeTodo: PropTypes.func.isRequired,
  completed: PropTypes.bool.isRequired,
  text: PropTypes.string.isRequired
}

export default Todo;