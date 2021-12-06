import React from "react";
import styled from "styled-components";
import Header from "../components/Header";
import Meetings from "../components/Meetings";

const HomeFeed = () => {
  return (
    <Wrapper>
      <Header />
      <Meetings />
    </Wrapper>
  );
};

const Wrapper = styled.div``;

export default HomeFeed;
