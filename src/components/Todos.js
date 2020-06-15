import React, { Component } from "react";
import PropTypes from "prop-types";
import { formatRelative, parseISO } from "date-fns";

export default class Todos extends Component {
	checkDone = () => {
		if (this.props.todo.done) {
			return {
				textDecoration: "line-through",
				color: "grey",
			};
		} else {
			return {
				textDecoration: "inherit",
				color: "inherit",
			};
		}
	};

	dueDate = (due, today) => {
		if (formatRelative(due, today).includes(' at 12:00 AM')) {
			return formatRelative(due, today).replace(' at 12:00 AM', '')
		} else return formatRelative(due, today)
	}

	render() {
		const todo = this.props.todo;
		const today = new Date();

		return (
			<div className="todo-container">
				<h1 className="todo-title" style={this.checkDone()}>
					{todo.title}
				</h1>
				<p className="todo-desc" style={this.checkDone()}>
					{todo.description}
				</p>
				<h3 className="todo-due" style={this.checkDone()}>
					Due: {this.dueDate(parseISO(todo.due), today)}
				</h3>
				<p className="todo-priority" style={this.checkDone()}>
					Priority: {todo.priority}
				</p>
				<p className="todo-created">
					Created: {formatRelative(todo.created, today)}
				</p>
				<div
					className="done-button"
					onClick={this.props.toggleComplete.bind(this, todo.id)}
				>
					Done
				</div>
				<div
					className="delete-button"
					onClick={this.props.deleteTodo.bind(this, todo.id)}
				>
					Delete
				</div>
			</div>
		);
	}
}

Todos.propTypes = {
	todo: PropTypes.object.isRequired,
};
