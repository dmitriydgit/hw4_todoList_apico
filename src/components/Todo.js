import React, { Component } from 'react';
import '../styles/todo.css';
//import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';


class Todo extends Component {
	constructor(props) {
		super(props);
		this.toggleTaskStatus = this.toggleTaskStatus.bind(this);
	}


	toggleTaskStatus(e) {
		var renewedTask = {
			id: this.props.id,
			text: this.props.text,
			isActive: !e.target.checked
		}

		this.props.onChange(renewedTask);
	}

	render() {
		//console.log(this.props)
		var StyleIsActive = {
			textDecoration: 'none',
		};
		var StyleIsCompleted = {
			textDecoration: 'line-through',
			opacity: '0.5'
		};

		return (
			<div id={this.props.id} className='todoItem'>
				<div>

					<input type='checkbox' onChange={this.toggleTaskStatus} checked={!this.props.isActive} />
					<span style={this.props.isActive ? StyleIsActive : StyleIsCompleted}>{this.props.text}</span>
				</div>
				<button className='deleteBtn' onClick={this.props.onTaskDelete.bind(null, this.props.id)}>x</button>
			</div>
		);
	}
}

export default Todo;
