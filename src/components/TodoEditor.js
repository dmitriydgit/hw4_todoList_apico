import React, { Component } from 'react';
import '../styles/todoEditor.css'



class TodoEditor extends Component {

	render() {
		return (
			<div className='tasks-editor'>
				<input id='todo-field' type='text' maxLength="50" minLength="2" placeholder='  What are You going to do?' onKeyUp={this.props.onChange} pattern=".{1,}" />
			</div>
		);
	}
}

export default TodoEditor;
