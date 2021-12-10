import React, { useContext } from "react";
import styled from "styled-components";
import inMemoryJwt from "../inMemoryJwt";
import MeetingActions from "./MeetingActions";

const Meeting = ({ meeting }) => {
  return (
    <Wrapper>
      <PostMeeting>
        <PostUser>{inMemoryJwt.getParsedToken().userName}</PostUser>
        <Sport>{meeting.sport}</Sport>
        <Date>{meeting.date}</Date>
        <Time>{meeting.time}</Time>
        <Players>{meeting.maxPlayers} player(s) maximum</Players>
        <Address>{meeting.address}</Address>
        <Notes>Notes: {meeting.notes}</Notes>
        <TimePost> posted: {meeting.createdAt}</TimePost>
      </PostMeeting>
      <MeetingActions
        meetingSigners={meeting.signers}
        meetingComments={meeting.comments}
        meetingId={meeting._id}
      />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 25px;
  margin: 15px auto;
  background-color: white;
  width: 600px;
`;

const PostMeeting = styled.div`
  display: flex;
  flex-direction: column;
`;

const PostUser = styled.h3`
  font-size: 26px;

  border-radius: 5px;
  margin: 10px auto;
`;

const Time = styled.h3`
  border-radius: 5px;
  margin: 3px;
`;

const TimePost = styled.h4`
  font-size: 14px;

  margin-bottom: 2px;

  border-radius: 5px;
  margin: 3px;
`;

const Sport = styled.h4`
  text-align: center;
  padding: 10px;
  margin: 0;
  background-color: blanchedalmond;
`;

const Players = styled.h4`
  border-radius: 5px;
  margin: 3px;
`;

const Address = styled.h4`
  border-radius: 5px;
  margin: 3px;
`;

const Date = styled.h4`
  font-size: 20px;
  border-radius: 5px;
  margin: 3px;
`;

const Notes = styled.h4`
  margin: 3px;

  border-radius: 5px;
`;

export default Meeting;
