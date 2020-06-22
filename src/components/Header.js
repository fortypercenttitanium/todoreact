import React, { Component } from "react";
import styled from "styled-components";
import { auth } from "../firebase";
import hamburger from "../images/hamburger.svg";

const StyledHeaderContainer = styled.div`
  display: flex;
  margin: 0 1rem;
`;

const StyledTitle = styled.header`
  font-family: "Cabin Sketch", cursive;
  font-size: 4rem;
  text-align: center;
  margin: 2rem 0;
  flex: 1 0 auto;
  @media screen and (max-width: 950px) {
    font-size: 3rem;
  }
`;

const StyledNavList = styled.nav`
  position: absolute;
  height: 8rem;
  right: 0;
  display: flex;
  list-style: none;
  margin: auto 1rem;
  @media screen and (max-width: 950px) {
    flex-direction: column;
    z-index: 2;
    top: 6rem;
    right: 1px;
    width: 100%;
    margin: 0;
    display: ${(props) => (props.navOpen ? "block" : "none")};
  }
`;

const StyledNavItem = styled.li`
  padding: 1.5rem 1.5rem;
  text-align: center;
  margin: auto;
  transition: 0.7s;
  cursor: pointer;
  &:hover {
    background: rgba(255, 255, 255, 0.3);
    transition: 0.7s;
  }
  @media screen and (max-width: 950px) {
    padding: 1.5rem 0;
    background: rgba(200, 200, 200, 1);
    border: 1px solid grey;
    width: 100%;
  }
`;

const WelcomeMessage = styled.li`
  padding: 1.5rem 1.5rem;
  text-align: center;
  margin: auto;
  display: ${(props) => (props.userSignedIn ? "list-item" : "none")};
  @media screen and (max-width: 950px) {
    display: none;
  }
`;

const Hamburger = styled.div`
  position: absolute;
  height: 8rem;
  right: 3%;
  top: 2.6rem;
  display: none;
  margin: auto 1rem;
  z-index: 3;
  > .hamburger {
    filter: invert(53%) sepia(0%) saturate(0%) hue-rotate(245deg)
      brightness(87%) contrast(98%);
  }
  @media screen and (max-width: 950px) {
    display: block;
  }
`;

export class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      navOpen: false,
    };
  }

  toggleNav = () => {
    this.setState({
      navOpen: !this.state.navOpen,
    });
  };

  signupHandle = () => {
    this.props.toggleSignup();
    if (this.state.navOpen) {
      this.toggleNav();
    }
  };

  signinHandle = () => {
    this.props.toggleSignin();
    if (this.state.navOpen) {
      this.toggleNav();
    }
  };

  logoutHandler = () => {
    auth.signOut().catch((err) => console.log(err));
    window.location.reload();
  };

  render() {
    return (
      <StyledHeaderContainer>
        <StyledTitle>Todo List</StyledTitle>
        <StyledNavList navOpen={this.state.navOpen}>
          <WelcomeMessage userSignedIn={this.props.userSignedIn}>
            Hi, {this.props.displayName}!
          </WelcomeMessage>
          <StyledNavItem
            onClick={this.signinHandle.bind(this)}
            style={{ display: this.props.userSignedIn ? "none" : "list-item" }}
          >
            Sign in
          </StyledNavItem>
          <StyledNavItem
            onClick={this.signupHandle.bind(this)}
            style={{ display: this.props.userSignedIn ? "none" : "list-item" }}
          >
            Signup
          </StyledNavItem>
          <StyledNavItem
            onClick={this.logoutHandler}
            style={{ display: this.props.userSignedIn ? "list-item" : "none" }}
          >
            Logout
          </StyledNavItem>
        </StyledNavList>
        <Hamburger onClick={this.toggleNav}>
          <img src={hamburger} alt="menu" className="hamburger" />
        </Hamburger>
      </StyledHeaderContainer>
    );
  }
}

export default Header;
