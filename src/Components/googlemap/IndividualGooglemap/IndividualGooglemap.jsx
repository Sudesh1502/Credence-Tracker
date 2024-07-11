import { GoogleMap, useJsApiLoader, MarkerF } from "@react-google-maps/api";
import { memo, useCallback, useState } from "react";
import IndividualNav from "./individualNav/IndividualNav.jsx";
import IndividualInfo from "./IndividualInfo/IndividualInfo";
import PlayBar from "./PlayBar/PlayBar.jsx";

const containerStyle = {
  width: "100%",
  height: "500px",
};

const center = {
  lat: -3.745,
  lng: -38.523,
};

function IndividualGooglemap({ latitude, longitude, setIndividualMap }) {
  const [showPlayBar, setShowPlayBar] = useState(false);
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY, // Use environment variable for the API key
  });

  const [map, setMap] = useState(null);

  const onLoad = useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);
    setMap(map);
  }, []);

  const onUnmount = useCallback(function callback(map) {
    setMap(null);
  }, []);

  return isLoaded ? (
    <div style={{height:""}}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={14}
        onLoad={onLoad}
        onUnmount={onUnmount}
        options={{
          streetViewControl: false,
          mapTypeControl: false,
        }}
      >
        <MarkerF position={center} />
        {/* Child components, such as markers, info windows, etc. */}
        <></>
      </GoogleMap>
      <div>
        <IndividualNav setIndividualMap={setIndividualMap} setShowPlayBar={setShowPlayBar} />
        {!showPlayBar? <PlayBar/>:<IndividualInfo/>}
        
        
      </div>
    </div>
  ) : (
    <></>
  );
}

export default memo(IndividualGooglemap);
