import React, { Component } from "react";
import styled from "styled-components";
import { auth, updateStorage } from "../firebase";

const SignupModal = styled.div`
  position: absolute;
  background: rgba(0, 0, 0, 0.5);
  height: 100vh;
  width: 100vw;
  top: 0;
  left: 0;
  z-index: 1;
  display: ${(props) => (props.signupOpen ? "block" : "none")};
`;

const SignUpContainer = styled.div`
  display: block;
  width: 30rem;
  border: 1px solid black;
  background: #dddddd;
  margin: 15vh auto 0;
  text-align: center;
  @media screen and (max-width: 500px) {
    width: 95%;
  }
`;

const StyledInput = styled.input`
  width: 60%;
  height: 1rem;
  padding: 0.2rem;
  margin: 0.3rem auto;
  font-size: 1rem;
`;

const Submit = styled.button`
  width: 6rem;
  padding: 0.5rem;
  margin: 0.5rem auto 1rem;
`;

export class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errorMessage: "",
    };
  }

  signupHandler = (e) => {
    e.preventDefault();
    this.setState({
      errorMessage: "",
    });
    const name = document.querySelector("#sign-up-name-input").value;
    const email = document.querySelector("#sign-up-email-input").value;
    const password = document.querySelector("#sign-up-password-input").value;

    auth
      .createUserWithEmailAndPassword(email, password)
      .then((cred) => {
        auth.currentUser
          .updateProfile({
            displayName: name,
          })
          .then(() => {
            this.props.setDisplayName(auth.currentUser.displayName);
            updateStorage(cred.user, this.props.library);
          })
          .then(() => {
            document.querySelector("#signup-form").reset();
            this.props.toggleSignup();
          });
      })
      .catch((err) => this.errorHandler(err));
  };

  noCloseOnClick = (e) => {
    e.stopPropagation();
  };

  errorHandler = (err) => {
    this.setState({
      errorMessage: err.message,
    });
  };

  render() {
    return (
      <SignupModal
        signupOpen={this.props.signupOpen}
        onClick={this.props.toggleSignup}
      >
        <SignUpContainer onClick={this.noCloseOnClick}>
          <h3 style={{ margin: "1rem auto 0.2rem", padding: "0.4rem" }}>
            Sign up to save todos
          </h3>
          <p style={{ margin: "auto", padding: "0.4rem" }}>
            Your info will not be used outside of this database
          </p>
          <p style={{ color: "red" }}>{this.state.errorMessage}</p>
          <form
            id="signup-form"
            action="submit"
            style={{
              display: "flex",
              flexDirection: "column",
            }}
            onSubmit={this.signupHandler}
          >
            <StyledInput
              type="text"
              name="name"
              id="sign-up-name-input"
              placeholder="Name"
              required
            />
            <StyledInput
              type="email"
              name="email"
              id="sign-up-email-input"
              placeholder="Email address"
              required
            />
            <StyledInput
              type="password"
              name="password"
              id="sign-up-password-input"
              placeholder="Password"
              required
            />
            <Submit type="submit">Submit</Submit>
          </form>
        </SignUpContainer>
      </SignupModal>
    );
  }
}

export default Signup;
