import React, { useRef, useState, useEffect, useCallback } from "react";
import {
  MapContainer,
  Marker,
  Polyline,
  Popup,
  TileLayer,
  Polygon,
  Tooltip,
  Circle,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import IndividualNav from "./individualNav/IndividualNav.jsx";
import IndividualInfo from "./IndividualInfo/IndividualInfo";
import PlayBar from "./PlayBar/PlayBar.jsx";

import carIcon from "../SVG/Car/C1.svg";
import motorcycleIcon from "../SVG/Bike/bike1.svg";
import JCBIcon from "../SVG/JCB1/j3.svg";
import truckIcon from "../SVG/Truck/b1.svg";
import autoIcon from "../SVG/Auto/a4.svg";


import truckIconTop from "../SVG/Vehicle Top View/Truck/Truck-Y.png";
import motorcycleIconTop from "../SVG/Vehicle Top View/Bike/Bike-R.png";
import carIconTop from "../SVG/Vehicle Top View/Car/Car-R.png";
import JCBIconTop from "../SVG/Vehicle Top View/JCB/JCB-Y.png";
import TractorIconTop from "../SVG/Vehicle Top View/Tractor/Tractor-G.png";
import AutoIconTop from "../SVG/Vehicle Top View/Auto/Auto-O.png";


import pointerIcon from "../SVG/pointer.svg";
import "leaflet-fullscreen/dist/Leaflet.fullscreen";
import axios from "axios";
import { MdLocationPin, MdAccessTime } from "react-icons/md";
import { FcAlarmClock } from "react-icons/fc";
import { FaTruck } from "react-icons/fa";
import { BsFillFuelPumpFill } from "react-icons/bs";
import { PiPlugsFill } from "react-icons/pi";
import "./IndividualGooglemap.css";
import BottomSlider from "./BottomSlider/BottomSlider.jsx";
import dayjs from "dayjs";
import GeoFencing from "../../GeoFencing/GeoFencing.jsx";
import Calender from "./Calender.jsx";
import { Button } from "@mui/material";
import Loader from "../../Loader/Loader.jsx";
import AnimeLoader from "../../Loader/AnimeLoader.jsx";

import loadingPerson from "../../../assets/LoadingPerson.json"

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

const auto = new L.Icon({
  iconUrl: autoIcon,
  iconSize: [35, 45],
  iconAnchor: [17, 45],
  popupAnchor: [0, -30],
});

const jcb = new L.Icon({
  iconUrl: JCBIcon,
  iconSize: [35, 45],
  iconAnchor: [17, 45],
  popupAnchor: [0, -30],
});

// TOP VIEW ICONS ===============================

const jcbTop = new L.Icon({
  iconUrl: JCBIconTop,
  iconSize: [35, 45],
  iconAnchor: [17, 45],
  popupAnchor: [0, -30],
});

const autoTop = new L.Icon({
  iconUrl: AutoIconTop,
  iconSize: [35, 45],
  iconAnchor: [17, 45],
  popupAnchor: [0, -30],
});

const tractorTop = new L.Icon({
  iconUrl: TractorIconTop,
  iconSize: [35, 45],
  iconAnchor: [17, 45],
  popupAnchor: [0, -30],
});

const truckTop = new L.Icon({
  iconUrl: truckIconTop,
  iconSize: [35, 45],
  iconAnchor: [17, 45],
  popupAnchor: [0, -30],
});

const carTop = new L.Icon({
  iconUrl: carIconTop,
  iconSize: [35, 45],
  iconAnchor: [17, 45],
  popupAnchor: [0, -30],
});

const motorcycleTop = new L.Icon({
  iconUrl: motorcycleIconTop,
  iconSize: [35, 45],
  iconAnchor: [17, 45],
  popupAnchor: [0, -30],
});

const pointer = new L.Icon({
  iconUrl: pointerIcon,
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

const PopupElement = ({ icon, text }) => (
  <div className="popupElement">
    <div>{icon}</div>
    <span style={{ fontSize: "0.9rem", color: "black" }}>{text}</span>
  </div>
);

function IndividualGooglemap({ data, setIndividualMap, individualDataObj }) {
  const [showPlayBar, setShowPlayBar] = useState(false);
  const [center, setCenter] = useState(initialCenter);
  const [address, setAddress] = useState("");
  const ZOOM_LEVEL = 16;
  const mapRef = useRef();
  const [startDateTime, setStartDateTime] = useState(null);
  const [endDateTime, setEndDateTime] = useState(null);
  const [playbackData, setPlaybackData] = useState();
  const [wait, setWait] = useState("Loading...");
  const [animatedMarkerPosition, setAnimatedMarkerPosition] = useState(null);
  const [stoppedPositions, setStoppedPositions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [count, setCount] = useState(0);
  const [geofenceData, setGeofenceData] = useState();
  const [isStopped, setIsStopped] = useState(false);
  const [isPlaybacking, setIsPlaybacking] = useState(false);
  const [isCalender, setIsCalender] = useState(false);
  const [liveTrackPoints, setLiveTrackPoints] = useState(null);
  const [points, setPoints] = useState([]);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState("");


  const getIconByCategoryTop = (category) => {
    switch (category) {
      case "car":
        return carTop;
      case "truck":
        return truckTop;
      case "motorcycle":
        return motorcycleTop;
      case "auto":
        return autoTop;
      case "tractor":
        return tractorTop;
      case "jcb":
        return jcbTop;
      default:
        return carTop;
    }
  };

  //polyline points for live tracking
  useEffect(() => {
    setPoints((prevPoints) => [
      ...prevPoints,
      [individualDataObj.latitude, individualDataObj.longitude],
    ]);
  }, [individualDataObj.latitude, individualDataObj.longitude]);

  console.log("startDate end Date", startDateTime, endDateTime);
  console.log("isCalneder", isCalender);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prevCount) => prevCount + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const showMyLocation = useCallback((lati, longi) => {
    mapRef.current.flyTo([lati, longi], ZOOM_LEVEL, {
      animate: true,
      duration: 2,
    });
  }, []);

  const fetchAddress = async (latitude, longitude) => {
    const apiKey = "AIzaSyAvHHoPKPwRFui0undeEUrz00-8w6qFtik";
    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`;

    try {
      const response = await axios.get(url);
      console.log(response.data.results[0].formatted_address);
      setAddress(response.data.results[0].formatted_address);
    } catch (error) {
      setError(error.message);
    }
  };

  const fetchPlaybackData = async () => {
    console.log("Getting your playback");
    isPlaybacking === false
      ? setIsPlaybacking(true)
      : setIsPlaybacking(false) &&
        setPlaybackData(null) &&
        setGeofenceData(null);

    try {
      const username = "hbgadget221@gmail.com";
      const password = "123456";
      const token = btoa(`${username}:${password}`);
      const response1 = await axios.get(
        `
        https://rocketsalestracker.com/api/positions?deviceId=${individualDataObj.deviceId}&from=${startDateTime}&to=${endDateTime}`,
        {
          headers: {
            Authorization: `Basic ${token}`,
          },
        }
      );
      console.log(response1.data);
      setPlaybackData(response1.data);
    } catch (error) {
      console.error("Error fetching device data:", error);
    }
    try {
      const username = "hbgadget221@gmail.com";
      const password = "123456";
      const token = btoa(`${username}:${password}`);
      const response2 = await axios.get(
        `https://rocketsalestracker.com/api/geofences`,
        {
          headers: {
            Authorization: `Basic ${token}`,
          },
        }
      );
      setGeofenceData(response2.data);
    } catch (error) {
      console.error("Error fetching geofence data:", error);
    }
  };
  console.log("geofencingngg", geofenceData);

  const pairedArray = playbackData
    ? playbackData.map((row) => [row.latitude, row.longitude])
    : [];

  const handleDateTimeChange = (newValue) => {
    const formattedStartDateTime = newValue[0]
      ? dayjs(newValue[0]).toISOString()
      : null;
    const formattedEndDateTime = newValue[1]
      ? dayjs(newValue[1]).toISOString()
      : null;

    setStartDateTime(formattedStartDateTime);
    setEndDateTime(formattedEndDateTime);
  };

  useEffect(() => {
    if (individualDataObj.latitude && individualDataObj.longitude) {
      fetchAddress(individualDataObj.latitude, individualDataObj.longitude);
    }
  }, [individualDataObj.latitude, individualDataObj.longitude]);

  const getIconByCategory = (category) => {
    switch (category) {
      case "car":
        return car;
      case "truck":
        return truck;
      case "motorcycle":
        return motorcycle;
      case "auto":
        return auto;
      case "jcb":
        return jcb;
      default:
        return car;
    }
  };

  // const getIconByCategoryTop = (category) => {

  //   switch (category) {
  //     case "car":
  //       return carTop;
  //     case "truck":
  //       return truckTop;
  //     case "motorcycle":
  //       return motorcycleTop;
  //     default:
  //       return carTop;
  //   }
  // };

  const startAnimation = () => {
    if (isAnimating) {
      setIsAnimating(false);
    } else {
      setIsAnimating(true);
      setCurrentIndex(0);
    }
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
  }, [isAnimating]);

  // //Animation
  // console.log("ANimated marker position", animatedMarkerPosition,"paireddddes", pairedArray[0]);
  // useEffect(()=>{
  //   if (isAnimating && pairedArray.length > 0) {
  //   setAnimatedMarkerPosition(pairedArray[0]);
  //   for (let i = 0; i < pairedArray.length; i++) {
  //     setTimeout(() => {
  //       setAnimatedMarkerPosition(pairedArray[i]); // Update current item
  //     }, i * 1000); // Delay each iteration by 1 second
  //   }}
  // },[]);

  useEffect(() => {
    if (!isAnimating) return;
    setProgress((currentIndex / (pairedArray.length - 1)) * 100);
  }, [currentIndex, pairedArray.length, isAnimating]);

  const setAnimationProgress = (progress) => {
    const index = Math.floor((progress / 100) * (pairedArray.length - 1));
    setCurrentIndex(index);
    setAnimatedMarkerPosition(pairedArray[index]);
  };

  // Logic for stop points
  useEffect(() => {
    if (playbackData) {
      const stopPoints = playbackData.reduce((acc, row, index) => {
        if (
          row.attributes?.ignition === true &&
          playbackData[index + 1] &&
          playbackData[index + 1].attributes?.ignition === false
        ) {
          acc.push({
            latitude: row.latitude,
            longitude: row.longitude,
          });
        }
        return acc;
      }, []);
      setStoppedPositions(stopPoints);
    }
  }, [playbackData]);

  //geofencing function
  const parseGeoFenceCoordinates = (area) => {
    const coordinates = [];

    if (area.startsWith("POLYGON")) {
      // Extract coordinates for POLYGON format
      const polygonPoints = area.match(/\d+\.\d+\s\d+\.\d+/g);
      if (polygonPoints) {
        polygonPoints.forEach((point) => {
          const [lat, lng] = point.split(" ").map((coord) => parseFloat(coord));
          coordinates.push([lat, lng]);
        });
      }
    } else if (area.startsWith("CIRCLE")) {
      // Extract coordinates for CIRCLE format
      const circleParts = area.match(/\d+\.\d+/g);
      if (circleParts && circleParts.length >= 3) {
        const [lat, lng, radius] = circleParts.map((coord) =>
          parseFloat(coord)
        );
        // Return coordinates as array with lat, lng, and radius
        coordinates.push([lat, lng, radius]);
      }
    }

    return coordinates;
  };
  const handleCutHistory = () => {
    setShowPlayBar(false);
    setIsCalender(false);
    setIsPlaybacking(false);
    setIsAnimating(false);
  };
  return (
    <>
      <div style={{ minHeight: "90vh" }}>
        <div
          style={{
            display: "flex",
            gap: "10px",
            alignItems: "center",
            marginLeft: "0.5rem",
          }}
        >
          {isCalender && (
            <Calender
              setStartDateTime={setStartDateTime}
              setEndDateTime={setEndDateTime}
            />
          )}

          {isCalender && (
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#000000",
                "&:hover": {
                  backgroundColor: "#1a242f",
                },
              }}
              style={{ height: "2.7rem", marginTop: "6px" }}
              onClick={fetchPlaybackData}
            >
              Search
            </Button>
          )}
          {isCalender && (
            <button className="cutHistory" onClick={handleCutHistory}>
              Go Back
            </button>
          )}
        </div>

        <br />
        {isPlaybacking &&
          (!playbackData || !geofenceData || !stoppedPositions) &&
          <AnimeLoader message={"We appreciate your patience..."}/>}

        <div className="mapContainer">
          <MapContainer
            center={center}
            zoom={7}
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

            <Marker
              position={[
                individualDataObj.latitude,
                individualDataObj.longitude,
              ]}
              icon={getIconByCategory(individualDataObj.category)}
            >
              <Popup style={{ fontSize: "1.1rem", color: "black" }}>
                <div className="popup" style={{ height: "250px" }}>
                  <div className="tooltipHead" style={{ marginBottom: "8px" }}>
                    <div className="tooltipNamePlate">
                      <div className="ind">
                        <p>IND</p>
                      </div>
                      <div className="name">
                        <p>{individualDataObj.name}</p>
                      </div>
                    </div>
                  </div>
                  <div className="popupInfo">
                    <PopupElement
                      icon={<MdLocationPin style={{ color: "#d53131" }} />}
                      text={address}
                    />
                    <PopupElement
                      icon={<FcAlarmClock style={{ color: "#f8a34c" }} />}
                      text="12/07/2024 12:51:46"
                    />
                    <PopupElement
                      icon={<PiPlugsFill style={{ color: "#ff7979" }} />}
                      text={
                        individualDataObj.ignition
                          ? "Ignition On"
                          : "Ignition Off"
                      }
                    />
                    <PopupElement
                      icon={<FaTruck style={{ color: "#ecc023" }} />}
                      text={`${individualDataObj.distance} kmph`}
                    />
                    <PopupElement
                      icon={<MdAccessTime style={{ color: "#74f27e" }} />}
                      text="12D 01H 04M"
                    />
                    {/* <PopupElement icon={<FaRegSnowflake style={{color:"#aa9d6f"}}/>} text="Ac off" /> */}
                    <PopupElement
                      icon={<BsFillFuelPumpFill style={{ color: "#5fb1fe" }} />}
                      text="0.00 L"
                    />
                  </div>
                  <GeoFencing className="geoFence" />
                </div>
              </Popup>
            </Marker>
            {isAnimating && animatedMarkerPosition && (
              <Marker
                position={animatedMarkerPosition}
                icon={getIconByCategoryTop(individualDataObj.category)}
              />
            )}
            {isPlaybacking && <Polyline positions={pairedArray} color="blue" />}
            {!isPlaybacking && <Polyline positions={points} color="green" />}

            {/* Adding stop point markers */}
            {isPlaybacking &&
              stoppedPositions.map((stop, index) => (
                <Marker
                  key={index}
                  position={[stop.latitude, stop.longitude]}
                  icon={pointer}
                >
                  <Popup>
                    <div className="popupContent">
                      <PopupElement
                        icon={<MdLocationPin size={15} color="#fff" />}
                        text={`Stopped at ${stop.latitude}, ${stop.longitude}`}
                      />
                    </div>
                  </Popup>
                </Marker>
              ))}

            {/* Render GeoFences */}
            {isPlaybacking &&
              geofenceData &&
              geofenceData.map((geoFence) => {
                const coordinates = parseGeoFenceCoordinates(geoFence.area);
                if (coordinates.length === 0) return null;

                if (geoFence.area.startsWith("POLYGON")) {
                  return (
                    <Polygon
                      positions={coordinates}
                      color="red"
                      key={geoFence.id}
                    >
                      <Tooltip>{geoFence.name}</Tooltip>
                    </Polygon>
                  );
                } else if (
                  geoFence.area.startsWith("CIRCLE") &&
                  coordinates.length === 1
                ) {
                  const [lat, lng, radius] = coordinates[0];
                  return (
                    <Circle
                      center={[lat, lng]}
                      radius={radius}
                      color="red"
                      key={geoFence.id}
                    >
                      <Tooltip>{geoFence.name}</Tooltip>
                    </Circle>
                  );
                }
              })}
          </MapContainer>
        </div>
        {/* <button
          onClick={() => {
            showMyLocation(
              individualDataObj.latitude,
              individualDataObj.longitude
            );
          }}
        >
          Get Me
        </button> */}
        <div className="InfoContainer">
          {showPlayBar ? null : (
            <IndividualNav

            showMyLocation={showMyLocation}
              setIndividualMap={setIndividualMap}
              setShowPlayBar={setShowPlayBar}
              individualDataObj={individualDataObj}
              setIsCalender={setIsCalender}
            />
          )}
          {showPlayBar ? (
            <PlayBar
              playbackData={playbackData}
              setShowPlayBar={setShowPlayBar}
              setIsCalender={setIsCalender}
              setIsPlaybacking={setIsPlaybacking}
              startAnimation={startAnimation}
              isAnimating={isAnimating}
              setIsAnimating={setIsAnimating}
              currentIndex={currentIndex}
              setCurrentIndex={setCurrentIndex}
              pairedArray={pairedArray}
              progress={progress}
              setProgress={setAnimationProgress}
              individualDataObj={individualDataObj}
            />
          ) : (
            <IndividualInfo individualDataObj={individualDataObj} />
          )}
        </div>
      </div>
    </>
  );
}

export default IndividualGooglemap;
