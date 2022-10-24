import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { push } from "connected-react-router";
import { useSelector, useDispatch } from "react-redux";
import { attemptLogout } from "_thunks/auth";
import R from "ramda";
import styled from "styled-components";

const Ul = styled.ul`
  list-style: none;
  display: flex;
  flex-flow: row nowrap;
  z-index: 19;
  text-align: center;
  font-weight: bold;
  height: 100%;
  li {
    color: #f7f7f7;
    padding: 16px 20px;
    cursor: pointer;
  }
  li:hover {
    text-decoration: underline;
  }
  .active {
    background: hsl(204, 86%, 53%);
  }
  a {
    margin: auto 10px;
  }
  .disabled-link {
    pointer-events: none;
  }
  @media only screen and (max-width: 1050px) {
    flex-flow: column nowrap;
    background-color: #292b2c;
    position: fixed;
    transform: ${({ open }) => (open ? "translateX(0)" : "translateX(100%)")};
    top: 0;
    right: 0;
    width: 300px;

    padding-top: 3.5rem;
    transition: transform 0.3s ease-in-out;

    li {
      border-top: solid 2px #f7f7f7;
    }
    a {
      width: 50%;
      margin: 10px auto;
    }
  }
`;

export default function RightNav({ open, setOpen, pathname }) {
  const dispatch = useDispatch();
  const { user } = useSelector(R.pick(["user"]));
  const [auth, setAuth] = useState(!R.isEmpty(user));

  const logout = () => dispatch(attemptLogout()).catch(R.identity);

  useEffect(() => {
    setAuth(!R.isEmpty(user));
  }, [user.username]);

  return (
    <Ul open={open}>
      {!auth && (
        <>
          <a
            className="button is-info is-light"
            onClick={() => {
              dispatch(push("/login"));
              setOpen(!open);
            }}
          >
            Login
          </a>
          <a
            className="button is-info"
            onClick={() => {
              dispatch(push("/register"));
              setOpen(!open);
            }}
          >
            Sign Up
          </a>
        </>
      )}
      {auth && (
        <>
          <li
            className={`${pathname === "/" ? "active" : ""}`}
            onClick={() => dispatch(push("/"))}
          >
            Home
          </li>
          <li
            className={`${pathname === "/stickies" ? "active" : ""}`}
            onClick={() => dispatch(push(auth ? "/stickies" : "/"))}
          >
            Stickies
          </li>

          <li
            className={`${pathname === "/stocks" ? "active" : ""}`}
            onClick={() => dispatch(push(auth ? "/stocks" : "/"))}
          >
            Stocks
          </li>

          <li
            className={`${pathname === "/weather" ? "active" : ""}`}
            onClick={() => dispatch(push(auth ? "/weather" : "/"))}
          >
            Weather
          </li>

          <li
            className={`${pathname === "/news" ? "active" : ""}`}
            onClick={() => dispatch(push(auth ? "/news" : "/"))}
          >
            News
          </li>

          <li
            className={`${pathname === "/calendar" ? "active" : ""}`}
            onClick={() => dispatch(push(auth ? "/calendar" : "/"))}
          >
            Calendar
          </li>
          <a
            onClick={logout}
            onKeyPress={logout}
            className="button is-info is-light"
          >
            Log out
          </a>
        </>
      )}
    </Ul>
  );
}

RightNav.propTypes = {
  pathname: PropTypes.string.isRequired,
};
