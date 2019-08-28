import React from 'react'
import Footer from '~/components/footer'
import AddTodo from '~/containers/add-todo'
import SearchTodo from '~/containers/search-todo'
import VisibleTodoList from '~/containers/visible-todo-list'

const App = () => (
  <div>
    <SearchTodo />
    <AddTodo />
    <VisibleTodoList />
    <Footer />
  </div>
)

export default App;