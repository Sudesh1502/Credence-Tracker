import React, { useState } from 'react';
import {
  Box,
  Button,
  MenuItem,
  Select,
  TextField,
  Typography,
  FormControl,
  InputLabel
} from '@mui/material';

export const DeviceSettings = () => {
  const [deviceClass, setDeviceClass] = useState('');
  const [assetsList, setAssetsList] = useState('');
  const [commandName, setCommandName] = useState('');
  const [commandValue, setCommandValue] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission logic here
    console.log({
      deviceClass,
      assetsList,
      commandName,
      commandValue
    });
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ textAlign: 'center', maxWidth: 600, margin: 'auto', mt: 4 }}
    >
      <Typography variant="h4" gutterBottom>
        Device Settings
      </Typography>

      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel id="device-class-label">Device Class</InputLabel>
        <Select
          labelId="device-class-label"
          value={deviceClass}
          label="Device Class"
          onChange={(e) => setDeviceClass(e.target.value)}
        >
          {['Meitrack', 'Suntech', 'Xexun', 'Vsun', 'Coban', 'Skytrack', 'Xirgo', 'Globalstar', 'SkyPatrol', 'MaxTrack', 'Calamp', 'SinoCastel-OBDII'].map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel id="assets-list-label">Assets List</InputLabel>
        <Select
          labelId="assets-list-label"
          value={assetsList}
          label="Assets List"
          onChange={(e) => setAssetsList(e.target.value)}
        >
          
          <MenuItem value="Asset 1">Asset 1</MenuItem>
          <MenuItem value="Asset 2">Asset 2</MenuItem>
        </Select>
      </FormControl>

      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel id="command-name-label">Command Name</InputLabel>
        <Select
          labelId="command-name-label"
          value={commandName}
          label="Command Name"
          onChange={(e) => setCommandName(e.target.value)}
        >
          {['Reset Meitrack device', 'Command to set the odometer', 'send SMS to device'].map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <TextField
        fullWidth
        label="Command Value"
        value={commandValue}
        onChange={(e) => setCommandValue(e.target.value)}
        sx={{ mb: 2 }}
      />

      <Button
        type="submit"
        variant="contained"
        sx={{
          width: 300,
          backgroundColor: '#2c3e50',
          '&:hover': {
            backgroundColor: '#1a242f'
          }
        }}
      >
        Submit
      </Button>
    </Box>
  );
};

