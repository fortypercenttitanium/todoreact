import React, { Component } from "react";
import Todos from "./Todos";
import styled from "styled-components";

const StyledContainer = styled.div`
  max-width: 90%;
  display: flex;
  flex-wrap: wrap;
  margin: 2rem auto;
  justify-content: center;
  background-color: rgba(80, 80, 80, 0.1);
  @media screen and (max-width: 750px) {
    max-width: 100%;
    margin: 2rem auto;
  }
`;

export default class TodosContainer extends Component {
  render() {
    return (
      <StyledContainer>
        {this.props.library.map((todo) => (
          <Todos
            todo={todo}
            key={todo.id}
            toggleComplete={this.props.toggleComplete}
            deleteTodo={this.props.deleteTodo}
          />
        ))}
      </StyledContainer>
    );
  }
}
