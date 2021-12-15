import React, { useContext, useState } from "react";
import { useHistory } from "react-router";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { UserContext } from "../contexts/UserContext";
import inMemoryJWTManager from "../inMemoryJwt";

const SignIn = () => {
  const history = useHistory();
  const [hasFormError, setHasFormError] = useState(false);

  const { email, setEmail, password, setPassword } = useContext(UserContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setHasFormError(false);
    try {
      const response = await fetch("/public/sign-in", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const { status, token } = await response.json();
      if (status === 200) {
        inMemoryJWTManager.setToken(token);
        history.push("/home");
      } else if (status === 404) {
        setHasFormError(true);
      } else {
        window.alert("Sorry, an error as occured, please try again");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Wrapper>
      <Title>TRAINWITH</Title>
      <Separation></Separation>

      <DivSignIn>
        <FormSignIn onSubmit={handleSubmit}>
          <SignInText> Sign In</SignInText>

          <Input
            placeholder="email address"
            autoFocus
            type="email"
            onChange={(ev) => {
              setEmail(ev.target.value);
            }}
          />

          <Input
            placeholder="Password"
            type="password"
            required
            onChange={(ev) => {
              setPassword(ev.target.value);
            }}
          />
          <Error>{hasFormError ? "email or password incorrect." : ""}</Error>
          <SubmitButton type="submit">Submit</SubmitButton>
          <Separation></Separation>
          <SignUpdirection>
            <SignUpText>Start now with TRAINWITH </SignUpText>
            <ButtonSignUp>
              <SignUpLink to="/sign-up">Sign-up</SignUpLink>
            </ButtonSignUp>
          </SignUpdirection>
        </FormSignIn>
      </DivSignIn>
    </Wrapper>
  );
};

const Wrapper = styled.div``;

const Title = styled.h1`
  font-family: "Julius Sans One", sans-serif;
  margin-left: 15px;
  font-size: 38px;
  color: white;
`;

const Error = styled.div`
  color: red;
  height: 18px;
`;

const SignInText = styled.h2``;

const DivSignIn = styled.div``;

const Separation = styled.div`
  border-bottom: 1px solid whitesmoke;
  margin: 0 5px;
`;

const FormSignIn = styled.form`
  padding-top: 10px;
  width: 300px;
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
  margin: 2px;
`;

const SubmitButton = styled.button`
  margin-top: 5px;
  margin-bottom: 30px;
  font-size: 15px;
  border-radius: 5px;
  cursor: pointer;
  border: none;
  border: 2px solid transparent;
  &:hover  {
    border-color: black;
  }
`;

const SignUpdirection = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
`;

const SignUpText = styled.h4``;

const SignUpLink = styled(NavLink)`
  color: black;
  margin-top: 0;
  text-decoration: none;
`;

const ButtonSignUp = styled.button`
  background-color: whitesmoke;
  border: none;
  margin: auto;
  width: fit-content;
  font-size: 15px;
  border-radius: 5px;
  border: 2px solid transparent;
  &:hover  {
    border-color: black;
  }
`;

export default SignIn;
