import React, { useRef, useState, useEffect, useCallback } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import IndividualNav from "./individualNav/IndividualNav.jsx";
import IndividualInfo from "./IndividualInfo/IndividualInfo";
import PlayBar from "./PlayBar/PlayBar.jsx";
import carIcon from "../SVG/Car/C1.svg";
import motorcycleIcon from "../SVG/Bike/bike1.svg";
import truckIcon from "../SVG/Truck/b1.svg";
import "leaflet-fullscreen/dist/Leaflet.fullscreen";
import axios from "axios";

import { MdLocationPin, MdAccessTime } from "react-icons/md";
import { FcAlarmClock } from "react-icons/fc";
import { SiGoogleearthengine } from "react-icons/si";
import { FaTruck, FaRegSnowflake } from "react-icons/fa";
import { BsFillFuelPumpFill } from "react-icons/bs";
import "./IndividualGooglemap.css";
import BottomSlider from "./BottomSlider/BottomSlider.jsx";

import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers-pro/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers-pro/AdapterDayjs';
import { DateTimeRangePicker } from '@mui/x-date-pickers-pro/DateTimeRangePicker';

const car = new L.Icon({
  iconUrl: carIcon,
  iconSize: [35, 45],
  iconAnchor: [17, 45], // Adjust anchor point
});
const truck = new L.Icon({
  iconUrl: truckIcon,
  iconSize: [35, 45],
  iconAnchor: [17, 45], // Adjust anchor point
});
const motorcycle = new L.Icon({
  iconUrl: motorcycleIcon,
  iconSize: [35, 45],
  iconAnchor: [17, 45], // Adjust anchor point
});

const osmProvider = {
  url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
  attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
};

const initialCenter = {
  lat: 19.9606,
  lng: 79.2961,
};

function IndividualGooglemap({ data, setIndividualMap, individualDataObj }) {
  const [showPlayBar, setShowPlayBar] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [vehicleData, setVehicleData] = useState([]);
  const [center, setCenter] = useState(initialCenter);
  const ZOOM_LEVEL = 20;  // Maximum zoom level
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

  const showMyLocation = useCallback((lati, longi) => {
    mapRef.current.flyTo([lati, longi], ZOOM_LEVEL, {
      animate: true,
      duration: 2  // Duration in seconds
    });
  }, []);

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

  useEffect(() => {
    const processData = async () => {
      const processedData = await Promise.all(
        data.map(async (item) => {
          const address = await fetchAddress(item.latitude, item.longitude);
          return {
            id: item.id,
            name: item.name,
            address,
            distance: item.distance,
            ignition: item.ignition,
            latitude: item.latitude,
            longitude: item.longitude,
            category: item.category,
          };
        })
      );
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
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer components={['DateTimeRangePicker']}>
          <DateTimeRangePicker localeText={{ start: 'Check-in', end: 'Check-out' }} />
        </DemoContainer>
      </LocalizationProvider>

      <div className="mapContainer">
        <MapContainer
          center={center}
          zoom={7}  // Initial zoom level
          ref={mapRef}
          style={{ height: "500px", width: "75vw" }}
        >
          <TileLayer url={osmProvider.url} attribution={osmProvider.attribution} />

          {vehicleData.map((vehicle, index) => (
            vehicle.latitude && vehicle.longitude && (
              <Marker
                key={index}
                position={[vehicle.latitude, vehicle.longitude]}
                icon={getIconByCategory(vehicle.category)}
                eventHandlers={{
                  click: () => {
                    console.log(vehicle);
                    showMyLocation(vehicle.latitude, vehicle.longitude);
                  },
                }}
              >
                <Popup style={{ fontSize: "1.1rem" }}>
                  <div className="popup" style={{ height: "250px" }}>
                    <div className="tooltipHead">
                      <h2 style={{ marginBottom: "8px" }}>{vehicle.name}</h2>
                      <button className="geoFencing">Geofencing</button>
                    </div>
                    <div className="popupInfo">
                      <PopupElement icon={<MdLocationPin />} text={vehicle.address} />
                      <PopupElement icon={<FcAlarmClock />} text="12/07/2024 12:51:46" />
                      <PopupElement icon={<SiGoogleearthengine />} text={vehicle.ignition ? "Ignition On" : "Ignition Off"} />
                      <PopupElement icon={<FaTruck />} text={`${vehicle.distance} kmph`} />
                      <PopupElement icon={<MdAccessTime />} text="12D 01H 04M" />
                      <PopupElement icon={<FaRegSnowflake />} text="Ac off" />
                      <PopupElement icon={<BsFillFuelPumpFill />} text="0.00 L" />
                    </div>
                  </div>
                </Popup>
              </Marker>
            )
          ))}
        </MapContainer>
      </div>

      <div className="InfoContainer">
        {showPlayBar ? null : (
          <IndividualNav
            setIndividualMap={setIndividualMap}
            setShowPlayBar={setShowPlayBar}
            individualDataObj={individualDataObj}
          />
        )}
        {showPlayBar ? (
          <PlayBar setShowPlayBar={setShowPlayBar} />
        ) : (
          <IndividualInfo individualDataObj={individualDataObj} />
        )}
        <BottomSlider />
      </div>
    </>
  );
}

const PopupElement = ({ icon, text }) => (
  <div className="popupElement">
    <div>{icon}</div>
    <span style={{ fontSize: "0.9rem", color: "#fff" }}>{text}</span>
  </div>
);

export default IndividualGooglemap;
