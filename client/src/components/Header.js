import React from "react";
import styled from "styled-components";
import { useHistory } from "react-router";

const Header = () => {
  const history = useHistory();

  const logout = () => {
    localStorage.removeItem("token");
  };

  return (
    <Wrapper>
      <DivUpper>
        <Title>TRAINWITH</Title>
        <LogoutButton
          onClick={() => {
            logout();
            history.push("/sign-in");
          }}
        >
          Logout
        </LogoutButton>
      </DivUpper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  margin-bottom: 10px;
`;

const Title = styled.h1``;

const DivUpper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const LogoutButton = styled.button`
  color: black;
  font-weight: bold;
  text-decoration: none;
  cursor: pointer;
  margin-right: 10px;
  margin-top: 5px;
  border: none;
  font-size: 20px;

  background-color: transparent;
  cursor: pointer;
  &:hover {
    color: red;
  }
`;

export default Header;
