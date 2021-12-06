import React, { useEffect, useState } from "react";
import styled from "styled-components";
import NewMeeting from "../components/NewMeeting";
import Meeting from "./Meeting";

const Meetings = () => {
  const [meetings, setMeetings] = useState([]);

  useEffect(async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("/private/meetings", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const { status, data } = await response.json();
      if (status === 200) {
        setMeetings(data);
        Location.reload();
      } else {
        window.alert("Sorry, we didn't find you.");
      }
    } catch (err) {
      console.log(err);
    }
  }, []);

  return (
    <Wrapper>
      <NewMeeting />
      <HomeText>All coming meetings:</HomeText>
      {meetings.length > 0
        ? meetings.map((meeting) => <Meeting meeting={meeting} />)
        : "No meetings at this moment."}
    </Wrapper>
  );
};

const Wrapper = styled.div``;

const HomeText = styled.h3``;

export default Meetings;
