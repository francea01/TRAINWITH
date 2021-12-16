import React from "react";
import styled from "styled-components";
import ActionsBar from "../components/ActionsBar";
import Header from "../components/Header";
import Meetings from "../components/Meetings";
import inMemoryJWTManager from "../inMemoryJwt";
import { Redirect } from "react-router-dom";

const HomeFeed = () => {
  return (
    <Wrapper>
      {!!!inMemoryJWTManager.getParsedToken() ? (
        <Redirect to="/" />
      ) : (
        <div>
          <Header />
          <ActionsBar />
          <Meetings />
        </div>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: auto;
  background-color: #34393e;
`;

export default HomeFeed;
