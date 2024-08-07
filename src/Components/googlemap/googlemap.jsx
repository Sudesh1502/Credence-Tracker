import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  MapContainer,
  Marker,
  Polyline,
  Popup,
  TileLayer,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { FcAlarmClock } from "react-icons/fc";
import { FaTruck } from "react-icons/fa6";
import { FaRegSnowflake } from "react-icons/fa";
import { BsFillFuelPumpFill } from "react-icons/bs";
import "../googlemap/googlemap.css";
import { PiPlugsFill } from "react-icons/pi";

import carIcon from "./SVG/Car/C1.svg";
import motorcycleIcon from "./SVG/Bike/bike1.svg";
import truckIcon from "./SVG/Truck/b1.svg";

import axios from "axios";

import { MdLocationPin, MdAccessTime } from "react-icons/md";
import GeoFencing from "../GeoFencing/GeoFencing";

const car = new L.Icon({
  iconUrl: carIcon,
  iconSize: [35, 45],
  iconAnchor: [17, 45],
  popupAnchor: [0, -30],
});
const truck = new L.Icon({
  iconUrl: truckIcon,
  iconSize: [35, 45],
  iconAnchor: [17, 45],
  popupAnchor: [0, -30],
});
const motorcycle = new L.Icon({
  iconUrl: motorcycleIcon,
  iconSize: [35, 45],
  iconAnchor: [17, 45],
  popupAnchor: [0, -30],
});
const osmProvider = {
  url: "https://api.maptiler.com/maps/streets-v2/256/{z}/{x}/{y}.png?key=jXbNOuobzSRdq08XiuKY",
  attribution:
    '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
};

const initialCenter = {
  lat: 19.9606,
  lng: 79.2961,
};

function GoogleMapComponent({ latitude, longitude, filteredVehicles }) {
  const [error, setError] = useState("");
  const [address, setAddress] = useState("");

  const [vehicleData, setVehicleData] = useState([]);
  const [center, setCenter] = useState(initialCenter);
  const ZOOM_LEVEL = 13; // Maximum zoom level
  const mapRef = useRef();

  const showMyLocation = useCallback((lati, longi) => {
    mapRef.current.flyTo([lati, longi], ZOOM_LEVEL, {
      animate: true,
      duration: 2, // Duration in seconds
    });
  }, []);

  useEffect(() => {
    const processData = async () => {
      const fetchAddress = async (latitude, longitude) => {
        const apiKey = "AIzaSyAvHHoPKPwRFui0undeEUrz00-8w6qFtik";
        const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`;

        try {
          const response = await axios.get(url);
          const formattedAddress =
            response.data.results[0]?.formatted_address || "Address not found";
          return formattedAddress;
        } catch (error) {
          setError(error.message);
          return "Error fetching address";
        }
      };

      const addressPromises = filteredVehicles.map(async (item) => {
        const address = await fetchAddress(item.latitude, item.longitude);
        return {
          ...item,
          address,
        };
      });

      const processedData = await Promise.all(addressPromises);
      setVehicleData(processedData);
    };

    processData();
  }, [filteredVehicles]);

  // Function to get the appropriate icon based on the category
  const getIconByCategory = (category) => {
    console.log(`Category: ${category}`);
    switch (category) {
      case "car":
        return car;
      case "truck":
        return truck;
      case "motorcycle":
        return motorcycle;
      default:
        return car; // Default to car icon if category is unknown
    }
  };

  return (
    <>
      <MapContainer
        center={center}
        zoom={7} // Initial zoom level
        ref={mapRef}
        style={{
          height: "500px",
              width: "99vw",
              border: "2px solid rgb(140 133 118)",
              // borderRadius: "6px",
              marginBottom: "35px",
              marginLeft:"0.75px",
        }}
      >
        <TileLayer
          url={osmProvider.url}
          attribution={osmProvider.attribution}
        />

        {vehicleData.map((vehicle, index) =>
          vehicle.latitude && vehicle.longitude ? (
            <Marker
              key={index}
              position={[vehicle.latitude, vehicle.longitude]}
              icon={getIconByCategory(vehicle.category)}
              eventHandlers={{
                click: () => {
                  showMyLocation(vehicle.latitude, vehicle.longitude);
                },
              }}
            >
              <Popup
                offset={[0, 0]}
                style={{ zIndex: 300, fontSize: "1.1rem", color: "black" }}
              >
                <div className="popup" style={{ height: "250px" }}>
                  <div className="tooltipHead" style={{ marginBottom: "8px" }}>
                    <div className="tooltipNamePlate">
                      <div className="ind">
                        <p>IND</p>
                      </div>
                      <div className="name">
                        <p>{vehicle.name}</p>
                      </div>
                    </div>
                  </div>
                  <div className="popupInfo">
                    <PopupElement
                      icon={<MdLocationPin style={{ color: "#d53131" }} />}
                      text={vehicle.address}
                    />
                    <PopupElement
                      icon={<FcAlarmClock style={{ color: "#f8a34c" }} />}
                      text={new Date().toLocaleString()}
                    />
                    <PopupElement
                      icon={<PiPlugsFill style={{ color: "#ff7979" }} />}
                      text={vehicle.ignition ? "Ignition On" : "Ignition Off"}
                    />
                    <PopupElement
                      icon={<FaTruck style={{ color: "#ecc023" }} />}
                      text={`${vehicle.distance} kmph`}
                    />
                    <PopupElement
                      icon={<MdAccessTime style={{ color: "#74f27e" }} />}
                      text="12D 01H 04M"
                    />
                    {/* <PopupElement icon={<FaRegSnowflake style={{color:"#aa9d6f"}} />} text="Ac off" /> */}
                    <PopupElement
                      icon={<BsFillFuelPumpFill style={{ color: "#5fb1fe" }} />}
                      text="0.00 L"
                    />
                  </div>
                  <GeoFencing className="geoFence" />
                </div>
              </Popup>
            </Marker>
          ) : null
        )}
      </MapContainer>
    </>
  );
}

const PopupElement = ({ icon, text }) => (
  <div className="popupElement">
    <div>{icon}</div>
    <span style={{ fontSize: "0.9rem", color: "black" }}>{text}</span>
  </div>
);

export default GoogleMapComponent;
