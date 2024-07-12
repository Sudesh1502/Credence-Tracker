import React, { useEffect, useRef, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import useGeolocation from "../Hooks/useGeolocation";
import markerUrl from "../googlemap/SVG/Car/C2.svg"

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

function GoogleMapComponent({latitude, longitude}) {

  
  const [center, setCenter] = useState({ lat: 19.9606, lng: 79.2961 });
  const ZOOM_LEVEL = 7;
  const mapRef = useRef();
  const location = useGeolocation();

  const showMyLocation = () => {
    
      mapRef.current.flyTo(
        [21.128142222222223, 79.10407111111111],
        18,
        { animate: true }
      );
    
  };




  function pairLatLng(latitude, longitude) {
    // Create an array to hold the paired objects
    const pairedArray = [];

    // Loop through the arrays and create objects
    for (let i = 0; i < latitude.length; i++) {
      const latLngObject = [
        latitude[i],
        longitude[i],
    ]
      pairedArray.push(latLngObject);
    }

    return pairedArray;
  }

  const points = pairLatLng(latitude, longitude)

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
          <Popup>
            <b>Location {index + 1}</b>
          </Popup>
        </Marker>
      ))}

        
      </MapContainer>
      <button onClick={showMyLocation}>Show My Location</button>
    </>
  );
}

export default GoogleMapComponent;
