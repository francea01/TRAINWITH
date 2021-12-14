import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import inMemoryJwt from "../inMemoryJwt";
import Header from "../components/Header";
import ActionsBar from "../components/ActionsBar";
import Meeting from "../components/Meeting";
import { MeetingContext } from "../contexts/MeetingContext";
import { CircularProgress } from "@mui/material";

const Profile = ({ meetingSigners, meetingId }) => {
  const { meetings, setMeetings } = useContext(MeetingContext);

  useEffect(() => {
    const getMeetings = async () => {
      const response = await fetch(`/private/profile-meetings`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${inMemoryJwt.getToken()}`,
        },
      });
      const { status, data } = await response.json();

      setMeetings(data);
    };
    getMeetings();

    return () => {
      setMeetings(null);
    };
  }, []);

  return (
    <Wrapper>
      <Header />
      <ActionsBar />
      <DivUpper>
        <UserName>{inMemoryJwt.getParsedToken().userName} </UserName>
        <MyMeetingText>My meetings</MyMeetingText>
      </DivUpper>

      <MyMeetings>
        {!meetings ? (
          <CircularDiv>
            <CircularProgress color="success" />
          </CircularDiv>
        ) : meetings.length > 0 ? (
          meetings.map((meeting) => <Meeting meeting={meeting} />)
        ) : (
          "no meeting"
        )}
      </MyMeetings>
    </Wrapper>
  );
};

const Wrapper = styled.div``;

const CircularDiv = styled.div`
  display: flex;
  justify-content: center;
`;

const DivUpper = styled.div`
  padding: 0px;
  display: flex;
  margin-bottom: 0;
  margin-top: 10px;
  background: rgb(117, 126, 136);
  background: linear-gradient(
    23deg,
    rgba(117, 126, 136, 1) 0%,
    rgba(201, 205, 207, 1) 28%,
    rgba(203, 203, 105, 0.5271867612293144) 44%,
    rgba(175, 170, 34, 1) 86%
  );
  box-shadow: 0 4px 2px -2px #f2f3f4;
`;

const MyMeetingText = styled.div`
  margin-top: 80px;
  margin-left: 40px;
  color: whitesmoke;
  font-size: 30px;
`;

const UserName = styled.h4`
  width: 100px;
  height: 100px;
  border: 5px solid gold;
  border-radius: 50%;
  font-size: 18px;
  color: white;
  margin-left: 10px;
  line-height: 100px;
  text-align: center;
  background-color: gray;
`;

const MyMeetings = styled.div`
  margin-top: 40px;
`;

export default Profile;
