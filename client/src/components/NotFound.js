import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import inMemoryJWTManager from "../inMemoryJwt";

const NotFound = () => {
  return (
    <Wrapper>
      {!!inMemoryJWTManager.getToken() ? (
        <Link to="/home">Home</Link>
      ) : (
        <Link to="/">Sign-in</Link>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div``;

const Link = styled(NavLink)`
  font-size: 20px;
  text-decoration: none;
  color: whitesmoke;
  margin: 15px;
`;

export default NotFound;
