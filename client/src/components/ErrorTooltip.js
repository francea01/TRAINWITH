import React from "react";
import styled from "styled-components";

const ErrorTooltip = ({ errorMessage, closeMessage }) => {
  return (
    <Wrapper>
      <Div>
        <Test>{errorMessage}</Test>
      </Div>
      <CloseButton onClick={closeMessage}>x</CloseButton>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: fixed;
  padding: 10px;
  bottom: 16px;
  left: 50%;
  top: 50%;
  transform: translateX(-50%) translateY(-50%);
  width: 350px;
  height: 100px;
  border-radius: 5px;
  background: orange;
  color: white;
  display: flex;
  justify-content: space-between;
`;

const Div = styled.div`
  margin-top: 30px;
`;

const Test = styled.div`
  font-size: 20px;
`;

const CloseButton = styled.button`
  align-self: flex-start;
  margin-right: 0;
  width: 25px;
  height: 25px;
  cursor: pointer;
`;

export default ErrorTooltip;
