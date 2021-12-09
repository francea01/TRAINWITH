import React, { useState } from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import inMemoryJwt from "../inMemoryJwt";
import Header from "../components/Header";
import ActionsBar from "../components/ActionsBar";

const Profile = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <Wrapper>
      <Header />
      <ActionsBar />
      {/* <MainPage to="/">Home page</MainPage> */}
      <UserInfos>
        {selectedImage && (
          <div>
            <ImgProfile
              alt="not fount"
              width={"250px"}
              src={URL.createObjectURL(selectedImage)}
            />
          </div>
        )}
        <UserName>{inMemoryJwt.getParsedToken().userName}</UserName>
        <FirstName>{inMemoryJwt.getParsedToken().firstName}</FirstName>
        <LastName>{inMemoryJwt.getParsedToken().lastName}</LastName>
        <UploadPic
          type="file"
          onChange={(event) => {
            console.log(event.target.files[0]);
            setSelectedImage(event.target.files[0]);
          }}
        />
      </UserInfos>
      <MyMeetings>
        My meetings:
        {/* Every meetings I have created and participate */}
      </MyMeetings>
    </Wrapper>
  );
};

const Wrapper = styled.div``;

const ImgProfile = styled.img`
  width: 150px;
`;

const UploadPic = styled.input``;

const MainPage = styled(NavLink)`
  color: white;
`;

const UserName = styled.h4`
  color: black;
  font-size: 22px;
`;

const FirstName = styled.h4`
  color: black;
`;

const LastName = styled.h4`
  color: black;
`;

const UserInfos = styled.div`
  background-color: goldenrod;
  border: 1px solid black;
  padding: 10px;
  margin-bottom: 10px;
  margin-top: 10px;
`;

const MyMeetings = styled.div``;

export default Profile;
