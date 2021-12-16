import React, { useContext, useEffect } from "react";
import styled from "styled-components";
import NewMeeting from "../components/NewMeeting";
import Meeting from "./Meeting";
import { CircularProgress } from "@mui/material";
import { MeetingContext } from "../contexts/MeetingContext";
import ErrorTooltip from "./ErrorTooltip";

const Meetings = () => {
  const {
    meetings,
    setMeetings,
    fetchMeetings,
    errorMessage,
    closeErrorMessage,
  } = useContext(MeetingContext);

  const addMeeting = (meeting) => {
    setMeetings([]);
    setMeetings([meeting, ...meetings]);
  };

  useEffect(() => {
    fetchMeetings();
  }, []);

  return (
    <Wrapper>
      <NewMeeting onCreatedMeeting={addMeeting} />
      <Emptydiv></Emptydiv>
      <HomeText>TRAINWITH meetings</HomeText>
      {!meetings ? (
        <CircularDiv>
          <CircularProgress color="success" />
        </CircularDiv>
      ) : meetings.length > 0 ? (
        meetings.map((meeting, key) => <Meeting meeting={meeting} key={key} />)
      ) : (
        "no meeting"
      )}
      {errorMessage && (
        <ErrorTooltip
          errorMessage={errorMessage}
          closeMessage={closeErrorMessage}
        />
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  margin: 10px;
`;

const Emptydiv = styled.div`
  margin-top: 15px;
  border-top: 3px solid #fcf3cf;
`;

const HomeText = styled.h3`
  display: flex;
  justify-content: center;
  margin-bottom: 30px;
  color: white;
  font-size: 30px;
  font-family: "Lato", sans-serif;
`;

const CircularDiv = styled.div`
  display: flex;
  justify-content: center;
`;

export default Meetings;
