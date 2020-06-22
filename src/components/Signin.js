import React, { Component } from "react";
import styled from "styled-components";
import { auth } from "../firebase";

const SigninModal = styled.div`
  position: absolute;
  background: rgba(0, 0, 0, 0.5);
  height: 100vh;
  width: 100vw;
  top: 0;
  left: 0;
  z-index: 1;
  display: ${(props) => (props.signinOpen ? "block" : "none")};
`;

const SignInContainer = styled.div`
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
  margin: 0.8rem auto 1rem;
`;

export class Signin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errorMessage: "",
    };
  }

  submitHandler = (e) => {
    e.preventDefault();
    this.setState({
      errorMessage: "",
    });
    const email = document.querySelector("#sign-in-email-input").value;
    const password = document.querySelector("#sign-in-password-input").value;

    auth
      .signInWithEmailAndPassword(email, password)
      .then((cred) => {
        document.querySelector("#signin-form").reset();
        this.props.toggleSignin();
        this.props.fetchLib(cred.user);
      })
      .catch((err) => this.errorHandler(err));
  };

  errorHandler = (err) => {
    this.setState({
      errorMessage: err.message,
    });
  };

  noCloseOnClick = (e) => {
    e.stopPropagation();
  };

  render() {
    return (
      <SigninModal
        signinOpen={this.props.signinOpen}
        onClick={this.props.toggleSignin}
      >
        <SignInContainer onClick={this.noCloseOnClick}>
          <h3 style={{ margin: "1rem auto 0.5rem", padding: "0.4rem" }}>
            Sign in to view and save todos
          </h3>
          <p style={{ color: "red" }}>{this.state.errorMessage}</p>
          <form
            action="submit"
            id="signin-form"
            style={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <StyledInput
              type="email"
              name="email"
              id="sign-in-email-input"
              placeholder="Email address"
              required
            />
            <StyledInput
              type="password"
              name="password"
              id="sign-in-password-input"
              placeholder="Password"
              required
            />
            <Submit type="submit" onClick={this.submitHandler}>
              Submit
            </Submit>
          </form>
        </SignInContainer>
      </SigninModal>
    );
  }
}

export default Signin;
