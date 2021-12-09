import React from "react";
import styled from "styled-components";
import ActionsBar from "../components/ActionsBar";
import Header from "../components/Header";
import Meetings from "../components/Meetings";

const HomeFeed = () => {
  return (
    <Wrapper>
      <Header />
      <ActionsBar />
      <Meetings />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: auto;
  background-color: #34393e;
`;

export default HomeFeed;
