import React, { useEffect, useState } from 'react';

const useGeolocation = () => {
    const [location, setLocation] = useState({
        loaded: false,
        coordinates: { lat: "", lng: "" }
    });

    const onSuccess = (position) => {
        setLocation({
            loaded: true,
            coordinates: {
                lat: position.coords.latitude,
                lng: position.coords.longitude,
            },
        });
    };

    const onError = (error) => {
        setLocation({
            loaded: true,
            error,
        });
    };

    useEffect(() => {
        if (!("geolocation" in navigator)) {
            onError({
                code: 0,
                message: "Geolocation not supported by browser",
            });
        }
        navigator.geolocation.getCurrentPosition(onSuccess, onError);
    }, []);

    return location;
};

export default useGeolocation;
