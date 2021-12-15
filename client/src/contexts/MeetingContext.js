import React, { createContext, useState } from "react";
import inMemoryJwt from "../inMemoryJwt";

export const MeetingContext = createContext(null);

export const MeetingProvider = ({ children }) => {
  const [sport, setSport] = useState("");
  const [players, setPlayers] = useState("");
  const [address, setAddress] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [notes, setNotes] = useState("");
  const [meetings, setMeetings] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const closeErrorMessage = () => setErrorMessage(null);
  const fetchMeetings = async () => {
    setErrorMessage(null);
    setMeetings(null);
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
        setErrorMessage("An error as occured during meetings fetch");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <MeetingContext.Provider
      value={{
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
        sport,
        setSport,
        meetings,
        setMeetings,
        fetchMeetings,
        errorMessage,
        closeErrorMessage,
      }}
    >
      {children}
    </MeetingContext.Provider>
  );
};
