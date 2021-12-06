import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { MeetingProvider } from "./contexts/MeetingContext";
import { UserProvider } from "./contexts/UserContext";

ReactDOM.render(
  <React.StrictMode>
    <UserProvider>
      <MeetingProvider>
        <App />
      </MeetingProvider>
    </UserProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
