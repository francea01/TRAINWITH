import React from "react";
import styled from "styled-components";

const ErrorTooltip = ({ errorMessage, closeMessage }) => {
  return (
    <Wrapper>
      <Test>{errorMessage}</Test>
      <CloseButton onClick={closeMessage}>close</CloseButton>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: fixed;
  padding: 16px 48px;
  bottom: 16px;
  left: 50%;
  transform: translateX(-50%);
  background: blue;
  display: flex;
  justify-content: space-between;
`;

const Test = styled.div``;

const CloseButton = styled.button``;

export default ErrorTooltip;
