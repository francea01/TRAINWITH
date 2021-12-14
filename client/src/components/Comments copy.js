import React, { useRef, useState } from "react";
import styled from "styled-components";

const Comments = ({ comments }) => {
  return comments.map((comment) => {
    return (
      <Wrapper>
        {comment.author}
        {comment.comment}
        {comment.createdAt}
      </Wrapper>
    );
  });
};

const Wrapper = styled.div`
  background: rgb(117, 126, 136);
  background: linear-gradient(
    23deg,
    rgba(117, 126, 136, 1) 0%,
    rgba(201, 205, 207, 1) 28%,
    rgba(203, 203, 105, 0.5271867612293144) 44%,
    rgba(34, 175, 99, 1) 86%
  );
`;

export default Comments;
