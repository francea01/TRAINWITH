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

      <UserInfos>
        {/* {selectedImage && (
          <div>
            <ImgProfile
              alt="not fount"
              width={"250px"}
              src={URL.createObjectURL(selectedImage)}
            />
          </div>
        )} */}
        <UserName>{inMemoryJwt.getParsedToken().userName}</UserName>
        <DivFullName>
          <FirstName>{inMemoryJwt.getParsedToken().firstName}</FirstName>
          <LastName>{inMemoryJwt.getParsedToken().lastName}</LastName>
        </DivFullName>
        {/* <UploadPic
          type="file"
          onChange={(event) => {
            console.log(event.target.files[0]);
            setSelectedImage(event.target.files[0]);
          }}
        /> */}
      </UserInfos>
      <MyMeetings>
        My meetings:
        {/* Every meetings I have created and participate */}
      </MyMeetings>
    </Wrapper>
  );
};

const Wrapper = styled.div``;

// const ImgProfile = styled.img`
//   width: 150px;
// `;

// const UploadPic = styled.input``;

const UserName = styled.h4`
  color: black;
  font-size: 24px;
  margin-bottom: 0;
`;

const DivFullName = styled.div`
  display: flex;
`;

const FirstName = styled.h4`
  color: black;
  margin-right: 5px;
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
