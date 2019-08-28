import React from 'react';
import { connect } from 'react-redux';
import { searchTodo } from '~/actions';

class SearchTodo extends React.Component {
    state = {
        searchTodoWord: ''
    }
    searchTodoOnChange = (e) => {
        this.setState({searchTodoWord: e.target.value}, () => {
            if(this.state.searchTodoWord.length > 3){
                this.props.dispatch(searchTodo(this.state.searchTodoWord))
            } else {
                this.props.dispatch(searchTodo(''))
            }
        });
    }
    render(){
        return (
            <div>
                <input onChange={(e) => this.searchTodoOnChange(e)} value={this.state.searchTodoWord} />
            </div>
        );
    }
}
  
export default connect()(SearchTodo)