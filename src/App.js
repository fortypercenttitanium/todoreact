import React, { Component } from "react";
import "./App.css";
import Header from "./components/Header";
import TodosContainer from "./components/TodosContainer";
import NewTodo from "./components/NewTodo";
import Signin from "./components/Signin";
import Signup from "./components/Signup";
import LoginReminder from "./components/LoginReminder";
import { auth, db, updateStorage } from "./firebase";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      todosLibrary: [],
      modalOpen: false,
      signupOpen: false,
      signinOpen: false,
      userSignedIn: false,
      userDisplayName: null,
    };
  }

  componentDidMount() {
    auth.onAuthStateChanged((user) => {
      if (user) {
        this.setState({
          userSignedIn: true,
          displayName: user.displayName,
        });
        this.fetchLib(auth.currentUser);
      } else {
        this.setState({
          userSignedIn: false,
        });
      }
    });
  }

  setDisplayName = (name) => {
    this.setState({
      displayName: name,
    });
  };

  setLib = (lib) => {
    if (Array.isArray(lib)) {
      this.setState({
        todosLibrary: lib,
      });
    }
  };

  fetchLib = (user) => {
    db.collection("users")
      .doc(user.uid)
      .get()
      .then((snap) => {
        const lib = snap.data().todosLibrary.map((item) => {
          item.created = item.created.toDate();
          return item;
        });
        this.setLib(lib);
      });
  };

  nextId = () => {
    if (this.state.todosLibrary.length > 0) {
      return this.state.todosLibrary[this.state.todosLibrary.length - 1].id + 1;
    } else return 1;
  };

  toggleComplete = (id) => {
    this.setState({
      todosLibrary: this.state.todosLibrary.map((todo) => {
        if (todo.id === id) {
          todo.done = !todo.done;
        }
        return todo;
      }),
    });
    if (auth.currentUser) {
      updateStorage(auth.currentUser, this.state.todosLibrary);
    }
  };

  addTodo = (todo) => {
    const newLib = this.state.todosLibrary;
    newLib.push(todo);
    this.setState({ todosLibrary: newLib }, this.updateStorage);
    if (auth.currentUser) {
      updateStorage(auth.currentUser, this.state.todosLibrary);
    }
  };

  deleteTodo = (id) => {
    this.setState({
      todosLibrary: this.state.todosLibrary.filter((todo) => {
        return todo.id !== id;
      }),
    });
    if (auth.currentUser) {
      updateStorage(auth.currentUser, this.state.todosLibrary);
    }
  };

  toggleModal = () => {
    this.setState({ modalOpen: !this.state.modalOpen });
  };

  toggleSignup = () => {
    this.setState({ signupOpen: !this.state.signupOpen });
  };

  toggleSignin = () => {
    this.setState({ signinOpen: !this.state.signinOpen });
  };

  render() {
    return (
      <div className="App">
        <Header
          toggleSignup={this.toggleSignup}
          toggleSignin={this.toggleSignin}
          userSignedIn={this.state.userSignedIn}
          displayName={this.state.displayName}
        />
        <LoginReminder userSignedIn={this.state.userSignedIn} />
        <Signup
          signupOpen={this.state.signupOpen}
          toggleSignup={this.toggleSignup}
          setDisplayName={this.setDisplayName}
          library={this.state.todosLibrary}
        />
        <Signin
          signinOpen={this.state.signinOpen}
          toggleSignin={this.toggleSignin}
          fetchLib={this.fetchLib}
        />
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
