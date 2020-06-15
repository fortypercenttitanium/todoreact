import React, { Component } from "react";
import "./App.css";
import Header from "./components/Header";
import TodosContainer from "./components/TodosContainer";
import NewTodo from "./components/NewTodo";
import { firebaseConfig } from "./firebaseConfig";

const firebase = require("firebase");
// Required for side-effects
require("firebase/firestore");

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

const fireLibrary = db.collection("todos").doc("library");

class App extends Component {
	constructor(props) {
		super(props);

		this.state = {
			todosLibrary: [],
			modalOpen: false,
		};
	}

	componentDidMount() {
		fireLibrary.get().then((doc) => {
			if (doc.exists && doc.data().todosLibrary) {
				const lib = doc.data().todosLibrary.map(item => {
					item.created = item.created.toDate()
					return item
				})
				this.setState({ todosLibrary: lib });
			} else {
				console.log("Firebase library does not exist");
			}
		});
	}

	updateStorage = () => {
		fireLibrary.get().then((doc) => {
			if (doc.data().todosLibrary !== this.state.todosLibrary) {
				console.log('set: ', this.state.todosLibrary);
				fireLibrary.set({
					todosLibrary: this.state.todosLibrary,
				});
				console.log("Setting Firebase library");
			} else {
				console.log("No storage change made");
			}
		});
	};

	nextId = () => {
		if (this.state.todosLibrary.length > 0) {
			return this.state.todosLibrary[this.state.todosLibrary.length - 1].id + 1;
		} else return 1;
	};

	toggleComplete = (id) => {
		this.setState(
			{
				todosLibrary: this.state.todosLibrary.map((todo) => {
					if (todo.id === id) {
						todo.done = !todo.done;
					}
					return todo;
				}),
			},
			this.updateStorage
		);
	};

	addTodo = (todo) => {
		const newLib = this.state.todosLibrary;
		newLib.push(todo);
		this.setState({ todosLibrary: newLib }, this.updateStorage);
	};

	deleteTodo = (id) => {
		this.setState(
			{
				todosLibrary: this.state.todosLibrary.filter((todo) => {
					return todo.id !== id;
				}),
			},
			this.updateStorage
		);
	};

	toggleModal = () => {
		this.setState({ modalOpen: !this.state.modalOpen });
	};

	render() {
		return (
			<div className="App">
				<Header />
				<NewTodo
					modalOpen={this.state.modalOpen}
					toggleModal={this.toggleModal}
					nextId={this.nextId}
					addTodo={this.addTodo}
				/>
				<TodosContainer
					library={this.state.todosLibrary}
					toggleComplete={this.toggleComplete}
					deleteTodo={this.deleteTodo}
				/>
			</div>
		);
	}
}

export default App;
