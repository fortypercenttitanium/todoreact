import React, { Component } from "react";
import Todos from "./Todos";

export default class TodosContainer extends Component {
	render() {
		return (
			<div className="container">
				{this.props.library.map((todo) => (
					<Todos
						todo={todo}
						key={todo.id}
						toggleComplete={this.props.toggleComplete}
						deleteTodo={this.props.deleteTodo}
					/>
				))}
			</div>
		);
	}
}
