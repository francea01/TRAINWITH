import React, { useContext } from "react";
import { useHistory } from "react-router";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
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
        history.push("/sign-in");
      } else {
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Wrapper>
      <SignInLink to="/sign-in">Sign-in</SignInLink>
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
    </Wrapper>
  );
};

const Wrapper = styled.div``;

const SignInLink = styled(NavLink)``;

const Form = styled.form`
  width: 300px;
  text-align: center;
  margin-left: auto;
  margin-right: auto;
  margin-top: 200px;
  border: 1px solid black;
`;

const Input = styled.input`
  width: 250px;
  margin-top: 5px;
  margin-bottom: 5px;
`;

const SubmitBtn = styled.button``;

export default SignUp;
