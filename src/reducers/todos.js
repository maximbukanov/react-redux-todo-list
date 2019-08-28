const todos = (state = [], action) => {
    switch (action.type) {
      case 'ADD_TODO':
        return [
          ...state,
          {
            id: action.id,
            text: action.text,
            completed: false,
            visible: true
          }
        ]
      case 'TOGGLE_TODO':
        return state.map(todo =>
          todo.id === action.id ? { ...todo, completed: !todo.completed } : todo
        )
      case 'REMOVE_TODO':
        return [...state.filter(item => item.id !== action.id)]
      case 'SEARCH_TODO':
        return state.map(todo => {
          return action.text.toLowerCase().length > 3 && todo.text.toLowerCase().indexOf(action.text.toLowerCase()) === -1 ? {...todo, visible: false} : {...todo, visible: true};
        });
      default:
        return state
    }
  }
  
  export default todos;