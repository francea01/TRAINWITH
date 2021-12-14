import React from "react";
import styled from "styled-components";
import ActionsBar from "../components/ActionsBar";
import Header from "../components/Header";
import Meetings from "../components/Meetings";
import Map from "../components/Map";

const HomeFeed = () => {
  return (
    <Wrapper>
      <Header />
      <ActionsBar />
      <Map />
      <Meetings />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: auto;
  background-color: #34393e;
`;

export default HomeFeed;
