import React from "react";
import { useHistory } from "react-router";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import PersonIcon from "@mui/icons-material/Person";
import SearchIcon from "@mui/icons-material/Search";
import MapIcon from "@mui/icons-material/Map";

const ActionsBar = () => {
  const history = useHistory();
  const handleSubmit = (ev) => {
    const inputValue = ev.target.elements[0].value;
    ev.preventDefault();
    history.push({
      pathname: `/search/${inputValue}`,
    });
  };

  return (
    <Wrapper>
      <MapMeetings to="/map">
        <MapIcon color="success" style={{ color: "white", marginTop: 7 }} />
      </MapMeetings>
      <ProfilIcon to="/profile">
        <PersonIcon color="success" style={{ color: "white", marginTop: 7 }} />
      </ProfilIcon>
      <SearchBar onSubmit={handleSubmit}>
        <Input placeholder="sport:" />
        <Button>
          <SearchIcon style={{ fontSize: 20 }} />
        </Button>
      </SearchBar>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: end;
  padding: 5px;
  background: radial-gradient(
      ellipse farthest-corner at right bottom,
      #fedb37 0%,
      #fdb931 8%,
      #9f7928 30%,
      #8a6e2f 40%,
      transparent 80%
    ),
    radial-gradient(
      ellipse farthest-corner at left top,
      #ffffff 0%,
      #ffffac 8%,
      #d1b464 25%,
      #5d4a1f 62.5%,
      #5d4a1f 100%
    );
`;

const MapMeetings = styled(NavLink)`
  color: black;
  font-weight: bold;
  margin-right: 60px;

  cursor: pointer;
  align-self: baseline;
  margin-bottom: 0;
  width: 5px;
`;

const ProfilIcon = styled(NavLink)`
  color: black;
  font-weight: bold;
  margin-right: 60px;

  cursor: pointer;
  align-self: baseline;
  margin-bottom: 0;
  width: 5px;
`;

const SearchBar = styled.form`
  display: flex;
  align-items: center;
  background-color: white;
  border-radius: 5px;
  margin-left: 15px;
  margin-right: 10px;
`;

const Input = styled.input`
  width: 50px;
  font-size: 15px;
  margin: 0;
  border: none;

  &:hover {
    outline: none;
    background-color: white;
    color: grey;
    width: 90px;
  }

  &:focus {
    outline: none;
    background-color: white;
    color: grey;
    width: 90px;
  }
`;

const Button = styled.button`
  border: none;
  background-color: white;
  cursor: pointer;
  background-color: transparent;
`;

export default ActionsBar;
