import React, { useContext } from "react";
import styled from "styled-components";
import { MeetingContext } from "../contexts/MeetingContext";

const NewMeeting = () => {
  const {
    sport,
    setSport,
    players,
    setPlayers,
    address,
    setAddress,
    date,
    setDate,
    notes,
    setNotes,
  } = useContext(MeetingContext);

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("/private/meeting", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          sport,
          players,
          address,
          date,
          notes,
        }),
      });

      const { status, meeting } = await response.json();
      if (status === 201) {
        // add meeting in storage
      } else {
        window.alert("Sorry, error");
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <Wrapper>
      <Form onSubmit={handleSubmit}>
        <NewMeetingText>Write your next Meeting</NewMeetingText>
        <Input
          placeholder="Sport:"
          onChange={(ev) => setSport(ev.target.value)}
        />
        <Input
          placeholder="Number players:"
          onChange={(ev) => setPlayers(ev.target.value)}
        />
        <Input
          placeholder="Meeting address:"
          onChange={(ev) => setAddress(ev.target.value)}
        />
        <Input
          placeholder="Meeting date:"
          onChange={(ev) => setDate(ev.target.value)}
        />
        <InputInfos
          placeholder="Notes..."
          onChange={(ev) => setNotes(ev.target.value)}
        />

        <SubmitBtn type="submit">LET'S GO!</SubmitBtn>
      </Form>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  width: auto;
`;

const NewMeetingText = styled.h4`
  text-align: center;
  color: white;
`;

const Form = styled.form`
  background-color: lightslategrey;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 350px;
  border: 1px solid black;
  border-radius: 5px;
  margin: 20px;
  padding: 5px;
`;

const Input = styled.input`
  margin: 3px;
  text-align: center;
`;

const InputInfos = styled.input`
  margin: 3px;
  height: 100px;
  text-align: center;
`;

const SubmitBtn = styled.button`
  width: 70px;
  margin: auto;
`;

export default NewMeeting;
