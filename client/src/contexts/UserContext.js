import React, { createContext, useState } from "react";

export const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <UserContext.Provider
      value={{
        firstName,
        setFirstName,
        lastName,
        setLastName,
        userName,
        setUserName,
        email,
        setEmail,
        password,
        setPassword,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
