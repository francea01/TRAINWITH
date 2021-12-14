import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import NewMeeting from "../components/NewMeeting";
import inMemoryJwt from "../inMemoryJwt";
import Meeting from "./Meeting";
import { CircularProgress } from "@mui/material";
import { MeetingContext } from "../contexts/MeetingContext";

const Meetings = () => {
  //   const [meetings, setMeetings] = useState([]);

  const { meetings, setMeetings } = useContext(MeetingContext);

  const addMeeting = (meeting) => {
    setMeetings([]);
    setMeetings([meeting, ...meetings]);
  };

  useEffect(() => {
    const fetchMeetings = async () => {
      try {
        const response = await fetch("/private/meetings", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${inMemoryJwt.getToken()}`,
          },
        });
        const { status, data } = await response.json();

        if (status === 200) {
          setMeetings(data);
        } else {
          window.alert("Sorry, we didn't find you.");
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchMeetings();

    return () => {
      setMeetings(null);
    };
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
    </Wrapper>
  );
};

const Wrapper = styled.div`
  margin: 10px;
`;

const Emptydiv = styled.div`
  margin-top: 15px;
  border-top: 3px solid black;
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
