import React, { useState, useEffect, useContext } from "react";
import { MapContainer, TileLayer, Marker, Tooltip, Popup } from "react-leaflet";
import styled from "styled-components";
import Geocode from "react-geocode";
import SearchField from "./SearchField";
import Header from "./Header";
import ActionsBar from "./ActionsBar";
import apiKeys from "../apiKeys";
import { MeetingContext } from "../contexts/MeetingContext";
import ErrorTooltip from "./ErrorTooltip";

const Map = () => {
  const [height, setHeight] = useState("600px");
  const [coord, setCoord] = useState();
  const { meetings, fetchMeetings, errorMessage, closeErrorMessage } =
    useContext(MeetingContext);
  const defaultCoor = [45.5016889, -73.567256];

  useEffect(() => {
    fetchMeetings();
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

  return (
    <Wrapper>
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
                  <Marker position={[meeting.address.lat, meeting.address.lng]}>
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
    </Wrapper>
  );
};

const Wrapper = styled.div``;

const Container = styled.div`
  margin: 20px 5px;
  font-size: 24px;
  font-weight: bold;
`;

const MyMap = styled(MapContainer)`
  /*
    Any dynamic styling that will change the
    dynamically generated classname will remove
    the leaflet classnames from the container.
  */
  height: ${(props) => props.height};
  width: 100%;
`;
export default Map;
