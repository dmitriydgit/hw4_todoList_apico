import React, { Component } from 'react';
import Todo from './Todo';
import '../styles/todoGrid.css';

class TodoGrid extends Component {

	render() {
		return (
			<div className="grid">
				<h2>TodoGrid</h2>
				{this.props.tasks.map(task => {
					return (
						<Todo
							key={task.id}
							text={task.text}
							id={task.id}
							isActive={task.isActive}
							onChange={this.props.handleClick.bind(null)}
							onTaskDelete={this.props.onTaskDelete}
						/>)
				})

				}

			</div>
		);
	}
}

export default TodoGrid;
