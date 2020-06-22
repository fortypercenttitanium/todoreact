import React, { Component } from "react";
import styled from "styled-components";

const NewTodoButton = styled.div`
  font-size: 1rem;
  text-align: center;
  border: 1px solid black;
  border-radius: 2px;
  padding: 1rem;
  width: 10%;
  min-width: 8rem;
  margin: auto;
  cursor: pointer;

  &:hover {
    background-color: rgb(80, 80, 80);
    color: white;
  }
`;

const NewTodoModal = styled.div`
  width: 30%;
  min-width: 16rem;
  max-width: 24rem;
  margin: 1rem auto;
  padding: 1rem;
  background-color: rgba(80, 80, 80, 0.2);
  text-align: center;
  display: ${(props) => (props.modalOpen ? "block" : "none")};
`;

const InputContainer = styled.div`
  margin: 1rem auto;
`;

const StyledInput = styled.input`
  font-size: 1rem;
  margin: 0 1rem;
  padding: 3px;
`;

const StyledTextArea = styled.textarea`
  font-size: 1rem;
  margin: 0 1rem;
  padding: 3px;
`;

const StyledSelect = styled.select`
  font-size: 1rem;
  margin: 0 1rem;
  padding: 3px;
`;

const StyledSubmit = styled.div`
  border: 1px solid black;
  padding: 0.5rem;
  width: 25%;
  min-width: 7rem;
  cursor: pointer;
  margin: auto;

  &:hover {
    background-color: rgba(240, 240, 240, 0.5);
  }
`;

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
  };

  render() {
    return (
      <div>
        <NewTodoButton onClick={this.props.toggleModal}>
          {this.props.modalOpen ? "Close" : "New Todo"}
        </NewTodoButton>
        <NewTodoModal modalOpen={this.props.modalOpen}>
          <InputContainer>
            <StyledInput
              name="title"
              type="text"
              placeholder="Title"
              className="modal-title-input"
              style={{ width: "70%" }}
            ></StyledInput>
          </InputContainer>
          <InputContainer>
            <StyledTextArea
              name="description"
              placeholder="Description"
              className="modal-desc-input"
              style={{ width: "70%", height: "3rem" }}
            ></StyledTextArea>
          </InputContainer>
          <InputContainer>
            <label htmlFor="duedate">Due: </label>
            <StyledInput
              name="duedate"
              type="date"
              className="modal-due-date-input"
              style={{ textAlign: "center" }}
            ></StyledInput>
          </InputContainer>
          <InputContainer>
            <label htmlFor="priority">Priority: </label>
            <StyledSelect
              type="text"
              className="modal-priority-input"
              defaultValue="Medium"
              style={{ textAlign: "center", minWidth: "7rem" }}
            >
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </StyledSelect>
          </InputContainer>
          <StyledSubmit onClick={this.submitHandler}>Submit</StyledSubmit>
        </NewTodoModal>
      </div>
    );
  }
}
