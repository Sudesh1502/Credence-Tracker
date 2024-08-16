import React, { useState, useRef, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import axios from 'axios';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import CarIcon from '../../SVG/Vehicle Top View/Car/Car-Y.png';
import './LiveTracking.css';
import { IoIosSpeedometer } from "react-icons/io";
import { FaTruckFast } from "react-icons/fa6";
import { IoIosTime } from "react-icons/io";

// Custom icon for marker
const createCustomIcon = (course) => {
  return L.divIcon({
    className: 'custom-icon',
    html: `
      <div style="
        width: 32px; height: 32px;
        background: url(${CarIcon}) no-repeat center center;
        background-size: contain;
        transform: rotate(${course}deg);
        transform-origin: center center;
      "></div>
    `,
    iconSize: [32, 32],
    iconAnchor: [16, 32],
  });
};

const LiveTracking = ({ individualDataObj, setTrack }) => {
  const [latLng, setLatLng] = useState({
    lat: individualDataObj.latitude,
    lng: individualDataObj.longitude
  });
  const [course, setCourse] = useState(individualDataObj.course);
  const [positions, setPositions] = useState([{ lat: individualDataObj.latitude, lng: individualDataObj.longitude }]);
  const markerRef = useRef(null);
  const mapRef = useRef(null);
  const intervalRef = useRef(null);

  const [speed, setSpeed] = useState(0);

  const fetchAndUpdateData = async () => {
    try {
      const username = "hbgadget221@gmail.com";
      const password = "123456";
      const token = btoa(`${username}:${password}`);

      const response = await axios.get(
        `https://rocketsalestracker.com/api/positions?vehicleId=${individualDataObj.id}`,
        {
          headers: {
            Authorization: `Basic ${token}`,
          },
        }
      );

      const positionData = response.data;
      if (positionData.length > 0) {
        setSpeed(positionData.speed)
        const latestPosition = positionData[0];
        const newLatLng = { lat: latestPosition.latitude, lng: latestPosition.longitude };
        setLatLng(newLatLng);
        setCourse(latestPosition.course);
        setPositions(prevPositions => [...prevPositions, newLatLng]);
      }
    } catch (error) {
      console.error("Error fetching position data:", error);
    }
  };

  const startFetchingData = () => {
    fetchAndUpdateData(); // Initial fetch
    intervalRef.current = setInterval(fetchAndUpdateData, 1000); // Update every second
  };

  const stopFetchingData = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const [currentDateTime, setCurrentDateTime] = useState('');
  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      const day = String(now.getDate()).padStart(2, '0');
      const month = String(now.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
      const year = now.getFullYear();
      const hours = String(now.getHours()).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0');
      const seconds = String(now.getSeconds()).padStart(2, '0');

      setCurrentDateTime(`${day}/${month}/${year} ${hours}:${minutes}:${seconds}`);
    };

    updateDateTime(); // Update the date and time once immediately
    const intervalId = setInterval(updateDateTime, 1000); // Update the date and time every second

    startFetchingData(); // Start fetching data on mount
    return () => {
      clearInterval(intervalId);
      stopFetchingData(); // Clean up on component unmount
    };
  }, []);

  useEffect(() => {
    if (markerRef.current) {
      markerRef.current.setLatLng([latLng.lat, latLng.lng]);
      markerRef.current.setIcon(createCustomIcon(course));
    }
    if (mapRef.current) {
      mapRef.current.setView([latLng.lat, latLng.lng], mapRef.current.getZoom());
    }
  }, [latLng, course]);

  const handleTrack = () => {
    setTrack(false); // Stop tracking
  }

  return (
    <div className="wrapper">
      <div className="map-container">
        <div className="live">
          <h2>{individualDataObj.name}</h2>
        </div>
        <MapContainer
          center={[latLng.lat, latLng.lng]}
          zoom={16}
          style={{ height: '70%', width: '100%' }}
          whenCreated={(mapInstance) => { mapRef.current = mapInstance; }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="© OpenStreetMap contributors"
          />
          <Marker
            position={[latLng.lat, latLng.lng]}
            ref={markerRef}
            icon={createCustomIcon(course)}
          >
            <Popup>
              {individualDataObj.name}: {latLng.lat}, {latLng.lng}
            </Popup>
          </Marker>
          {/* <Polyline positions={positions} color="blue" /> */}
        </MapContainer>

        <div className="liveInfo">
          <div className="liveData"><IoIosSpeedometer/> <p>{individualDataObj.attributes.ignition ? `${speed} km/h` : '0 km/h'}</p></div>
          <div className="liveData"><IoIosTime/> <p>{currentDateTime}</p></div>
        </div>

        <button type="button" className="btn btn-outline-danger stop-fetching-button" onClick={() => {
          stopFetchingData();
          handleTrack();
        }} >
          Close
        </button>
      </div>
    </div>
  );
};

export default LiveTracking;
