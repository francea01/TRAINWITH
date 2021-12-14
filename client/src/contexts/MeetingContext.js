import React, { createContext, useState } from "react";

export const MeetingContext = createContext(null);

export const MeetingProvider = ({ children }) => {
  const [sport, setSport] = useState("");
  const [players, setPlayers] = useState("");
  const [address, setAddress] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [notes, setNotes] = useState("");
  const [meetings, setMeetings] = useState(null);

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
      }}
    >
      {children}
    </MeetingContext.Provider>
  );
};
