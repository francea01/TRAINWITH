import React from "react";
import styled from "styled-components";
import inMemoryJwt from "../inMemoryJwt";
import MeetingActions from "./MeetingActions";

const Meeting = ({ meeting }) => {
  return (
    <Wrapper>
      <PostMeeting>
        <PostUser>{meeting.author}</PostUser>
        <Sport>{meeting.sport}</Sport>
        <Date>{meeting.date}</Date>
        <Time>{meeting.time}</Time>
        <Players>
          {meeting.maxPlayers} player{meeting.maxPlayers > 1 ? "s" : ""} maximum
        </Players>
        <Address>{meeting.address.address}</Address>
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
  border-radius: 2px;
  margin: 15px auto;
  background-color: white;

  width: 600px;
`;

const PostMeeting = styled.div`
  display: flex;
  flex-direction: column;
`;

const PostUser = styled.h1`
  font-family: "Racing Sans One", cursive;
  color: #797d7f;
  border-radius: 5px;
  margin: 10px auto;
`;

const Time = styled.h3`
  border-radius: 5px;
  font-family: "Lato", sans-serif;
  margin: 3px;
`;

const TimePost = styled.h4`
  font-size: 14px;
  font-family: "Lato", sans-serif;
  margin-bottom: 2px;

  border-radius: 5px;
  margin: 3px;
`;

const Sport = styled.h4`
  text-align: center;
  padding: 10px;
  font-size: 29px;
  color: whitesmoke;
  font-family: "Goldman", cursive;
  margin: 0;
  background-color: #fdb813;
  background-image: linear-gradient(315deg, #fdb813 0%, #788cb6 74%);
`;

const Players = styled.h4`
  border-radius: 5px;
  font-family: "Lato", sans-serif;
  margin: 3px;
`;

const Address = styled.h4`
  border-radius: 5px;
  font-family: "Lato", sans-serif;
  margin: 3px;
`;

const Date = styled.h4`
  font-size: 20px;
  border-radius: 5px;
  font-family: "Lato", sans-serif;
  margin: 3px;
`;

const Notes = styled.h4`
  margin: 3px;
  font-family: "Lato", sans-serif;
  border-radius: 5px;
`;

export default Meeting;
