import React, { useRef, useState } from "react";
import styled from "styled-components";
import inMemoryJwt from "../inMemoryJwt";

const NewComment = ({ meetingId, setNewComment }) => {
  const [isLoading, setIsLoading] = useState(false);

  const inputRef = useRef(null);

  const handleAddComment = async (ev) => {
    setIsLoading(true);
    ev.preventDefault();
    try {
      const response = await fetch("/private/meeting/comments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${inMemoryJwt.getToken()}`,
        },
        body: JSON.stringify({
          meetingId,
          comment: inputRef.current.value,
          author: inMemoryJwt.getParsedToken().userName,
        }),
      });
      setIsLoading(false);

      const { status, data } = await response.json();

      if (status === 201) {
        setNewComment(data);
        inputRef.current.value = "";
      } else {
        window.alert("Sorry, an error as occured");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Wrapper>
      <CommentField onSubmit={handleAddComment}>
        <Author>{inMemoryJwt.getParsedToken().userName}:</Author>
        <Input placeholder="New comment" ref={inputRef} required />
        <SendButton type="submit" disabled={isLoading}>
          {!isLoading ? "Send" : "Submitting..."}
        </SendButton>
      </CommentField>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  margin-top: 7px;
  border: 1px solid whitesmoke;
  box-shadow: 0px 0px 10px 1px grey;
  border-radius: 5px;
`;

const Author = styled.p`
  margin: 0;
  background-color: whitesmoke;
  color: #85929e;
`;

const CommentField = styled.form`
  border: 1px solid whitesmoke;
`;

const Input = styled.input`
  box-sizing: border-box;
  width: 100%;
  height: 55px;
  margin-bottom: 4px;
  border: 1px solid #f7f9f9;
  border-radius: 5px;
`;

const SendButton = styled.button`
  display: flex;
  margin: 5px auto;
  padding: 3px;
  cursor: pointer;
  font-family: "Lato", sans-serif;
  border: none;
  background-color: #85929e;
  font-size: 20px;
  padding: auto;
  text-align: center;
  color: white;
  box-shadow: 0px 0px 19px 3px white;

  border-radius: 5px;
  &:hover {
    background-color: orange;
  }
`;

export default NewComment;
