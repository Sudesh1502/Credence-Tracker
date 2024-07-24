import React, { useState } from 'react';
import { Button, Box, Modal, TextField, MenuItem, Checkbox, FormControlLabel } from '@mui/material';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export const CreateLandmark = () => {
  const [modalOpen, setModalOpen] = useState(false);

  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [radius, setRadius] = useState('');
  const [icons, setIcons] = useState('');
  const [assetsList, setAssetsList] = useState('');
  const [alertBeforeLandmark, setAlertBeforeLandmark] = useState('');
  const [inAlert, setInAlert] = useState(false);
  const [outAlert, setOutAlert] = useState(false);
  const [smsAlert, setSmsAlert] = useState(false);
  const [emailAlert, setEmailAlert] = useState(false);
  const [vehicleCurrentPosition, setVehicleCurrentPosition] = useState('');

  const handleClear = () => {
    setName('');
    setAddress('');
    setRadius('');
    setIcons('');
    setAssetsList('');
    setAlertBeforeLandmark('');
    setInAlert(false);
    setOutAlert(false);
    setSmsAlert(false);
    setEmailAlert(false);
  };

  const handleSave = () => {
    // Save the data to state or send to an API here
    console.log({
      name,
      address,
      radius,
      icons,
      assetsList,
      alertBeforeLandmark,
      inAlert,
      outAlert,
      smsAlert,
      emailAlert,
    });
    handleClear(); // Optional: clear the fields after saving
  };

  return (
    <>
      <h2 style={{ textAlign: 'center' }}>Create Landmark</h2>
      <Button
        variant="contained"
        onClick={() => setModalOpen(true)}
        sx={{
          backgroundColor: '#000000',
          '&:hover': {
            backgroundColor: '#1a242f',
          },
          alignItems: 'center',
        }}
      >
        Create New
      </Button><br/>
      <br/>
      <h2><b>OR</b></h2>
      <TextField
            label="Vehicle Current Position:"
            variant="outlined"
            fullWidth
            sx={{width:300}}
            margin="normal"
            select
            value={vehicleCurrentPosition}
            onChange={(e) => setVehicleCurrentPosition(e.target.value)}
          ></TextField><br/>
           <Button
        variant="contained"
        onClick={() => setModalOpen(true)}
        sx={{
          backgroundColor: '#000000',
          '&:hover': {
            backgroundColor: '#1a242f',
          },
          alignItems: 'center',
        }}
      >
        Set Landmark
      </Button><br/>
      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
            <br/>
          <h2>Click on Map For Location</h2>
          <TextField
            label="Name"
            variant="outlined"
            fullWidth
            margin="normal"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            label="Address"
            variant="outlined"
            fullWidth
            margin="normal"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          <TextField
            label="Radius"
            variant="outlined"
            fullWidth
            margin="normal"
            select
            value={radius}
            onChange={(e) => setRadius(e.target.value)}
          >
            <MenuItem value="KM">KM</MenuItem>
            <MenuItem value="Mile">Mile</MenuItem>
            <MenuItem value="Meter">Meter</MenuItem>
          </TextField>
          <TextField
            label="Icons"
            variant="outlined"
            fullWidth
            margin="normal"
            select
            value={icons}
            onChange={(e) => setIcons(e.target.value)}
          >
            {/* Add MenuItem options here */}
          </TextField>
          <TextField
            label="Assets List"
            variant="outlined"
            fullWidth
            margin="normal"
            select
            value={assetsList}
            onChange={(e) => setAssetsList(e.target.value)}
          >
            {/* Add MenuItem options here */}
          </TextField>
          <Box sx={{ display: 'flex', alignItems: 'center', marginTop: '1px' }}>
            <span>Alert Before Landmark</span>
            <TextField
              variant="outlined"
              sx={{ width: '60px', margin: '0 8px' }}
              value={alertBeforeLandmark}
              onChange={(e) => setAlertBeforeLandmark(e.target.value)}
            />
            <span>KM</span>
          </Box>
          <FormControlLabel
            control={<Checkbox checked={inAlert} onChange={(e) => setInAlert(e.target.checked)} />}
            label="In Alert"
          />
          <FormControlLabel
            control={<Checkbox checked={outAlert} onChange={(e) => setOutAlert(e.target.checked)} />}
            label="Out Alert"
          />
          <FormControlLabel
            control={<Checkbox checked={smsAlert} onChange={(e) => setSmsAlert(e.target.checked)} />}
            label="Sms Alert"
          />
          <FormControlLabel
            control={<Checkbox checked={emailAlert} onChange={(e) => setEmailAlert(e.target.checked)} />}
            label="Email Alert"
          />
          <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: '16px' }}>
            <Button variant="contained" color="primary" onClick={handleSave}>
              Save
            </Button>
            <Button variant="outlined" onClick={handleClear}>
              Clear
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
};
