import { GoogleMap, useJsApiLoader, MarkerF } from '@react-google-maps/api';
import { memo, useCallback, useState } from 'react';
import CustomMarkers from "./carImage.jpg"

const containerStyle = {
  width: '1000px',
  height: '600px'
};

const center = {
  lat: -3.745,
  lng: -38.523
};

function GoogleMapComponent({ latitude, longitude }) {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY // Use environment variable for the API key
  });

  const [map, setMap] = useState(null);

  const onLoad = useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);
    setMap(map);
  }, []);

  console.log(process.env.REACT_APP_GOOGLE_MAPS_API_KEY);

  const onUnmount = useCallback(function callback(map) {
    setMap(null);
  }, []);

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={15}
      onLoad={onLoad}
      onUnmount={onUnmount}
      options={{
        streetViewControl: false,
        mapTypeControl: false,
      }}
    >
      <MarkerF
        position={center}
        options={{
          icon: {
            url: CustomMarkers,
            scaledSize: new window.google.maps.Size(50, 50), // Adjust the size here
          },
        }}
      />
      { /* Child components, such as markers, info windows, etc. */ }
      <>
      </>
    </GoogleMap>
  ) : <></>;
}

export default memo(GoogleMapComponent);
