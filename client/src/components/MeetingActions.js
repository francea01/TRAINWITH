import React, { useState } from "react";
import styled from "styled-components";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import AddCommentIcon from "@mui/icons-material/AddComment";
import inMemoryJwt from "../inMemoryJwt";
import NewComment from "./NewComment";
import Comments from "./Comments";
import ErrorTooltip from "./ErrorTooltip";

const MeetingActions = ({ meetingSigners, meetingComments, meetingId }) => {
  const [showComments, setShowComments] = useState(false);
  const [hasSignerError, setHasSignerError] = useState(false);
  const [numOfPlayers, setNumOfPlayers] = useState(meetingSigners.length);
  const [numOfComments, setNumOfComments] = useState(meetingComments.length);
  const [participate, setParticipate] = useState(
    meetingSigners.some(
      (signerId) => signerId === inMemoryJwt.getParsedToken().userId
    )
  );

  const handlePlayer = async () => {
    try {
      const response = await fetch("/private/meeting/signers", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${inMemoryJwt.getToken()}`,
        },
        body: JSON.stringify({
          meetingId,
        }),
      });
      const { status, data } = await response.json();
      if (status === 201) {
        const userId = inMemoryJwt.getParsedToken().userId;
        setParticipate(!participate);
        setNumOfPlayers((n) => (participate ? n - 1 : n + 1));
        if (!participate) {
          meetingSigners.push(userId);
        } else {
          meetingSigners = meetingSigners.filter((signer) => signer !== userId);
        }
        // get signers names
        // fetch(`/private/users?userIds=${meetingSigners}`, {
        //   method: "GET",
        //   headers: {
        //     "Content-Type": "application/json",
        //     Authorization: `Bearer ${inMemoryJwt.getToken()}`,
        //   },
        // })
        //   .then((res) => res.json())
        //   .then((res) => console.log(res.users));
      } else if (status === 403) {
        setHasSignerError(true);
      } else {
        window.alert("Sorry, an error as occured");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const commentVisibilityHandler = () => {
    setShowComments(!showComments);
  };

  const newCommentHandler = (comment) => {
    meetingComments.push(comment);
    setNumOfComments((n) => n + 1);
  };

  const closeErrorMessage = () => {
    setHasSignerError(false);
  };

  return (
    <Wrapper>
      <ActionIcons>
        <Button onClick={handlePlayer}>
          <HowToRegIcon />
          {numOfPlayers}
        </Button>

        <Button onClick={commentVisibilityHandler}>
          <AddCommentIcon />
          {numOfComments}
        </Button>
      </ActionIcons>
      {showComments && (
        <CommentSection>
          <Comments comments={meetingComments} />
          <NewComment meetingId={meetingId} setNewComment={newCommentHandler} />
        </CommentSection>
      )}
      {hasSignerError && (
        <ErrorTooltip
          errorMessage="The number of players for this meeting is full. Try with an other one"
          closeMessage={closeErrorMessage}
        ></ErrorTooltip>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  margin-top: 10px;
`;

const ActionIcons = styled.div`
  display: flex;
`;

const Button = styled.button`
  display: flex;
  cursor: pointer;
  margin: 5px;
  border: none;
  width: 40px;
  background-color: transparent;
`;

const CommentSection = styled.div`
  display: flex;
  flex-direction: column;
`;

export default MeetingActions;
