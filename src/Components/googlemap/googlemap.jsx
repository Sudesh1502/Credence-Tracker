import React, { useEffect, useRef, useState } from "react";
import { MapContainer, Marker, Polyline, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import useGeolocation from "../Hooks/useGeolocation";
import markerUrl from "../googlemap/SVG/Car/C2.svg";
import { MdLocationPin } from "react-icons/md";
import { FcAlarmClock } from "react-icons/fc";
import { FaTruck } from "react-icons/fa6";
import { MdAccessTime } from "react-icons/md";
import { FaRegSnowflake } from "react-icons/fa";
import { BsFillFuelPumpFill } from "react-icons/bs";
import { SiGoogleearthengine } from "react-icons/si";
import "../googlemap/googlemap.css";

// Custom marker icon
const markerIcon = new L.Icon({
  iconUrl: markerUrl,
  iconSize: [35, 45],
});

// OSM provider configuration
const osmProvider = {
  maptiler: {
    url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    attribution:
      '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
  },
};

function GoogleMapComponent({ latitude, longitude }) {
  const [center, setCenter] = useState({ lat: 19.9606, lng: 79.2961 });
  const ZOOM_LEVEL = 7;
  const mapRef = useRef();
  const location = useGeolocation();

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
      <MapContainer
        center={center}
        zoom={ZOOM_LEVEL}
        ref={mapRef}
        style={{ height: "600px", width: "1000px" }}
      >
        <TileLayer
          url={osmProvider.maptiler.url}
          attribution={osmProvider.maptiler.attribution}
        />

        {points.map((point, index) => (
          <Marker key={index} position={point} icon={markerIcon}>
            <Popup style={{fontSize:"1.1rem"}}>
              <div className="popup" style={{height:"250px"}} >
                <h2 style={{marginBottom:"8px"}}>MH31FC1100</h2>
                <div className="popupInfo">
                  {/* start */}
                  <div className="popupElement">
                    <div><MdLocationPin style={{fontSize:"1.1rem"}}/></div>
                    <span style={{fontSize:"0.9rem", color:"#fff"}}>
                      10, Rajendra Nagar, Yahodha Nagar, Nagpur, Maharashtra
                      440036, India
                    </span>
                  </div>
                  {/* end  */}

                  {/* start */}
                  <div className="popupElement">
                    <div><FcAlarmClock style={{fontSize:"1.1rem"}}/></div>
                    <span style={{fontSize:"0.9rem", color:"#fff"}}>12/07/2024 12:51:46</span>
                  </div>
                  {/* end  */}

                  {/* start */}
                  <div className="popupElement">
                    <div><SiGoogleearthengine style={{fontSize:"1.1rem"}} /></div>
                    <span style={{fontSize:"0.9rem", color:"#fff"}}>Ignition off</span>
                  </div>
                  {/* end  */}

                  {/* start */}
                  <div className="popupElement">
                    <div><FaTruck style={{fontSize:"1.1rem"}} /></div>
                    <span style={{fontSize:"0.9rem", color:"#fff"}}>0 kmph</span>
                  </div>
                  {/* end  */}

                  {/* start */}
                  <div className="popupElement">
                    <div><MdAccessTime style={{fontSize:"1.1rem"}} /></div>
                    <span style={{fontSize:"0.9rem", color:"#fff"}}>12D 01H 04M</span>
                  </div>
                  {/* end  */}

                  {/* start */}
                  <div className="popupElement">
                    <div><FaRegSnowflake style={{fontSize:"1.1rem"}} /></div>
                    <span style={{fontSize:"0.9rem", color:"#fff"}}>Ac off</span>
                  </div>
                  {/* end  */}

                  {/* start */}
                  <div className="popupElement">
                    <div><BsFillFuelPumpFill style={{fontSize:"1.1rem"}} /></div>
                    <span style={{fontSize:"0.9rem", color:"#fff"}}>0.00 L</span>
                  </div>
                  {/* end  */}
                </div>
              </div>
            </Popup>
          </Marker>
        ))}

        
      </MapContainer>
      <button onClick={showMyLocation}>Show My Location</button>
    </>
  );
}

export default GoogleMapComponent;
