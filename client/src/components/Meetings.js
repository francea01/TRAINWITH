import React, { useEffect, useState } from "react";
import styled from "styled-components";
import NewMeeting from "../components/NewMeeting";
import inMemoryJwt from "../inMemoryJwt";
import Meeting from "./Meeting";

const Meetings = () => {
  const [meetings, setMeetings] = useState([]);

  const addMeeting = (meeting) => {
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
  }, []);

  return (
    <Wrapper>
      <NewMeeting onCreatedMeeting={addMeeting} />
      <Emptydiv></Emptydiv>
      <HomeText>Next meetings</HomeText>
      {meetings.length > 0
        ? meetings.map((meeting) => <Meeting meeting={meeting} />)
        : "No meetings at this moment."}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  margin: 10px;
`;

const Emptydiv = styled.div`
  margin-top: 15px;
  border-top: 2px solid whitesmoke;
`;

const HomeText = styled.h3`
  display: flex;
  justify-content: center;
  margin-bottom: 30px;
  color: whitesmoke;
  font-size: 30px;
`;

export default Meetings;
