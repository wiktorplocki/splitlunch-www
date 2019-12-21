import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { Header as Navbar } from "../index";

const LinkWrapper = styled.div`
  display: flex;
  justify-content: space-evenly;
  min-width: 200px;
`;

const StyledLink = styled(Link)`
  cursor: pointer;
  background-color: initial;
  color: #006dcc;
  text-decoration: none;
  transition: color 0.1s linear;
  &:active,
  :hover {
    outline: 0;
  }
  &:focus,
  :hover {
    text-decoration: underline;
  }
  &:hover {
    color: #01b6f5;
  }
  &:active {
    color: #005fb2;
  }
`;

const HeaderNavbar = () => (
  <Navbar navbar react-data="headerNavbar">
    <LinkWrapper>
      <StyledLink to="/">Home</StyledLink>
      <StyledLink to="/login">Login / Register</StyledLink>
    </LinkWrapper>
  </Navbar>
);

export default HeaderNavbar;
