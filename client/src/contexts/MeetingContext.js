import React, { createContext, useState } from "react";

export const MeetingContext = createContext(null);

export const MeetingProvider = ({ children }) => {
  const [sport, setSport] = useState("");
  const [players, setPlayers] = useState("");
  const [address, setAddress] = useState("");
  const [date, setDate] = useState("");
  const [notes, setNotes] = useState("");

  return (
    <MeetingContext.Provider
      value={{
        players,
        setPlayers,
        address,
        setAddress,
        date,
        setDate,
        notes,
        setNotes,
        sport,
        setSport,
      }}
    >
      {children}
    </MeetingContext.Provider>
  );
};
