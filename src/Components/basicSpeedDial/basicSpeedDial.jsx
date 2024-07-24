import React from 'react';
import Box from '@mui/material/Box';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import GetAppIcon from '@mui/icons-material/GetApp';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import PrintIcon from '@mui/icons-material/Print';
import LogoutIcon from '@mui/icons-material/Logout';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

export const BasicSpeedDial = () => {
  const handleDownload = (type) => {
    // Handle download functionality based on the type (excel or pdf)
    if (type === 'excel') {
      // Logic for downloading Excel
    } else if (type === 'pdf') {
      // Logic for downloading PDF
    }
  };

  const handlePrint = () => {
    // Logic for printing the page
    window.print();
  };

  const handleLogout = () => {
    // Logic for logout
    // Redirect user to logout page or clear session
  };

  const handleScrollTop = () => {
    // Logic for scrolling to top
    window.scrollTo(0, 0);
  };

  const actions = [
    { icon: <PictureAsPdfIcon />, name: 'Download PDF', onClick: () => handleDownload('pdf') },
    { icon: <PrintIcon />, name: 'Print Page', onClick: handlePrint },
    { icon: <LogoutIcon />, name: 'Logout', onClick: handleLogout },
    { icon: <KeyboardArrowUpIcon />, name: 'Scroll Top', onClick: handleScrollTop },
  ];

  return (
    <Box sx={{ position: 'fixed', bottom: 16, right: 16, zIndex: 1300 }}>
      <SpeedDial
        ariaLabel="SpeedDial basic example"
        direction="left"
        sx={{ bottom: 16, right: 16, zIndex: 1000 }}
        icon={<SpeedDialIcon />}
        FabProps={{
          sx: {
            backgroundColor: '#000000',
            '&:hover': {
              backgroundColor: '#000000', // Keep the hover color yellow
            },
            '&.Mui-focused': {
              backgroundColor: '#000000', // Keep the focused color yellow
            },
            '&.Mui-active': {
              backgroundColor: '#000000', // Keep the active color yellow
            },
          },
        }}
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            onClick={action.onClick}
          />
        ))}
      </SpeedDial>
    </Box>
  );
};