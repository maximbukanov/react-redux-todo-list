import { connect } from 'react-redux';
import { toggleTodo, removeTodo, VisibilityFilters } from '~/actions';
import TodoList from '~/components/todo-list';

const getVisibleTodos = (todos, filter) => {
  let items = todos.filter(t => t.visible);
  switch (filter) {
    case VisibilityFilters.SHOW_ALL:
      return items
    case VisibilityFilters.SHOW_COMPLETED:
      return items.filter(t => t.completed)
    case VisibilityFilters.SHOW_ACTIVE:
      return items.filter(t => !t.completed)
    default:
      throw new Error('Unknown filter: ' + filter)
  }
}

const mapStateToProps = state => ({
  todos: getVisibleTodos(state.todos, state.visibilityFilter)
})

const mapDispatchToProps = dispatch => ({
  toggleTodo: id => dispatch(toggleTodo(id)),
  removeTodo: id => dispatch(removeTodo(id))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoList);