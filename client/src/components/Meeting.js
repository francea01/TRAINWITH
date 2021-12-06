import React from "react";
import styled from "styled-components";
import MeetingActions from "./MeetingActions";

const Meeting = ({ meeting }) => {
  return (
    <Wrapper>
      <PostUser></PostUser>
      <PostMeeting>
        <Sport>Sport: {meeting.sport}</Sport>
        <Players>Players number: {meeting.players}</Players>
        <Address>meeting's address: {meeting.address}</Address>
        <Date>meeting's date: {meeting.date}</Date>
        <Notes>Notes: {meeting.notes}</Notes>
      </PostMeeting>
      <MeetingActions meeting={meeting} />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  border: 1px solid black;
  border-radius: 5px;
  margin: 15px;
  background-color: wheat;
`;

const PostUser = styled.div``;

const PostMeeting = styled.div`
  margin: 5px;
`;

const Sport = styled.h4``;

const Players = styled.h4``;

const Address = styled.h4``;

const Date = styled.h4``;

const Notes = styled.p``;

export default Meeting;
