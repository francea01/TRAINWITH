import React, { useState, useEffect, useContext } from "react";
import { MapContainer, TileLayer, Marker, Tooltip } from "react-leaflet";
import styled from "styled-components";
import SearchField from "./SearchField";
import Header from "./Header";
import ActionsBar from "./ActionsBar";
import inMemoryJWTManager from "../inMemoryJwt";
import { Redirect } from "react-router-dom";
import apiKeys from "../apiKeys";
import { CircularProgress } from "@mui/material";
import { MeetingContext } from "../contexts/MeetingContext";
import ErrorTooltip from "./ErrorTooltip";

const Map = () => {
  const [height, setHeight] = useState("600px");
  const [coord, setCoord] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const { meetings, fetchMeetings, errorMessage, closeErrorMessage } =
    useContext(MeetingContext);
  const defaultCoor = [45.5016889, -73.567256];

  useEffect(() => {
    fetchMeetings();
    setIsLoading(false);
    const getLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          showPosition,
          setDefaultPosition
        );
      } else {
        showPosition();
      }
    };

    const showPosition = (position) => {
      setCoord([position.coords.latitude, position.coords.longitude]);
    };

    const setDefaultPosition = () => {
      setCoord(defaultCoor);
    };

    getLocation();
  }, []);

  if (isLoading) {
    return (
      <CircularDiv>
        <CircularProgress color="success" />
      </CircularDiv>
    );
  }

  return (
    <Wrapper>
      {!!!inMemoryJWTManager.getParsedToken() ? (
        <Redirect to="/" />
      ) : (
        <div>
          <Header />
          <ActionsBar />
          <Container>
            {coord ? (
              <MyMap height={height} center={coord} zoom={13}>
                <SearchField apiKey={apiKeys.leaflet} />

                <TileLayer
                  attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.osm.org/{z}/{x}/{y}.png"
                />
                {meetings &&
                  meetings.map((meeting) => {
                    return (
                      <Marker
                        position={[meeting.address.lat, meeting.address.lng]}
                      >
                        <Tooltip permanent>
                          {meeting.author} / {meeting.date} / {meeting.sport}
                        </Tooltip>
                      </Marker>
                    );
                  })}
              </MyMap>
            ) : (
              ""
            )}
            {errorMessage && (
              <ErrorTooltip
                errorMessage={errorMessage}
                closeMessage={closeErrorMessage}
              />
            )}
          </Container>
        </div>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div``;

const Container = styled.div`
  margin: 20px 5px;
  font-size: 24px;
  font-weight: bold;
`;

const CircularDiv = styled.div`
  display: flex;
  justify-content: center;
`;

const MyMap = styled(MapContainer)`
  height: ${(props) => props.height};
  width: 100%;
`;
export default Map;
