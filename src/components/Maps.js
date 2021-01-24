import React, { useState, useEffect } from "react";
import { Map, Marker, Popup, TileLayer } from "react-leaflet";
import Routing from "./RoutingMachine";
const Maps = () => {
  const [position, setPosition] = useState();
  const [isMapInit, setIsMapInit] = useState(false);
  const [map, setMap] = useState();

  useEffect(() => {
    let data = [];
    data.push(localStorage.getItem("latUser"));
    data.push(localStorage.getItem("longUser"));
    setPosition(data);
  }, []);

  const saveMap = (data) => {
    setMap(data);
    setIsMapInit(true);
  };

  return (
    <Map
      style={{ height: 605, width: "82%", marginLeft: "18%" }}
      center={position}
      zoom={25}
      scrollWheelZoom={true}
      ref={saveMap}
    >
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright"></a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={position}>
        <Popup>Posisi Kantor Polisi</Popup>
      </Marker>
      {isMapInit && <Routing map={map} />}
    </Map>
  );
};
export default Maps;
