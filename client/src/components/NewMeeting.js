import React, { useContext, useRef } from "react";
import styled from "styled-components";
import { MeetingContext } from "../contexts/MeetingContext";
import inMemoryJwt from "../inMemoryJwt";
import Map from "./Map";
import Autocomplete from "react-google-autocomplete";

const NewMeeting = ({ onCreatedMeeting }) => {
  const {
    sport,
    setSport,
    players,
    setPlayers,
    address,
    setAddress,
    date,
    setDate,
    time,
    setTime,
    notes,
    setNotes,
  } = useContext(MeetingContext);
  const form = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/private/meeting", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${inMemoryJwt.getToken()}`,
        },
        body: JSON.stringify({
          sport,
          author: inMemoryJwt.getParsedToken().userName,
          players,
          address,
          date,
          time,
          notes,
        }),
      });

      const { status, data } = await response.json();
      if (status === 201) {
        form.current.reset();
        onCreatedMeeting(data);
      } else {
        window.alert("Sorry, something wrong happened");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const getMinDate = () => {
    const today = new Date();
    return `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
  };
  return (
    <Wrapper>
      <Form ref={form} onSubmit={handleSubmit}>
        <NewMeetingText>Post your next Meeting</NewMeetingText>
        <Select onChange={(ev) => setSport(ev.target.value)}>
          <Option disabled selected>
            --Please choose an Activity--
          </Option>
          <Option>Soccer</Option>
          <Option>Football</Option>
          <Option>Basketball</Option>
          <Option>Baseball</Option>
          <Option>Hockey</Option>
          <Option>Cross training</Option>
          <Option>Tennis</Option>
          <Option>Table tennis</Option>
          <Option>Badminton</Option>
          <Option>Cycling</Option>
          <Option>Running</Option>
          <Option>Walking</Option>
          <Option>Hiking</Option>
        </Select>
        <Input
          placeholder="Number players:"
          onChange={(ev) => setPlayers(ev.target.value)}
        />
        {/* <Input
          ref={ref}
          placeholder="Enter an address"
          onChange={(ev) => setAddress(ev.target.value)}
        /> */}
        <Autocomplete
          // process.env ;
          componentRestrictions={{ country: "fr" }}
          options={{
            types: ["geocode", "establishment"],
          }}
          onChange={(ev) => setAddress(ev.target.value)}
        />

        <Input
          type="date"
          min={getMinDate()}
          onChange={(ev) => setDate(ev.target.value)}
        />
        <Input
          placeholder="Start at:"
          onChange={(ev) => setTime(ev.target.value)}
        />
        <InputInfos
          placeholder="Notes..."
          onChange={(ev) => setNotes(ev.target.value)}
        />
        <SubmitBtn type="submit">CREATE</SubmitBtn>
      </Form>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  width: auto;
  margin-top: 30px;
`;

const NewMeetingText = styled.h4`
  text-align: center;
  color: white;
  margin: 0;
  font-family: "Lato", sans-serif;
`;

const Form = styled.form`
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
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 400px;
  height: 300px;
  border: 1px solid black;
  padding: 10px;
  box-shadow: 0 2px 15px 8px grey;
  border-radius: 5px;
  margin: 20px;
  padding: 2px;
`;

const Select = styled.select`
  margin: 3px;
  height: 35px;
  font-family: "Lato", sans-serif;
`;

const Option = styled.option`
  text-align: center;
`;

const Input = styled.input`
  margin: 3px;
  text-align: center;
  height: 35px;
  font-family: "Lato", sans-serif;
`;

const InputInfos = styled.input`
  margin: 3px 3px 5px 3px;
  height: 100px;
  text-align: center;
  font-family: "Lato", sans-serif;
`;

const SubmitBtn = styled.button`
  width: 70px;
  margin: 9px auto;
  padding: 3px;
  border-radius: 5px;
  border: 1px solid white;
  font-family: "Six Caps", sans-serif;
  cursor: pointer;
  background-color: white;
  color: black;
  &:hover {
    border-radius: 5px;
    font-weight: bold;
  }

  &:active {
    color: white;
    background-color: black;
    box-shadow: 1px 1px 20px 2px whitesmoke;
  }
`;

export default NewMeeting;
