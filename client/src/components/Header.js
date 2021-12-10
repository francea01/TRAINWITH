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
  margin-right: 15px;
  width: 58px;
  height: 36px;
  font-size: 15px;
  font-family: "Julius Sans One", sans-serif;
  background: linear-gradient(45deg, transparent 5%, transparent 5%);
  border: 0;
  border-radius: 5px;
  color: white;
  cursor: pointer;
  outline: transparent;
  position: relative;

  &::after {
    --slice-0: inset(50% 50% 50% 50%);
    --slice-1: inset(80% -6px 0 0);
    --slice-2: inset(50% -6px 30% 0);
    --slice-3: inset(10% -6px 85% 0);
    --slice-4: inset(40% -6px 43% 0);
    --slice-5: inset(80% -6px 5% 0);

    content: "AVAILABLE NOW";
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      45deg,
      transparent 3%,
      #00e6f6 3%,
      #00e6f6 5%,
      #ff013c 5%
    );
    text-shadow: -3px -3px 0px #f8f005, 3px 3px 0px #00e6f6;
    clip-path: var(--slice-0);
  }

  &:hover::after {
    animation: 1s glitch;
    animation-timing-function: steps(2, end);
  }

  @keyframes glitch {
    0% {
      clip-path: var(--slice-1);
      transform: translate(-20px, -10px);
    }
    10% {
      clip-path: var(--slice-3);
      transform: translate(10px, 10px);
    }
    20% {
      clip-path: var(--slice-1);
      transform: translate(-10px, 10px);
    }
    30% {
      clip-path: var(--slice-3);
      transform: translate(0px, 5px);
    }
    40% {
      clip-path: var(--slice-2);
      transform: translate(-5px, 0px);
    }
    50% {
      clip-path: var(--slice-3);
      transform: translate(5px, 0px);
    }
    60% {
      clip-path: var(--slice-4);
      transform: translate(5px, 10px);
    }
    70% {
      clip-path: var(--slice-2);
      transform: translate(-10px, 10px);
    }
    80% {
      clip-path: var(--slice-5);
      transform: translate(20px, -10px);
    }
    90% {
      clip-path: var(--slice-1);
      transform: translate(-10px, 0px);
    }
    100% {
      clip-path: var(--slice-1);
      transform: translate(0);
    }
  }
`;

// const BackgroundPic = styled.img``;

export default Header;
