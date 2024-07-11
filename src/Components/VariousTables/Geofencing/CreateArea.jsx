import React, { useState } from 'react';
import {
  Button,
  Box,
  Modal,
  TextField,
  MenuItem,
  Checkbox,
  FormControlLabel,
  Typography,
} from '@mui/material';

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

export const CreateArea = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [helpMode, setHelpMode] = useState(false); // State to track if in help mode

  const [AreaName, setAreaName] = useState('');
  const [Search, setSearch] = useState('');
  const [Assets, setAssets] = useState('');
  const [icons, setIcons] = useState('');
  const [assetsList, setAssetsList] = useState('');
  const [alertBeforeLandmark, setAlertBeforeLandmark] = useState('');
  const [inAlert, setInAlert] = useState(false);
  const [outAlert, setOutAlert] = useState(false);
  const [smsAlert, setSmsAlert] = useState(false);
  const [emailAlert, setEmailAlert] = useState(false);
  const [vehicleCurrentPosition, setVehicleCurrentPosition] = useState('');

  const handleClear = () => {
    setAreaName('');
    setSearch('');
    setAssets('');
    setIcons('');
    setAssetsList('');
    setAlertBeforeLandmark('');
    setInAlert(false);
    setOutAlert(false);
    setSmsAlert(false);
    setEmailAlert(false);
  };

  const handleCreate = () => {
    // Create the data to state or send to an API here
    console.log({
      AreaName,
      Search,
      Assets,
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

  const toggleHelpMode = () => {
    setHelpMode(prevMode => !prevMode); // Toggle help mode
  };

  const renderContent = () => {
    if (helpMode) {
      return (
        <>
          <h3>Step 1 : Insert Area Name</h3>
          <h3>Step 2 : Select devices you want to bind with this area</h3>
          <h3>Step 3 : Click on Create</h3>
          <h3>Step 4 : Click on Map And Create Area, Minimum Three Point Required</h3>
          <h3>Step 5 : Click On Insert Button</h3>
          <Button variant="outlined" onClick={toggleHelpMode}>
            Back
          </Button>
        </>
      );
    } else {
      return (
        <>
          <TextField
            label="Area Name"
            variant="outlined"
            fullWidth
            margin="normal"
            value={AreaName}
            onChange={(e) => setAreaName(e.target.value)}
          />
          <Typography >Area Color:</Typography>
          <input type="color" id="favcolor" value="#ff0000" />
          <TextField
            label="Search"
            variant="outlined"
            fullWidth
            margin="normal"
            value={Search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <TextField
            label="Assets"
            variant="outlined"
            fullWidth
            margin="normal"
            select
            value={Assets}
            onChange={(e) => setAssets(e.target.value)}
          >
            <MenuItem value="KM">KM</MenuItem>
            <MenuItem value="Mile">Mile</MenuItem>
            <MenuItem value="Meter">Meter</MenuItem>
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
            <Button variant="contained" color="primary" onClick={handleCreate}>
              Create
            </Button>
            <Button variant="outlined" onClick={handleClear}>
              Clear
            </Button>
            <Button variant="outlined" onClick={toggleHelpMode}>
              Help
            </Button>
          </Box>
        </>
      );
    }
  };

  return (
    <>
      <h2 style={{ textAlign: 'center' }}>Create Area</h2>
      <Button
        variant="contained"
        onClick={() => setModalOpen(true)}
        sx={{
          backgroundColor: '#2c3e50',
          '&:hover': {
            backgroundColor: '#1a242f',
          },
          alignItems: 'center',
        }}
      >
        Create New
      </Button>
      <br />
      <br />
      <h2>
        <b>OR</b>
      </h2>
      <TextField
        label=""
        variant="outlined"
        fullWidth
        sx={{ width: 300 }}
        margin="normal"
        select
        value={vehicleCurrentPosition}
        onChange={(e) => setVehicleCurrentPosition(e.target.value)}
      ></TextField>
      <br />
      <Button
        variant="contained"
        onClick={() => setModalOpen(true)}
        sx={{
          backgroundColor: '#2c3e50',
          '&:hover': {
            backgroundColor: '#1a242f',
          },
          alignItems: 'center',
        }}
      >
        Set Selected
      </Button>
      <br />
      <Modal
      sx={{marginTop:8}}
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <br />
          {renderContent()}
        </Box>
      </Modal>
    </>
  );
};
