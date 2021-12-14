import React, { useRef, useState } from "react";
import styled from "styled-components";

const Comments = ({ comments }) => {
  return comments.map((comment) => {
    return (
      <Wrapper>
        <Div>
          <UserName> {comment.author}</UserName>
          <CommentDate>{comment.createdAt}</CommentDate>
        </Div>
        <UserComment>- {comment.comment}</UserComment>
      </Wrapper>
    );
  });
};

const Wrapper = styled.div`
  border: 1px solid black;
  border-radius: 2px;
`;

const Div = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 5px;
`;

const UserName = styled.div`
  color: grey;
  margin-left: 2px;
  font-size: 18px;
`;

const UserComment = styled.div`
  margin-left: 4px;
`;

const CommentDate = styled.div`
  color: grey;
  font-size: 13px;
`;

export default Comments;
