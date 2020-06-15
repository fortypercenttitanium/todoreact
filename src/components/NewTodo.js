import React, { Component } from "react";

export default class NewTodo extends Component {
	submitHandler = () => {
		const today = new Date();
		this.props.addTodo({
			id: this.props.nextId(),
			title: document.querySelector(".modal-title-input").value,
			description: document.querySelector(".modal-desc-input").value,
			due: document.querySelector(".modal-due-date-input").value,
			priority: document.querySelector(".modal-priority-input").value,
			created: today,
			done: false,
		});

		this.props.toggleModal();

		document.querySelector(".modal-title-input").value = "";
		document.querySelector(".modal-desc-input").value = "";
		document.querySelector(".modal-due-date-input").value = "";
		document.querySelector(".modal-priority-input").value = "";
	};

	render() {
		return (
			<div>
				<div className="new-todo" onClick={this.props.toggleModal}>
					{this.props.modalOpen ? "Close" : "New Todo Item"}
				</div>
				<div
					className="modal"
					style={
						this.props.modalOpen ? { display: "block" } : { display: "none" }
					}
				>
					<div className="modal-title">
						<input
							name="title"
							type="text"
							placeholder="Title"
							className="modal-title-input"
						></input>
					</div>
					<div className="modal-desc">
						<textarea
							name="description"
							placeholder="Description"
							className="modal-desc-input"
						></textarea>
					</div>
					<div className="modal-due-date">
						<label htmlFor="duedate">Due: </label>
						<input
							name="duedate"
							type="date"
							className="modal-due-date-input"
						></input>
					</div>
					<div className="modal-priority">
						<label htmlFor="priority">Priority: </label>
						<select
							type="text"
							className="modal-priority-input"
							defaultValue="Medium"
						>
							<option value="High">High</option>
							<option value="Medium">
								Medium
							</option>
							<option value="Low">Low</option>
						</select>
					</div>
					<div className="submit" onClick={this.submitHandler}>
						Submit
					</div>
				</div>
			</div>
		);
	}
}
