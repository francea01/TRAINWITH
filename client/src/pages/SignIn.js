import React, { useContext } from "react";
import { useHistory } from "react-router";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { UserContext } from "../contexts/UserContext";

const SignIn = () => {
  const history = useHistory();

  const { email, setEmail, password, setPassword } = useContext(UserContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
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
        localStorage.setItem("token", token);
        history.push("/");
      } else {
        window.alert("Sorry, we didn't find you.");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Wrapper>
      <SignUpLink to="/sign-up">Sign-up</SignUpLink>

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
            onChange={(ev) => {
              setPassword(ev.target.value);
            }}
          />
          <SubmitButton type="submit">Submit</SubmitButton>
        </FormSignIn>
      </DivSignIn>
    </Wrapper>
  );
};

const Wrapper = styled.div``;

const SignInText = styled.h3``;

const DivSignIn = styled.div``;

const FormSignIn = styled.form`
  width: 300px;
  text-align: center;
  margin-left: auto;
  margin-right: auto;
  margin-top: 200px;
  border: 1px solid black;
`;

const Input = styled.input`
  width: 250px;
  margin: 2px;
`;

const SubmitButton = styled.button`
  margin-bottom: 10px;
`;

const SignUpLink = styled(NavLink)``;

export default SignIn;
