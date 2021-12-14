import React from "react";
import styled from "styled-components";
import { useHistory } from "react-router";
import inMemoryJwt from "../inMemoryJwt";

const Header = () => {
  const history = useHistory();

  const logout = () => {
    inMemoryJwt.ereaseToken();
  };

  return (
    <Wrapper>
      <DivUpper>
        <Button
          onClick={(ev) => {
            ev.preventDefault();
            history.push("/");
          }}
        >
          <Title>TRAINWITH</Title>
        </Button>
        <Icons>
          <LogoutButton
            onClick={(ev) => {
              ev.preventDefault();
              logout();
              history.push("/sign-in");
            }}
          >
            Logout
          </LogoutButton>
        </Icons>
      </DivUpper>
      {/* <BackgroundPic alt={"background-pic"} src={"./img/sportbackground.png"} /> */}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: sticky;
`;

const Button = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
`;

const Title = styled.h1`
  font-family: "Julius Sans One", sans-serif;
  margin-left: 15px;
  margin-bottom: 25px;
  font-size: 38px;
  color: white;
`;

const DivUpper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Icons = styled.div``;

const LogoutButton = styled.button`
  margin-top: 5px;
  margin-right: 15px;
  width: auto;
  height: 26px;
  font-size: 15px;
  font-family: "Julius Sans One", sans-serif;
  background: linear-gradient(45deg, transparent 5%, transparent 5%);
  border: 0;
  border-radius: 5px;
  color: white;
  cursor: pointer;
  outline: transparent;
  &:hover {
    background-color: #ec7063;
  }
`;

export default Header;
