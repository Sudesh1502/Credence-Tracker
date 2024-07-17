import React, { useCallback, useEffect, useRef, useState } from "react";
import { MapContainer, Marker, Polyline, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { FcAlarmClock } from "react-icons/fc";
import { FaTruck } from "react-icons/fa6";
import { FaRegSnowflake } from "react-icons/fa";
import { BsFillFuelPumpFill } from "react-icons/bs";
import { SiGoogleearthengine } from "react-icons/si";
import "../googlemap/googlemap.css";

import carIcon from "./SVG/Car/C1.svg";
import motorcycleIcon from "./SVG/Bike/bike1.svg";
import truckIcon from "./SVG/Truck/b1.svg";



import axios from "axios";

import { MdLocationPin, MdAccessTime } from "react-icons/md";


const car = new L.Icon({
  iconUrl: carIcon,
  iconSize: [35, 45],
  iconAnchor: [17, 45],
  popupAnchor: [0, -30]
});
const truck = new L.Icon({
  iconUrl: truckIcon,
  iconSize: [35, 45],
  iconAnchor: [17, 45],
  popupAnchor: [0, -30]
});
const motorcycle = new L.Icon({
  iconUrl: motorcycleIcon,
  iconSize: [35, 45],
  iconAnchor: [17, 45],
  popupAnchor: [0, -30]
});
const osmProvider = {
  url: "https://api.maptiler.com/maps/streets-v2/256/{z}/{x}/{y}.png?key=jXbNOuobzSRdq08XiuKY",
  attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
};

const initialCenter = {
  lat: 19.9606,
  lng: 79.2961,
};


function GoogleMapComponent({ latitude, longitude, data}) {
  

  const [vehicleData, setVehicleData] = useState([]);
  const [center, setCenter] = useState(initialCenter);
  const ZOOM_LEVEL = 20;  // Maximum zoom level
  const mapRef = useRef();


  const showMyLocation = useCallback((lati, longi) => {
    mapRef.current.flyTo([lati, longi], ZOOM_LEVEL, {
      animate: true,
      duration: 2  // Duration in seconds
    });
  }, []);

  useEffect(() => {
    const processData = async () => {
      const fetchAddress = async (latitude, longitude) => {
        try {
          const response = await axios.get(
            `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`
          );
          return `${response.data.address.neighbourhood || ''}, ${response.data.address.county || ''}, ${response.data.address.state || ''}, ${response.data.address.postcode || ''}, ${response.data.address.country || ''}`;
        } catch (error) {
          console.error("Error fetching address:", error);
          return "N/A";
        }
      };

      const addressPromises = data.map(async (item) => {
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
  }, [data]);
  
  // Function to get the appropriate icon based on the category
  const getIconByCategory = (category) => {
    console.log(`Category: ${category}`);
    switch (category) {
      case 'car':
        return car;
      case 'truck':
        return truck;
      case 'motorcycle':
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
        style={{ height: "500px", width: "1000px" }}
      >
        <TileLayer url={osmProvider.url} attribution={osmProvider.attribution} />
        
        
        
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
              <Popup offset={[0, 0]} style={{ zIndex: 300 }}>
                <div className="popup" style={{ height: "250px" }}>
                  <div className="tooltipHead">
                    <h2 style={{ marginBottom: "8px" }}>{vehicle.name}</h2>
                    <button className="geoFencing">Geofencing</button>
                  </div>
                  <div className="popupInfo">
                    <PopupElement icon={<MdLocationPin />} text={vehicle.address} />
                    <PopupElement icon={<FcAlarmClock />} text={new Date().toLocaleString()} />
                    <PopupElement icon={<SiGoogleearthengine />} text={vehicle.ignition ? "Ignition On" : "Ignition Off"} />
                    <PopupElement icon={<FaTruck />} text={`${vehicle.distance} kmph`} />
                    <PopupElement icon={<MdAccessTime />} text="12D 01H 04M" />
                    <PopupElement icon={<FaRegSnowflake />} text="Ac off" />
                    <PopupElement icon={<BsFillFuelPumpFill />} text="0.00 L" />
                  </div>
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
    <span style={{ fontSize: "0.9rem", color: "#fff" }}>{text}</span>
  </div>
);

export default GoogleMapComponent;
