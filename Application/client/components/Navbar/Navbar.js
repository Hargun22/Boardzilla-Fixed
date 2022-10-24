import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import Burger from "./Burger";

const Nav = styled.nav`
  width: 100%;
  min-width: 300px;
  height: 55px;
  background: #292b2c;
  color: #f7f7f7;
  box-sizing: border-box;
  padding: 0 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;

  .logo {
    height: 45px;
  }
`;

export default function Navbar({ pathname }) {
  return (
    <Nav>
      <img className="logo" src="/images/logo-light.png" alt="logo" />
      <Burger pathname={pathname} />
    </Nav>
  );
}

Navbar.propTypes = {
  pathname: PropTypes.string.isRequired,
};
