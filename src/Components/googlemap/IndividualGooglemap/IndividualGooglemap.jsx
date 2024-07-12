import React, { useRef, useState, useCallback } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import IndividualNav from "./individualNav/IndividualNav.jsx";
import IndividualInfo from "./IndividualInfo/IndividualInfo";
import PlayBar from "./PlayBar/PlayBar.jsx";
import markerUrl from "../SVG/Car/C1.svg";
import "leaflet-fullscreen/dist/Leaflet.fullscreen";

import { MdLocationPin } from "react-icons/md";
import { FcAlarmClock } from "react-icons/fc";
import { SiGoogleearthengine } from "react-icons/si";
import { FaTruck, FaRegSnowflake } from "react-icons/fa";
import { MdAccessTime } from "react-icons/md";
import { BsFillFuelPumpFill } from "react-icons/bs";
import "./IndividualGooglemap.css";

const markerIcon = new L.Icon({
  iconUrl: markerUrl,
  iconSize: [35, 45],
});

// OSM provider configuration
const osmProvider = {
  url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
  attribution:
    '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
};

const initialCenter = {
  lat: 19.9606,
  lng: 79.2961,
};

function IndividualGooglemap({ latitude, longitude, setIndividualMap }) {
  const [showPlayBar, setShowPlayBar] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [center, setCenter] = useState(initialCenter);
  const ZOOM_LEVEL = 7;
  const mapRef = useRef();

  const toggleFullScreen = () => {
    const mapContainer = mapRef.current.leafletElement.getContainer();
    if (!isFullScreen) {
      mapContainer.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
    setIsFullScreen(!isFullScreen);
  };

  const showMyLocation = () => {
    mapRef.current.flyTo([21.128142222222223, 79.10407111111111], 18, {
      animate: true,
    });
  };

  function pairLatLng(latitude, longitude) {
    // Create an array to hold the paired objects
    const pairedArray = [];

    // Loop through the arrays and create objects
    for (let i = 0; i < latitude.length; i++) {
      const latLngObject = [latitude[i], longitude[i]];
      pairedArray.push(latLngObject);
    }

    return pairedArray;
  }

  const points = pairLatLng(latitude, longitude);

  return (
    <>
      <div className="mapContainer">
        <MapContainer
          center={center}
          zoom={ZOOM_LEVEL}
          ref={mapRef}
          style={{ height: "500px", width: "75vw" }}
        >
          <TileLayer
            url={osmProvider.url}
            attribution={osmProvider.attribution}
          />

          {points.map((point, index) => (
            <Marker key={index} position={point} icon={markerIcon}>
              <Popup style={{ fontSize: "1.1rem" }}>
                <div className="popup" style={{ height: "250px" }}>
                  <h2 style={{ marginBottom: "8px" }}>MH31FC1100</h2>
                  <div className="popupInfo">
                    <div className="popupElement">
                      <div>
                        <MdLocationPin style={{ fontSize: "1.1rem" }} />
                      </div>
                      <span style={{ fontSize: "0.9rem", color: "#fff" }}>
                        10, Rajendra Nagar, Yahodha Nagar, Nagpur, Maharashtra
                        440036, India
                      </span>
                    </div>
                    <div className="popupElement">
                      <div>
                        <FcAlarmClock style={{ fontSize: "1.1rem" }} />
                      </div>
                      <span style={{ fontSize: "0.9rem", color: "#fff" }}>
                        12/07/2024 12:51:46
                      </span>
                    </div>
                    <div className="popupElement">
                      <div>
                        <SiGoogleearthengine style={{ fontSize: "1.1rem" }} />
                      </div>
                      <span style={{ fontSize: "0.9rem", color: "#fff" }}>
                        Ignition off
                      </span>
                    </div>
                    <div className="popupElement">
                      <div>
                        <FaTruck style={{ fontSize: "1.1rem" }} />
                      </div>
                      <span style={{ fontSize: "0.9rem", color: "#fff" }}>
                        0 kmph
                      </span>
                    </div>
                    <div className="popupElement">
                      <div>
                        <MdAccessTime style={{ fontSize: "1.1rem" }} />
                      </div>
                      <span style={{ fontSize: "0.9rem", color: "#fff" }}>
                        12D 01H 04M
                      </span>
                    </div>
                    <div className="popupElement">
                      <div>
                        <FaRegSnowflake style={{ fontSize: "1.1rem" }} />
                      </div>
                      <span style={{ fontSize: "0.9rem", color: "#fff" }}>
                        Ac off
                      </span>
                    </div>
                    <div className="popupElement">
                      <div>
                        <BsFillFuelPumpFill style={{ fontSize: "1.1rem" }} />
                      </div>
                      <span style={{ fontSize: "0.9rem", color: "#fff" }}>
                        0.00 L
                      </span>
                    </div>
                  </div>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
      <button onClick={showMyLocation}>Show My Location</button>
      <div>
        {showPlayBar ? null : (
          <IndividualNav
            setIndividualMap={setIndividualMap}
            setShowPlayBar={setShowPlayBar}
          />
        )}
        {showPlayBar ? (
          <PlayBar setShowPlayBar={setShowPlayBar} />
        ) : (
          <IndividualInfo />
        )}
      </div>
    </>
  );
}

export default IndividualGooglemap;
