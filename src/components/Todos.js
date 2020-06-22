import React, { Component } from "react";
import PropTypes from "prop-types";
import { formatRelative, parseISO } from "date-fns";
import styled, { css } from "styled-components";

const TodoCard = styled.div`
  display: grid;
  width: 20%;
  max-width: 18rem;
  min-width: 10rem;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(6, auto-fit);
  border: 1px solid black;
  margin: 1.5rem;
  padding: 1rem;
  text-align: center;

  > * {
    word-break: break-word;
    justify-self: center;
    align-self: center;
    margin: 0.8rem;
  }

  @media screen and (max-width: 750px) {
    width: 40%;
    margin: 0.6rem 0.1rem;
    padding: 0 0.5rem;
    > * {
      font-size: 0.8rem;
    }
    > h1 {
      font-size: 1.2rem;
    }
  }
`;

const doneStyle = (props) => css`
  text-decoration: ${(props) => (props.todo.done ? "line-through" : "inherit")};
  color: ${(props) => (props.todo.done ? "grey" : "inherit")};
`;

const TodoTitle = styled.h1`
  ${doneStyle}
  grid-area: 1 / 1 / 2 / 3;
  font-size: 1.3rem;
`;

const TodoDesc = styled.p`
	${doneStyle}
	color: ${(props) => (props.todo.done ? "grey" : "inherit")};
	grid-area: 2 / 1 / 3 / 3;
	font-size: 0.8rem;
`;

const TodoDue = styled.h3`
	${doneStyle}
	color: ${(props) => (props.todo.done ? "grey" : "inherit")};
	grid-area: 3 / 1 / 4 / 3;
	font-size: 1rem;
`;

const TodoPriority = styled.p`
  ${doneStyle}
  grid-area: 4 / 1 / 5 / 3;
  font-size: 1rem;
`;

const TodoCreated = styled.p`
  grid-area: 5 / 1 / 6 / 3;
  font-size: 0.8rem;
  color: rgb(80, 80, 80);
`;

const DoneButton = styled.div`
  grid-area: 6 / 1 / 7 / 2;
  cursor: pointer;
  user-select: none;
`;

const DeleteButton = styled.div`
  grid-area: 6 / 2 / 7 / 3;
  cursor: pointer;
  color: #ff3333;
  user-select: none;
`;

export default class Todos extends Component {
  dueDate = (due, today) => {
    if (formatRelative(due, today).includes(" at 12:00 AM")) {
      return formatRelative(due, today).replace(" at 12:00 AM", "");
    } else return formatRelative(due, today);
  };

  render() {
    const todo = this.props.todo;
    const today = new Date();

    return (
      <TodoCard>
        <TodoTitle todo={todo}>{todo.title}</TodoTitle>
        <TodoDesc todo={todo}>{todo.description}</TodoDesc>
        <TodoDue todo={todo}>
          Due: {this.dueDate(parseISO(todo.due), today)}
        </TodoDue>
        <TodoPriority todo={todo}>Priority: {todo.priority}</TodoPriority>
        <TodoCreated>
          Created: {formatRelative(todo.created, today)}
        </TodoCreated>
        <DoneButton onClick={this.props.toggleComplete.bind(this, todo.id)}>
          Done
        </DoneButton>
        <DeleteButton onClick={this.props.deleteTodo.bind(this, todo.id)}>
          Delete
        </DeleteButton>
      </TodoCard>
    );
  }
}

Todos.propTypes = {
  todo: PropTypes.object.isRequired,
};
