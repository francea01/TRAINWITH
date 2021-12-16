import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import inMemoryJWTManager from "../inMemoryJwt";
import inMemoryJwt from "../inMemoryJwt";
import Header from "../components/Header";
import ActionsBar from "../components/ActionsBar";
import Meeting from "../components/Meeting";
import { CircularProgress } from "@mui/material";
import { Redirect } from "react-router-dom";

const Profile = () => {
  const [meetings, setMeetings] = useState(null);

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
  }, []);

  return (
    <Wrapper>
      {!!!inMemoryJWTManager.getParsedToken() ? (
        <Redirect to="/" />
      ) : (
        <div>
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
        </div>
      )}
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
  border-bottom: 2px solid #fcf3cf;
  margin: 10px 10px;
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
  border: 5px solid #fcf3cf;
  border-radius: 50%;
  font-size: 18px;
  color: white;
  margin-left: 10px;
  line-height: 100px;
  text-align: center;
  background-color: #fdb813;
  background-image: linear-gradient(315deg, #fdb813 0%, #788cb6 74%);
  font-family: "Racing Sans One", cursive;
`;

const MyMeetings = styled.div`
  margin-top: 20px;
`;

export default Profile;
