import React, { useContext } from "react";
import { useHistory } from "react-router";
import { NavLink, Redirect } from "react-router-dom";
import styled from "styled-components";
import inMemoryJWTManager from "../inMemoryJwt";
import { UserContext } from "../contexts/UserContext";

const SignUp = () => {
  const history = useHistory();
  const {
    firstName,
    setFirstName,
    lastName,
    setLastName,
    userName,
    setUserName,
    email,
    setEmail,
    password,
    setPassword,
  } = useContext(UserContext);

  const addingNewUser = async (ev) => {
    ev.preventDefault();
    try {
      const response = await fetch("/public/sign-up", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          firstName,
          lastName,
          userName,
          email,
          password,
        }),
      });
      const { status } = await response.json();
      if (status === 200) {
        history.push("/");
      } else {
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Wrapper>
      {!!inMemoryJWTManager.getParsedToken() ? (
        <Redirect to="/home" />
      ) : (
        <div>
          <SignInLink to="/">Sign-in</SignInLink>
          <Title>TRAINWITH</Title>
          <Separation></Separation>

          <Form onSubmit={addingNewUser}>
            <Input
              type="text"
              placeholder="First name"
              autoFocus
              onChange={(ev) => {
                setFirstName(ev.target.value);
              }}
            />

            <Input
              type="text"
              placeholder="Last name"
              onChange={(ev) => {
                setLastName(ev.target.value);
              }}
            />

            <Input
              type="text"
              placeholder="User name"
              onChange={(ev) => {
                setUserName(ev.target.value);
              }}
            />
            <Input
              type="email"
              placeholder="Your address email"
              onChange={(ev) => {
                setEmail(ev.target.value);
              }}
            />

            <Input
              type="Password"
              placeholder="Your password"
              onChange={(ev) => {
                setPassword(ev.target.value);
              }}
            />

            <SubmitBtn type="submit">Sign-up</SubmitBtn>
          </Form>
        </div>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div``;

const Title = styled.h1`
  font-family: "Julius Sans One", sans-serif;
  margin-left: 15px;
  font-size: 38px;
  color: white;
  margin-bottom: 10px;
  margin-top: 5px;
`;

const SignInLink = styled(NavLink)`
  display: flex;
  justify-content: flex-end;
  font-family: "Julius Sans One", sans-serif;
  margin-right: 10px;
  margin-top: 5px;
  text-decoration: none;
  color: white;
  cursor: pointer;
  font-size: 20px;
  &:hover {
    text-decoration: underline;
    color: whitesmoke;
  }
`;

const Separation = styled.div`
  border-bottom: 1px solid whitesmoke;
  margin: 0 5px;
`;

const Form = styled.form`
  width: 300px;
  padding-top: 10px;
  height: 300px;
  text-align: center;
  background: radial-gradient(
      ellipse farthest-corner at right bottom,
      #fedb37 0%,
      #fdb931 8%,
      #9f7928 30%,
      #8a6e2f 40%,
      transparent 80%
    ),
    radial-gradient(
      ellipse farthest-corner at left top,
      #ffffff 0%,
      #ffffac 8%,
      #d1b464 25%,
      #5d4a1f 62.5%,
      #5d4a1f 100%
    );
  margin-left: auto;
  margin-right: auto;
  margin-top: 200px;

  box-shadow: 1px 1px 15px 5px whitesmoke;
  border-radius: 5px;
`;

const Input = styled.input`
  width: 250px;
  margin-top: 5px;
  margin-bottom: 5px;
`;

const SubmitBtn = styled.button`
  margin-top: 5px;
  margin-bottom: 30px;
  font-size: 15px;
  border-radius: 5px;
  border: none;
  cursor: pointer;
  &:hover  {
    border: 2px solid black;
  }
`;

export default SignUp;
