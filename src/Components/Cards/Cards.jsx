import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { green, red, yellow, blue, grey, orange } from '@mui/material/colors';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import StopIcon from '@mui/icons-material/Stop';
import SpeedIcon from '@mui/icons-material/Speed';
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';
import ErrorIcon from '@mui/icons-material/Error';
import NewReleasesIcon from '@mui/icons-material/NewReleases';
import "./Cards.css"
export const Cards = ({vehicleRunningCount, vehicleStoppedCount, vehicleOverspeedCount, vehicleIdleCount, vehicleUnreachableCount}) => {
  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', marginBottom:"35px", gap:"25px"}}>
      {/* Running */}
      <Card sx={{ width: 197, margin: '5px', backgroundColor: "#6c757d", borderRadius:"6px"}}>
        <CardContent sx={{ padding: '10px' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent:"center", backgroundColor: green[200], padding: '5px', borderRadius: 2, marginBottom: '5px' }}>
            <AccessTimeIcon sx={{ color: green[500], marginRight: '5px' }} />
            <Typography sx={{ fontSize: "1rem" }}>Running</Typography>
          </Box>
          <Typography variant="h6" sx={{ color: green[500], fontSize: "0.875rem" }}>{vehicleRunningCount}/Assets</Typography>
        </CardContent>
      </Card>

      {/* Stopped */}
      <Card sx={{ width: 197, margin: '5px', backgroundColor: "#6c757d", borderRadius:"6px"}}>
        <CardContent sx={{ padding: '10px' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', backgroundColor: red[200], padding: '5px', borderRadius: 2, marginBottom: '5px' }}>
            <StopIcon sx={{ color: red[500], marginRight: '5px' }} />
            <Typography sx={{ fontSize: "1rem" }}>Stopped</Typography>
          </Box>
          <Typography variant="h6" sx={{ color: red[500], fontSize: "0.875rem" }}>{vehicleStoppedCount}/Assets</Typography>
        </CardContent>
      </Card>

      {/* Overspeed */}
      <Card sx={{ width: 197, margin: '5px', backgroundColor: "#6c757d", borderRadius:"6px"}}>
        <CardContent sx={{ padding: '10px' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', backgroundColor: orange[200], padding: '5px', borderRadius: 2, marginBottom: '5px' }}>
            <SpeedIcon sx={{ color: orange[500], marginRight: '5px' }} />
            <Typography sx={{ fontSize: "1rem" }}>Overspeed</Typography>
          </Box>
          <Typography variant="h6" sx={{ color: orange[500], fontSize: "0.875rem" }}>{vehicleOverspeedCount}/Assets</Typography>
        </CardContent>
      </Card>

      {/* Idle */}
      <Card sx={{ width: 197, margin: '5px', backgroundColor: "#6c757d", borderRadius:"6px"}}>
        <CardContent sx={{ padding: '10px' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', backgroundColor: yellow[200], padding: '5px', borderRadius: 2, marginBottom: '5px' }}>
            <HourglassEmptyIcon sx={{ color: yellow[500], marginRight: '5px' }} />
            <Typography sx={{ fontSize: "1rem" }}>Idle</Typography>
          </Box>
          <Typography variant="h6" sx={{ color: yellow[500], fontSize: "0.875rem" }}>{vehicleIdleCount}/Assets</Typography>
        </CardContent>
      </Card>

      {/* Unreachable */}
      <Card sx={{ width: 197, margin: '5px', backgroundColor: "#6c757d", borderRadius:"6px"}}>
        <CardContent sx={{ padding: '10px' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', backgroundColor: blue[200], padding: '5px', borderRadius: 2, marginBottom: '5px' }}>
            <ErrorIcon sx={{ color: blue[500], marginRight: '5px' }} />
            <Typography sx={{ fontSize: "1rem" }}>Unreachable</Typography>
          </Box>
          <Typography variant="h6" sx={{ color: blue[500], fontSize: "0.875rem" }}>{vehicleUnreachableCount}/Assets</Typography>
        </CardContent>
      </Card>

      {/* New */}
      <Card sx={{ width: 197, margin: '5px', backgroundColor: "#6c757d", borderRadius:"6px"}}>
        <CardContent sx={{ padding: '10px' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', backgroundColor: grey[200], padding: '5px', borderRadius: 2, marginBottom: '5px' }}>
            <NewReleasesIcon sx={{ color: grey[500], marginRight: '5px' }} />
            <Typography sx={{ fontSize: "1rem" }}>New</Typography>
          </Box>
          <Typography variant="h6" sx={{ color: grey[500], fontSize: "0.875rem" }}>00/Assets</Typography>
        </CardContent>
      </Card>
    </Box>
  );
};
