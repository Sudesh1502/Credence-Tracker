import React, { useEffect, useState } from 'react';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import axios from 'axios';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import PowerOffIcon from '@mui/icons-material/PowerOff';
import Battery30Icon from '@mui/icons-material/Battery30';
import Battery0BarIcon from '@mui/icons-material/Battery0Bar';
import Battery1BarIcon from '@mui/icons-material/Battery1Bar';
import Battery2BarIcon from '@mui/icons-material/Battery2Bar';
import Battery3BarIcon from '@mui/icons-material/Battery3Bar';
import Battery4BarIcon from '@mui/icons-material/Battery4Bar';
import Battery5BarIcon from '@mui/icons-material/Battery5Bar';
import Battery6BarIcon from '@mui/icons-material/Battery6Bar';
import BatteryFullIcon from '@mui/icons-material/BatteryFull';
import moment from 'moment-timezone';

// Define a component to fetch and display the address
const AddressFetcher = ({ lat, lng }) => {
  console.log('lati', lat, lng);
  const [address, setAddress] = useState('');

  useEffect(() => {
    const fetchAddress = async () => {
      try {
        const response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=AIzaSyC30e6tiNsE_rn2YY8kfPFfNPZxG3YlOu4`);
        console.log(response.data.results);
        
          const fetchedAddress = response.data.results[0];
          console.log(fetchAddress);
          setAddress(fetchedAddress);
        
      } catch (error) {
        console.error("Error fetching address:", error);
        setAddress('Error fetching address');
      }
    };

    if (lat && lng) {
      fetchAddress();
    }
  }, [lat, lng]);

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
    Header: 'Location',
    accessor: 'location',
    Cell: () => (
      <LocationOnIcon style={{ cursor: 'pointer' }}
      
      onClick={() => {
        
      }} />
    ),
  },
  {
    Header: 'Ig',
    accessor: row => row.attributes?.ignition ?? null,
    Cell: ({ row }) => {
      const ignitionStatus = row.attributes?.ignition;
      return ignitionStatus !== undefined ? (
        ignitionStatus ? (
          <PowerSettingsNewIcon style={{ color: 'green' }} />
        ) : (
          <PowerOffIcon style={{ color: 'red' }} />
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
        (batteryStatus === 0 && <Battery0BarIcon />) || 
        (batteryStatus > 0 && batteryStatus <= 1.5 && <Battery1BarIcon />  ) || 
        (batteryStatus > 1.5 && batteryStatus <= 3 && <Battery2BarIcon/>) || 
        (batteryStatus > 3 && batteryStatus <= 4.5 && <Battery3BarIcon/>) || 
        (batteryStatus > 4.5 && batteryStatus <= 6.5 && <Battery4BarIcon/>) || 
        (batteryStatus > 6.5 && batteryStatus <= 8 && <Battery5BarIcon/>) || 
        (batteryStatus > 8 && batteryStatus <= 9.9 && <Battery6BarIcon/>) || 
        (batteryStatus === 10 && <BatteryFullIcon/>)
      ) : (
        <BatteryFullIcon/>
      );
    },
  },
  {
    Header: 'Driver Name',
    accessor: 'driver_name'
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
  {
    Header: 'Latitude',
    accessor: 'latitude',
  },
  {
    Header: 'Longitude',
    accessor: 'longitude',
  },
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
    Header: 'Total Distance(KM)',
    accessor: row => row.attributes?.totalDistance ?? null,
    Cell: ({ row }) => {
      const mileage = row.attributes?.totalDistance;
      return (
        <span>{typeof mileage === 'number' ? mileage.toFixed(2) : 'N/A'}</span>
      );
    },
  },
  {
    Header: 'Status',
    accessor: 'status'
  },
  {
    Header: 'Date as of',
    accessor: 'spd'
  },
  {
    Header: 'In Area',
    accessor: 'kmjhc'
  },
  {
    Header: 'Near Landmark',
    accessor: 'jhgj'
  },
  {
    Header: 'AC Status',
    accessor: 'jhjfk'
  },
  {
    Header: 'Mobile No',
    accessor:'sdfsdf'
  }
];
