import React, { useRef, useState, useEffect, useCallback } from "react";
import { MapContainer, Marker, Polyline, Popup, TileLayer } from "react-leaflet";
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
import dayjs from 'dayjs';
import GeoFencing from "../../GeoFencing/GeoFencing.jsx";

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

const PopupElement = ({ icon, text }) => (
  <div className="popupElement">
    <div>{icon}</div>
    <span style={{ fontSize: "0.9rem", color: "#fff" }}>{text}</span>
  </div>
);

function IndividualGooglemap({ data, setIndividualMap, individualDataObj }) {
  const [showPlayBar, setShowPlayBar] = useState(false);
  const [center, setCenter] = useState(initialCenter);
  const [address, setAddress] = useState("N/A");
  const ZOOM_LEVEL = 20;
  const mapRef = useRef();
  const [startDateTime, setStartDateTime] = useState(null);
  const [endDateTime, setEndDateTime] = useState(null);
  const [playbackData, setPlaybackData] = useState();
  const [wait, setWait] = useState('');
  const [clicked, setClicked] = useState(false);
  const [animatedMarkerPosition, setAnimatedMarkerPosition] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount(prevCount => prevCount + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const showMyLocation = useCallback((lati, longi) => {
    mapRef.current.flyTo([lati, longi], ZOOM_LEVEL, {
      animate: true,
      duration: 2
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

  const fetchPlaybackData = async () => {
    setClicked(true);
    try {
      const username = "hbgadget221@gmail.com";
      const password = "123456";
      const token = btoa(`${username}:${password}`);
      const response1 = await axios.get(`
        https://rocketsalestracker.com/api/positions?deviceId=${individualDataObj.deviceId}&from=${startDateTime}&to=${endDateTime}`,
        {
          headers: {
            Authorization: `Basic ${token}`,
          },
        }
      );
      setPlaybackData(response1.data);
    } catch (error) {
      console.error("Error fetching device data:", error);
    }
  };

  useEffect(() => {
    if (playbackData === undefined && clicked) {
      setWait('Please wait while the API loads...');
    } else {
      setWait('');
    }
  }, [playbackData]);

  const pairedArray = playbackData ? playbackData.map(row => [row.latitude, row.longitude]) : [];

  const handleDateTimeChange = (newValue) => {
    const formattedStartDateTime = newValue[0] ? dayjs(newValue[0]).toISOString() : null;
    const formattedEndDateTime = newValue[1] ? dayjs(newValue[1]).toISOString() : null;

    setStartDateTime(formattedStartDateTime);
    setEndDateTime(formattedEndDateTime);
  };

  useEffect(() => {
    const updateAddress = async () => {
      const add = await fetchAddress(individualDataObj.latitude, individualDataObj.longitude);
      setAddress(add);
    };
    updateAddress();
  }, [individualDataObj]);

  const getIconByCategory = (category) => {
    switch (category) {
      case 'car':
        return car;
      case 'truck':
        return truck;
      case 'motorcycle':
        return motorcycle;
      default:
        return car;
    }
  };

  const startAnimation = () => {
    setIsAnimating(true);
  };

  useEffect(() => {
    let interval;
    if (isAnimating && pairedArray.length > 0) {
      setAnimatedMarkerPosition(pairedArray[0]);
      interval = setInterval(() => {
        setCurrentIndex((prevIndex) => {
          const newIndex = prevIndex + 1;
          if (newIndex < pairedArray.length) {
            setAnimatedMarkerPosition(pairedArray[newIndex]);
            return newIndex;
          } else {
            clearInterval(interval);
            setIsAnimating(false);
            return prevIndex;
          }
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isAnimating, count]);

  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer components={['DateTimeRangePicker']}>
          <DateTimeRangePicker
            localeText={{ start: 'Check-in', end: 'Check-out' }}
            value={[startDateTime ? dayjs(startDateTime) : null, endDateTime ? dayjs(endDateTime) : null]}
            onChange={handleDateTimeChange}
          />
        </DemoContainer>
        <div>
          <p>Start DateTime: {startDateTime}</p>
          <p>End DateTime: {endDateTime}</p>
        </div>
      </LocalizationProvider>

      <button onClick={fetchPlaybackData}>Get Playback</button>
      <div>{wait}</div>
      {playbackData && (
        <button onClick={startAnimation}>Start Animation</button>
      )}
      <div className="mapContainer">
        <MapContainer
          center={center}
          zoom={7}
          ref={mapRef}
          style={{ height: "500px", width: "75vw" }}
        >
          <TileLayer url={osmProvider.url} attribution={osmProvider.attribution} />

          <Marker
            position={[individualDataObj.latitude, individualDataObj.longitude]}
            icon={getIconByCategory(individualDataObj.category)}
            eventHandlers={{
              click: () => {
                showMyLocation(individualDataObj.latitude, individualDataObj.longitude);
              },
            }}
          >
            <Popup style={{ fontSize: "1.1rem" }}>
              <div className="popup" style={{ height: "250px" }}>
                <div className="tooltipHead">
                  <h2 style={{ marginBottom: "8px" }}>{individualDataObj.name}</h2>
                  <GeoFencing />
                </div>
                <div className="popupInfo">
                  <PopupElement icon={<MdLocationPin />} text={address} />
                  <PopupElement icon={<FcAlarmClock />} text="12/07/2024 12:51:46" />
                  <PopupElement icon={<SiGoogleearthengine />} text={individualDataObj.ignition ? "Ignition On" : "Ignition Off"} />
                  <PopupElement icon={<FaTruck />} text={`${individualDataObj.distance} kmph`} />
                  <PopupElement icon={<MdAccessTime />} text="12D 01H 04M" />
                  <PopupElement icon={<FaRegSnowflake />} text="Ac off" />
                  <PopupElement icon={<BsFillFuelPumpFill />} text="0.00 L" />
                </div>
              </div>
            </Popup>
          </Marker>
          {animatedMarkerPosition && (
            <Marker
              position={animatedMarkerPosition}
              icon={getIconByCategory(individualDataObj.category)}
            />
          )}
          <Polyline positions={pairedArray} color="blue" />
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

export default IndividualGooglemap;
