import React, { useEffect, useState } from 'react';
import axios from 'axios';

export const FetchData = () => {
    const [deviceApiData, setDeviceApiData] = useState([]);
    const [positionApiData, setPositionApiData] = useState([]);
    useEffect(() => {
        const fetchDeviceData = async () => {
            try {
                const response1 = await axios.get('https://rocketsalestracker.com/api/devices', {
                    headers: {
                        Authorization: 'Basic c291cmFiaEBnbWFpbC5jb206MTIzNDU2'  // Replace with your actual token
                    }
                });
                
                setDeviceApiData(response1.data);
                // console.log(deviceApiData);
                console.log(response1.data)
            } catch (error) {
                console.error('Error fetching data:', error);
            }
            
        };

        const fetchPositionData = async () =>{
            try {
                const response2 = await axios.get('https://rocketsalestracker.com/api/positions', {
                    headers: {
                        Authorization: 'Basic c291cmFiaEBnbWFpbC5jb206MTIzNDU2'  // Replace with your actual token
                    }
                });
                
                setPositionApiData(response2.data);
                // console.log(positionApiData);
                console.log(response2.data)
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchDeviceData();
        fetchPositionData();
    }, []);

    return (
        <div>FetchData</div>
    );
};
