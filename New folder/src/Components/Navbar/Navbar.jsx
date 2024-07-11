import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import HomeIcon from '@mui/icons-material/Home';
import DriveEtaIcon from '@mui/icons-material/DriveEta';
import BarChartIcon from '@mui/icons-material/BarChart';
import SettingsIcon from '@mui/icons-material/Settings';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ReportProblemOutlinedIcon from '@mui/icons-material/ReportProblemOutlined'; 
import LoopSharpIcon from '@mui/icons-material/LoopSharp';
import { RedAlertZone } from '../redAlertZone/redAlertZone.jsx';
import { Modal, Box as MuiBox, TextField } from '@mui/material';
import Grid from '@mui/material/Grid';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import ChangePassword from '../ChangePassword.jsx';
import LockResetTwoToneIcon from '@mui/icons-material/LockResetTwoTone';
import { Login } from '@mui/icons-material';
import {Link} from 'react-router-dom';


const pages = [
  { title: 'Home', icon: <HomeIcon />, arr: ['Dashboard', 'Advanced Dashboard', 'Analytics Dashboard'] },
  { title: 'Master', icon: <DriveEtaIcon />, arr: ['Assets', 'Assets Type','Assets Command','Assets Category','Assets Class','Assets Group','Users','Assets URL','User Profile','Users Assets Mapping','User Menu Master','Import Location','Assets Division','Assets Owner','Driver Master','Over speed setting','Device Settings','Geo Data', 'Landmark Group','Commands','Top Main Menu Master','Import Trip','Top Menu Master','Broker','Address Book','Main Menu Master','Address Book Group','User Display Settings','RFID','Telecom Master','Landmark Images','Landmark Waypoints','Emails'] },
  { title: 'Geofencing', icon: <DriveEtaIcon />, arr: ['Create Landmark', 'Edit Landmarks','Create Route','Edit Routes','Create Area','Edit Areas','Create Zone','Edit Zones','Trips'] },
  { title: 'Reports', icon: <BarChartIcon />, arr: ['Summary', 'Stop Report', 'Area In/Out Report', 'Area Report', 'Landmark Distance', 'Landmark Report', 'Location Wise Distance', 'Distance Report', 'Run Report', 'Distance Graph', 'Speed Graph', 'Trip Report', 'All Point Report','RFID','Distance Between Report','Vehicle Average','Alerts','Data Logs','AC Report', 'Petrolling Report','Bin Details Report','ETA details report','ETA details'] },
  { title: 'Maintenance', icon: <SettingsIcon />, arr: ['Search','Add maintenance','Type of operation','Custom Profile'] },
];

export const Navbar = (props) => {
  const [selectedPage, setSelectedPage] = useState('');
  const [openModal, setOpenModal] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };


  const handleNavClick = (arr, title) => {
    props.propFunc(arr);
    props.propBool(true);  // Set sidebar to open
    setSelectedPage(title);  // Set selected page
  };

  const handleRedAlert = () =>{
    setOpenModal(true);
  }

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleAccount = () => {
    <Grid item>
          <Tooltip title="Add" placement="bottom-start">
            <Button>bottom-start</Button>
          </Tooltip>
        </Grid>
  }

  return (
    <><AppBar position="fixed" sx={{ zIndex: 1301, backgroundColor: '#2c3e50' }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Link to={'/'}>
          <img src='CompanyLogo.png' style={{ height: 40, width: 150 }} /></Link><br/>
          <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center', flexGrow: 1, marginLeft: '5px' }}>
            
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
            {pages.map((page) => (
              <Button
                key={page.title}
                sx={{
                  mx: 1,
                  color: 'white',
                  backgroundColor: selectedPage === page.title ? 'rgba(255, 255, 255, 0.2)' : 'transparent'
                }}
                onClick={() => handleNavClick(page.arr, page.title)}
              >
                <Typography variant="body1" component="span" sx={{ display: 'flex', alignItems: 'left' }}>
                  {page.icon}
                  {page.title}
                  <ExpandMoreIcon />
                </Typography>
              </Button>
            ))}
          </Box>
          <Box sx={{ flexGrow: 0, display: 'flex', alignItems: 'center' }}>
            <Tooltip title='Red Zone Alert'>
              <IconButton sx={{ p: 0 }} onClick={handleRedAlert}>
                <ReportProblemOutlinedIcon style={{ color: 'red', marginRight: 10 }} />
              </IconButton>
            </Tooltip>
            <Tooltip title='Refresh Page'>
              <IconButton sx={{ p: 0 }} onClick={() => window.location.reload()}>
                <LoopSharpIcon style={{ color: 'white' }} />
              </IconButton>
            </Tooltip>
            <Tooltip title="Open settings">
              <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
                <Tooltip title="Account settings">
                  <IconButton
                    onClick={handleClick}
                    size="small"
                    sx={{ ml: 2 }}
                    aria-controls={open ? 'account-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                  >
                    <Avatar sx={{ width: 32, height: 32 }}>M</Avatar>
                  </IconButton>
                </Tooltip>
              </Box>
              <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                sx={{ zIndex: 1302 }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                alignItems={{ horizontal: 'right' }}
              ><div style={{background: 'linear-gradient(to right, #2c3e50, #828b94)'}}>
                <MenuItem onClick={handleClose}>
                  <Avatar /> Profile
                </MenuItem>
                <MenuItem onClick={handleClose}>
                  <Avatar /> My account
                </MenuItem>
                </div>
                <Divider />
                <MenuItem onClick={handleClose}>
                  <ListItemIcon>
                    <PersonAdd fontSize="small" />
                  </ListItemIcon>
                  Helpline No:9370180012
                </MenuItem>
                <MenuItem onClick={handleClose}>
                  <ListItemIcon>
                    <Settings fontSize="small" />
                  </ListItemIcon>
                  Language
                </MenuItem>
                <Link to={"/Login"} >
                <MenuItem onClick={handleClose}>
                  
                  <ListItemIcon>
                    <Login fontSize="small" />
                  </ListItemIcon>
                  Login
                
              </MenuItem>
              </Link>
              <Link to={"/ChangePassword"} >
              <MenuItem onClick={handleClose}>
                <ListItemIcon>
                  <LockResetTwoToneIcon fontsize="small" />
                </ListItemIcon>
                ChangePassword
              </MenuItem>
              </Link>
            </Menu>
          </Tooltip>
        </Box>
      </Toolbar>
    </Container><Modal
      open={openModal}
      onClose={handleCloseModal}
      aria-labelledby="red-alert-modal-title"
      aria-describedby="red-alert-modal-description"
    >
        <MuiBox sx={style}>
          <div style={{ backgroundColor: '#2c3e50', color: 'white', height: 40, display: 'flex' }}><b style={{ marginLeft: 5 }}>Red Alert Zone</b></div>
          <Typography id="red-alert-modal-title" variant="h6" component="h2">
            RedZone Time
          </Typography>
          <select style={{ width: 200, height: 40 }}>
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
            <option>6</option>
            <option>7</option>
          </select><br />

          <RedAlertZone />
        </MuiBox>
      </Modal>
    </AppBar></>
  );
};

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '70%',
  bgcolor: 'background.paper',
  border: '2px solid #2c3e50',
  boxShadow: 24,
  
};
