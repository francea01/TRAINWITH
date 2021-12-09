import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Tooltip, Popup } from "react-leaflet";
import styled from "styled-components";
import Geocode from "react-geocode";

const Map = () => {
  const [height, setHeight] = useState("500px");
  const coord = [48.505, -54.021];

  return (
    <Container>
      <MyMap height={height} center={coord} zoom={13}>
        <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.osm.org/{z}/{x}/{y}.png"
        />
        <Marker position={coord}>
          <Tooltip permanent>Here you are</Tooltip>
        </Marker>
      </MyMap>
    </Container>
  );
};

const Container = styled.div`
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
