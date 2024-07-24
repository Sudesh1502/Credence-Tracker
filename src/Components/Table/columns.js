import React, { useEffect, useState } from 'react';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import axios from 'axios';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import PowerOffIcon from '@mui/icons-material/PowerOff';
import { MdBatteryChargingFull, MdBatteryCharging90, MdBatteryCharging80, MdBatteryCharging60, MdBatteryCharging50, MdBatteryCharging30, MdBatteryCharging20    } from "react-icons/md";
import { RiBattery2ChargeLine } from "react-icons/ri";
import { SiCoronaengine } from "react-icons/si";
import Battery0BarIcon from '@mui/icons-material/Battery0Bar';
import Battery1BarIcon from '@mui/icons-material/Battery1Bar';
import Battery2BarIcon from '@mui/icons-material/Battery2Bar';
import Battery3BarIcon from '@mui/icons-material/Battery3Bar';
import Battery4BarIcon from '@mui/icons-material/Battery4Bar';
import Battery5BarIcon from '@mui/icons-material/Battery5Bar';
import Battery6BarIcon from '@mui/icons-material/Battery6Bar';
import BatteryFullIcon from '@mui/icons-material/BatteryFull';
import moment from 'moment-timezone';
import { PiPowerFill } from "react-icons/pi";


// Define a component to fetch and display the address
export const AddressFetcher = ({ lat, lng }) => {
  const [address, setAddress] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchAddress = async (latitude, longitude) => {
      if (!latitude || !longitude) return;

      setLoading(true);
      const apiKey = 'AIzaSyAvHHoPKPwRFui0undeEUrz00-8w6qFtik';
      const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`;
  
      try {
        const response = await axios.get(url);
        if (response.data.results.length > 0) {
          setAddress(response.data.results[0].formatted_address);
        } else {
          setAddress('Address not found');
        }
      } catch (error) {
        setError('Error fetching address');
      } finally {
        setLoading(false);
      }
    };

    fetchAddress(lat, lng);
  }, [lat, lng]);

  if (loading) return <span>Loading...</span>;
  if (error) return <span>{error}</span>;

  return <span>{address}</span>;
};

// Define your columns array
export const COLUMNS = [
  {
    Header: 'SN',
    accessor: 'deviceId',
    Cell: ({ value }) => {
      switch (value) {
        case 7: return '1';
        case 9: return '2';
        case 1685: return '3';
        default: return null;
      }
    }
  },
  
  {
    Header: 'Asset Name',
    accessor: 'name',
    Cell: ({ value, row }) => (
      <span className="hover-underline" style={{ cursor: 'pointer' }}>
        {value}
      </span>
    ),
  },
  {
    Header: 'Datetime',
    accessor: 'lastUpdate',
    Cell: ({ value }) => {
      if (!value) return 'N/A';
      const istDate = moment(value).tz('Asia/Kolkata').format('YYYY-MM-DD HH:mm:ss');
      return <span>{istDate}</span>;
    },
  },
  {
    Header: 'Address',
    accessor: 'kjn',
    Cell: ({ row }) => {
      
      
      return <AddressFetcher lat={row.latitude} lng={row.longitude} />;
      
    },
  },
  // {
  //   Header: 'Latitude',
  //   accessor: 'latitude',
  // },
  // {
  //   Header: 'Longitude',
  //   accessor: 'longitude',
  // },
  {
    Header: 'Speed(KM)',
    accessor: 'speed'
  },
  {
    Header: 'Current Distance(KM)',
    accessor: row => row.attributes?.distance ?? null,
    Cell: ({ row }) => {
      const mileage = row.attributes?.distance;
      return (
        <span>{typeof mileage === 'number' ? mileage.toFixed(2) : 'N/A'}</span>
      );
    },
  },
  {
    Header: 'Driver Name',
    accessor: 'driver_name'
  },
  // {
  //   Header: 'Total Distance(KM)',
  //   accessor: row => row.attributes?.totalDistance ?? null,
  //   Cell: ({ row }) => {
  //     const mileage = row.attributes?.totalDistance;
  //     return (
  //       <span>{typeof mileage === 'number' ? mileage.toFixed(2) : 'N/A'}</span>
  //     );
  //   },
  // },
  {
    Header: 'Status',
    accessor: 'status'
  },
  // {
  //   Header: 'Location',
  //   accessor: 'location',
  //   Cell: () => (
  //     <img
  //       src={bike} // Use the imported SVG file or a URL
  //       alt="Location"
  //       style={{ cursor: 'pointer', width: '24px', height: '24px' }} // Adjust size and styling as needed
        
  //     />
  //   ),
  // },
  {
    Header: 'Ig',
    accessor: row => row.attributes?.ignition ?? null,
    Cell: ({ row }) => {
      const ignitionStatus = row.attributes?.ignition;
      return ignitionStatus !== undefined ? (
        ignitionStatus ? (
          <PiPowerFill style={{ color: 'green' , fontSize:"1.5rem"}} />
        ) : (
          <SiCoronaengine style={{ color: 'red' , fontSize:"1.5rem"}} />
        )
      ) : (
        'N/A'
      ); 
    },
  },
  {
    Header: 'Sat',
    accessor: row => row.attributes?.sat ?? null,
    Cell: ({ row }) => {
      const SatStatus = row.attributes?.sat;
      return SatStatus ;
      
    },
  },
  {
    Header: 'Battery',
    accessor: row => row.attributes?.battery ?? null,
    Cell: ({ row }) => {
      const batteryStatus = row.attributes?.battery;
      // console.log('Battery status', batteryStatus);
      return batteryStatus !== undefined ? (
        (batteryStatus === 0 && <RiBattery2ChargeLine style={{color:"red"}} />) || 
        (batteryStatus > 0 && batteryStatus <= 1.5 && <MdBatteryCharging20 className="batteryIcons" style={{color:"red", fontSize:"1.5rem"}} />  ) || 
        (batteryStatus > 1.5 && batteryStatus <= 3 && <MdBatteryCharging30 className="batteryIcons" style={{color:"red", fontSize:"1.5rem"}} />) || 
        (batteryStatus > 3 && batteryStatus <= 4.5 && <MdBatteryCharging50 className="batteryIcons" style={{color:"orange", fontSize:"1.5rem"}} />) || 
        (batteryStatus > 4.5 && batteryStatus <= 6.5 && <MdBatteryCharging60 className="batteryIcons" style={{color:"orange", fontSize:"1.5rem"}} />) || 
        (batteryStatus > 6.5 && batteryStatus <= 8 && <MdBatteryCharging80 className="batteryIcons" style={{color:"green", fontSize:"1.5rem"}} />) || 
        (batteryStatus > 8 && batteryStatus <= 9.9 && <MdBatteryCharging90 style={{color:"green", fontSize:"1.5rem"}} />) || 
        (batteryStatus === 10 && <MdBatteryChargingFull className="batteryIcons" style={{color:"green", fontSize:"1.5rem"}}/>)
      ) : (
        <MdBatteryChargingFull className="batteryIcons" style={{color:"green", fontSize:"1.5rem"}}/>
      );
    },
  },
  
  
  {
    Header: 'In Area',
    accessor: 'kmjhc'
  },

];
