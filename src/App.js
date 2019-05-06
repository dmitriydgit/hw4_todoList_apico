import React, { Component } from 'react';
import TodoGrid from './components/TodoGrid'
import TodoEditor from './components/TodoEditor'
import TASKS from './tasks.json'

import './App.css';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';


class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			tasks: [],
			backupTasks: []
		}
		this.handleInputChange = this.handleInputChange.bind(this);
		this.handleCheckBoxChange = this.handleCheckBoxChange.bind(this);
		this.getTasks = this.getTasks.bind(this);
		this.handleDeleteTask = this.handleDeleteTask.bind(this);
		this.clearCompletedTasks = this.clearCompletedTasks.bind(this);
	}

	componentDidMount() {
		this.setState({
			tasks: TASKS,
			backupTasks: TASKS
		})
	}


	getTasks(arg) {
		if (arg === 'all') {
			return this.state.tasks
		}
		if (arg === 'active') {
			let activeTasks = this.state.tasks.filter(task => {
				return task.isActive === true;
			})
			return activeTasks;
		}
		if (arg === 'completed') {
			let completedTasks = this.state.tasks.filter(task => {
				return task.isActive === false;
			})
			return completedTasks;
		}
	}

	countActive() {
		let activeTasks = this.state.tasks.filter(task => {
			return task.isActive === true
		})
		return `Tasks left ${activeTasks.length}`
	}

	clearCompletedTasks() {

		let newTasks = this.state.tasks.filter(task => {
			return task.isActive === true
		})
		console.log(newTasks)
		this.setState({
			tasks: newTasks,
			backupTasks: newTasks
		})
	}

	handleDeleteTask(id) {

		let taskId = id;
		let renewedTasks = this.state.tasks.filter(task => {
			return task.id !== taskId;
		})
		this.setState({
			tasks: renewedTasks,
			backupTasks: renewedTasks
		})
	}


	handleCheckBoxChange(renewedTask) {
		//console.log(renewedTask);
		//{id: 1557079846317, text: "1", isActive: true}
		var newTasks = this.state.backupTasks.slice();
		var task = newTasks.findIndex(task => task.id === renewedTask.id);
		newTasks.splice(task, 1, renewedTask)
		this.setState({
			tasks: newTasks,
			backupTasks: newTasks
		})

	}

	handleInputChange(e) {
		if (e.keyCode === 13) {
			if (e.target.value.length === 0 || e.target.value === " ") {

				return
			}
			let newTask = {
				id: Date.now(),
				text: e.target.value,
				isActive: true
			}

			var newTasks = this.state.backupTasks.slice();
			newTasks.push(newTask);

			this.setState({
				tasks: newTasks,
				backupTasks: newTasks
			})
			e.target.value = '';
		}
	}

	renderGrid(arg, ...props) {
		return (
			<TodoGrid
				tasks={this.getTasks(arg)}
				handleClick={this.handleCheckBoxChange}
				onTaskDelete={this.handleDeleteTask}
				{...props}
			/>
		)
	}

	render() {
		return (
			<Router >

				<div className='mainFrame'>

					<div className="App">
						<h1>Todo List</h1>
						<TodoEditor onChange={this.handleInputChange} />

						<Route exact path='/'
							render={(props) => this.renderGrid('all')}>
						</Route>
						<Route path='/active'
							render={(props) => this.renderGrid('active')}>
						</Route>
						<Route path='/completed'
							render={(props) => this.renderGrid('completed')}>
						</Route>


						<div className='footer'>
							<span className='footerItem'>{this.countActive()}</span>
							<div className='footerItem'>
								<button> <Link to='/'>All</Link>  </button>
								<button><Link to='/active'>Active</Link></button>
								<button><Link to='/completed'>Completed</Link></button>
							</div>
							<button className='footerItem' onClick={this.clearCompletedTasks}>
								clear completed
							</button>
						</div>
					</div>
				</div>

			</Router >
		);
	}
}

export default App;
